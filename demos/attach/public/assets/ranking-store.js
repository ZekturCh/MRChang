/* Shared by the page and service worker. Gameplay never depends on a network request. */
(() => {
  'use strict';
  const CFG = globalThis.AttachCloud;
  const DB = 'paralelvr-attach-ranking-v1';
  const root = `projects/${CFG.projectId}/databases/(default)/documents`;
  const base = `https://firestore.googleapis.com/v1/${root}`;
  const gamePath = game => `paralelvr_attach_events/${CFG.eventId}/games/${game}`;
  const collection = 'paralelvr_attach_scores';
  const games = ['memoria', 'elige', 'decide'];
  let opening;
  let flushing;
  const signal = () => { if (typeof dispatchEvent === 'function') dispatchEvent(new Event('attach-data')); };
  const open = () => opening ||= new Promise((resolve, reject) => {
    const request = indexedDB.open(DB, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore('runs', { keyPath: 'id' });
      db.createObjectStore('meta', { keyPath: 'key' });
    };
    request.onsuccess = () => { request.result.onversionchange = () => request.result.close(); resolve(request.result); };
    request.onerror = () => { opening = null; reject(request.error); };
  });
  async function access(store, mode, work) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, mode);
      const request = work(tx.objectStore(store));
      tx.oncomplete = () => resolve(request?.result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || Error('No se pudo guardar en este equipo.'));
    });
  }
  const list = async () => (await access('runs', 'readonly', s => s.getAll())).filter(r => r.eventId === CFG.eventId);
  const metaGet = async key => (await access('meta', 'readonly', s => s.get(key)))?.value;
  const metaPut = (key, value) => access('meta', 'readwrite', s => s.put({ key, value }));
  function cleanName(name) { return String(name || '').normalize('NFC').replace(/[<>\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim().slice(0, 24); }
  function valid(run) {
    if (!games.includes(run.game) || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(run.id)) return false;
    if (cleanName(run.name) !== run.name || run.name.length < 2 || run.name.length > 24) return false;
    if (![run.score, run.moves, run.durationMs, run.completedAt].every(Number.isSafeInteger)) return false;
    if (run.durationMs < 1 || run.durationMs > 14400000 || run.completedAt < 1767225600000 || run.completedAt > 4102444800000) return false;
    if (run.game === 'memoria') return run.score >= 0 && run.score <= 1600 && run.score % 10 === 0 && run.moves >= 8 && run.moves <= 10000;
    if (run.moves !== 0) return false;
    return run.game === 'elige' ? run.score >= -25 && run.score <= 500 && run.score % 5 === 0 : run.score >= 0 && run.score <= 5;
  }
  function payload(run) {
    return { schema: 1, game: run.game, name: run.name, score: run.score, moves: run.moves, durationMs: run.durationMs, completedAt: run.completedAt };
  }
  function fields(run) {
    return Object.fromEntries(Object.entries(payload(run)).map(([key, value]) => [key, typeof value === 'number' ? { integerValue: String(value) } : { stringValue: value }]));
  }
  function decode(doc) {
    const f = doc.fields || {};
    const result = { id: doc.name.split('/').pop() };
    for (const [key, value] of Object.entries(f)) result[key] = value.integerValue !== undefined ? Number(value.integerValue) : value.stringValue ?? value.timestampValue;
    return result;
  }
  async function request(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    let response;
    try { response = await fetch(url + (url.includes('?') ? '&' : '?') + 'key=' + encodeURIComponent(CFG.apiKey), {
      ...options, headers: { 'Content-Type': 'application/json' }, signal: controller.signal, cache: 'no-store'
    }); } finally { clearTimeout(timeout); }
    const body = await response.json();
    if (!response.ok) {
      const error = Error(body.error?.message || 'Sin conexión con el ranking.');
      error.status = response.status;
      error.code = body.error?.status;
      throw error;
    }
    return body;
  }
  async function send(run) {
    const name = `${root}/${gamePath(run.game)}/${collection}/${run.id}`;
    try {
      await request(base + ':commit', { method: 'POST', body: JSON.stringify({ writes: [{
        update: { name, fields: fields(run) }, currentDocument: { exists: false },
        updateTransforms: [{ fieldPath: 'receivedAt', setToServerValue: 'REQUEST_TIME' }]
      }] }) });
    } catch (error) {
      // A lost acknowledgement or simultaneous tabs must not duplicate or overwrite a run.
      if (![409, 403].includes(error.status)) throw error;
      let existing;
      try { existing = decode(await request(base + '/' + gamePath(run.game) + '/' + collection + '/' + run.id)); }
      catch { throw error; }
      if (!Object.entries(payload(run)).every(([key, value]) => existing[key] === value)) throw error;
    }
    await access('runs', 'readwrite', s => s.put({ ...run, status: 'synced' }));
    signal();
  }
  async function enqueue(run) {
    if (!valid(run)) throw Error('El resultado no es válido.');
    const old = await access('runs', 'readonly', s => s.get(run.id));
    if (old) {
      if (!Object.entries(payload(run)).every(([key, value]) => old[key] === value)) throw Error('Este resultado ya existe.');
      return old;
    }
    const saved = { ...payload(run), id: run.id, eventId: CFG.eventId, status: 'pending' };
    await access('runs', 'readwrite', s => s.put(saved));
    signal();
    return saved;
  }
  async function flush() {
    if (flushing) return flushing;
    flushing = (async () => {
      if (globalThis.navigator?.onLine === false) return;
      const pending = (await list()).filter(r => r.status === 'pending').sort((a, b) => a.completedAt - b.completedAt);
      for (const run of pending) await send(run);
      if (pending.length) await metaPut('lastSync', Date.now());
    })().finally(() => { flushing = null; });
    return flushing;
  }
  const compare = (a, b) => b.score - a.score || a.moves - b.moves || a.durationMs - b.durationMs || a.completedAt - b.completedAt || a.id.localeCompare(b.id);
  async function refresh(game) {
    if (!games.includes(game)) throw Error('Juego desconocido');
    const response = await request(base + '/' + gamePath(game) + ':runQuery', { method: 'POST', body: JSON.stringify({ structuredQuery: {
      from: [{ collectionId: collection }], limit: 5,
      orderBy: [
        { field: { fieldPath: 'score' }, direction: 'DESCENDING' },
        { field: { fieldPath: 'moves' }, direction: 'ASCENDING' },
        { field: { fieldPath: 'durationMs' }, direction: 'ASCENDING' },
        { field: { fieldPath: 'completedAt' }, direction: 'ASCENDING' }
      ]
    } }) });
    const items = response.filter(row => row.document).map(row => decode(row.document)).filter(valid);
    await metaPut('top:' + CFG.eventId + ':' + game, { items, at: Date.now() });
    signal();
    return items;
  }
  async function top(game) {
    const cloud = await metaGet('top:' + CFG.eventId + ':' + game);
    const local = (await list()).filter(r => r.game === game);
    const merged = new Map((cloud?.items || []).map(r => [r.id, r]));
    local.forEach(r => merged.set(r.id, r));
    return { items: [...merged.values()].sort(compare).slice(0, 5), updatedAt: cloud?.at || null };
  }
  async function status() {
    const runs = await list();
    return { pending: runs.filter(r => r.status === 'pending').length, saved: runs.length, lastSync: await metaGet('lastSync') };
  }
  const getRun = id => access('runs', 'readonly', s => s.get(id));
  globalThis.AttachStore = Object.freeze({ enqueue, flush, refresh, top, status, getRun, cleanName, valid, compare, metaGet, metaPut });
})();
