(() => {
  'use strict';
  const store = window.AttachStore;
  const VERSION = '20261021-touch-v10';
  const names = { memoria: 'Memoria IA', elige: 'Elige la IA', decide: 'Decide con IA' };
  const escape = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const time = ms => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;
  let session;
  let dialogPromise;
  let preparing = true;
  let offlineReady = false;
  let syncError = false;
  let retry;
  let retryDelay = 3000;
  let selected = new URLSearchParams(location.search).get('game') || 'memoria';
  if (!names[selected]) selected = 'memoria';
  let viewRevision = 0;
  const initiallyControlled = Boolean(navigator.serviceWorker?.controller);
  const badge = document.createElement('div');
  badge.className = 'app-status';
  badge.setAttribute('role', 'status');
  document.body.append(badge);

  async function updateStatus() {
    try {
      const { pending } = await store.status();
      badge.textContent = `${offlineReady ? 'Listo sin conexión' : preparing ? 'Preparando modo sin conexión…' : 'Modo sin conexión no preparado'}${pending ? ` · ${pending} por sincronizar` : navigator.onLine && !syncError ? ' · Sin pendientes' : ' · Ranking guardado en este equipo'}`;
      badge.dataset.ready = String(offlineReady);
    } catch { badge.textContent = 'El guardado local no está disponible en este navegador.'; }
  }
  async function synchronize() {
    clearTimeout(retry);
    try {
      await store.flush();
      syncError = false;
      retryDelay = 3000;
      if (document.body.classList.contains('scoreboard-body') && navigator.onLine) await refreshBoard();
      await showSavedState();
    } catch {
      syncError = true;
      retry = setTimeout(synchronize, retryDelay);
      retryDelay = Math.min(120000, retryDelay * 2);
      try { const registration = await navigator.serviceWorker?.ready; await registration?.sync?.register('attach-upload-scores'); } catch { /* Normal page retries cover browsers without background sync. */ }
    }
    await updateStatus();
  }
  async function prepareOffline() {
    if (!('serviceWorker' in navigator)) { preparing = false; updateStatus(); return; }
    try {
      const installed = await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' });
      const activateAtMenu = () => {
        if (document.body.classList.contains('catalog-body') && installed.waiting && navigator.serviceWorker.controller) installed.waiting.postMessage({ type: 'ATTACH_ACTIVATE_UPDATE' });
      };
      activateAtMenu();
      installed.addEventListener('updatefound', () => installed.installing?.addEventListener('statechange', activateAtMenu));
      const registration = await navigator.serviceWorker.ready;
      if (!navigator.serviceWorker.controller) await new Promise(resolve => navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true }));
      const channel = new MessageChannel();
      offlineReady = await new Promise(resolve => {
        const limit = setTimeout(() => resolve(false), 20000);
        channel.port1.onmessage = event => { clearTimeout(limit); resolve(event.data?.ready === true); };
        registration.active.postMessage({ type: 'ATTACH_OFFLINE_READY' }, [channel.port2]);
      });
    } catch { offlineReady = false; }
    preparing = false;
    updateStatus();
  }
  function begin(game, reuse = false) {
    if (dialogPromise) return dialogPromise;
    if (reuse && session?.game === game) {
      session = { ...session, id: crypto.randomUUID(), started: performance.now(), completion: null, finalRun: null };
      return Promise.resolve(session);
    }
    dialogPromise = new Promise(resolve => {
      const layer = document.createElement('div');
      layer.className = 'player-layer';
      layer.innerHTML = `<section class="player-dialog" role="dialog" aria-modal="true" aria-labelledby="player-title"><button class="player-close" aria-label="Cerrar registro">×</button><span class="player-kicker">${names[game]}</span><h2 id="player-title">Deja tu marca<br>en el Top 5.</h2><label for="player-name">Nombre o alias</label><input id="player-name" maxlength="24" inputmode="none" autocomplete="off" spellcheck="false" aria-describedby="player-privacy"><p id="player-privacy">Este nombre y tu puntaje se mostrarán en el ranking.</p><div class="touch-keys" aria-label="Teclado de nombre"></div><p class="player-error" role="status"></p><button class="primary player-confirm">Comenzar</button><button class="player-skip">Jugar sin ranking</button></section>`;
      const input = layer.querySelector('input');
      const keyboard = layer.querySelector('.touch-keys');
      let numeric = false;
      function keys() {
        keyboard.innerHTML = [...(numeric ? '1234567890ÁÉÍÓÚ' : 'QWERTYUIOPASDFGHJKLÑZXCVBNM')].map(c => `<button type="button" data-key="${c}">${c}</button>`).join('') + `<button type="button" class="key-mode" data-key="mode">${numeric ? 'ABC' : '123 / Á'}</button><button type="button" class="key-space" data-key="space">Espacio</button><button type="button" class="key-delete" data-key="delete" aria-label="Borrar última letra">⌫</button>`;
      }
      keys();
      const previousFocus = document.activeElement;
      let finishing = false;
      function close(value) {
        layer.remove();
        document.removeEventListener('keydown', trap);
        dialogPromise = null;
        previousFocus?.focus();
        resolve(value);
      }
      function create(name) {
        session = { game, name, id: crypto.randomUUID(), started: performance.now(), completion: null };
        close(session);
      }
      async function submit() {
        if (finishing) return;
        const name = store.cleanName(input.value);
        if (name.length < 2) { layer.querySelector('.player-error').textContent = 'Escribe al menos dos letras.'; input.focus(); return; }
        finishing = true;
        try { await store.status(); create(name); }
        catch { finishing = false; layer.querySelector('.player-error').textContent = 'No se pudo preparar el guardado. Puedes reintentar o jugar sin ranking.'; }
      }
      function trap(event) {
        if (event.key === 'Escape') { event.preventDefault(); close(null); }
        if (event.key === 'Tab') {
          const focusable = [...layer.querySelectorAll('button,input')];
          const first = focusable[0], last = focusable.at(-1);
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }
      layer.addEventListener('click', event => {
        const key = event.target.closest('[data-key]')?.dataset.key;
        if (key === 'mode') { numeric = !numeric; keys(); }
        else if (key) { input.value = key === 'delete' ? input.value.slice(0, -1) : (input.value + (key === 'space' ? ' ' : key)).slice(0, 24); }
        if (event.target.closest('.player-close')) close(null);
        if (event.target.closest('.player-skip')) create('');
        if (event.target.closest('.player-confirm')) submit();
      });
      input.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); submit(); } });
      document.body.append(layer);
      document.addEventListener('keydown', trap);
      input.focus();
    });
    return dialogPromise;
  }
  async function complete(game, result) {
    if (!session || session.game !== game || !session.name) { showResult('Jugaste sin ranking.'); return; }
    if (session.completion) return session.completion;
    const current = session;
    const run = current.finalRun ||= {
      id: current.id, game, name: current.name, score: result.score, moves: result.moves || 0,
      durationMs: Math.max(1, Math.min(14400000, Math.round(result.durationMs ?? performance.now() - current.started))), completedAt: Date.now()
    };
    current.completion = store.enqueue(run).then(async () => {
      showResult('Guardado en este equipo · Pendiente de sincronizar.');
      try { navigator.storage?.persist?.().catch(() => {}); } catch { /* Best effort; IndexedDB remains the durable store. */ }
      navigator.serviceWorker?.ready.then(registration => registration.sync?.register('attach-upload-scores')).catch(() => {});
      await updateStatus();
      synchronize();
    }).catch(() => {
      current.completion = null;
      const node = document.getElementById('ranking-result');
      if (node) {
        node.textContent = 'No se pudo guardar. ';
        const button = document.createElement('button'); button.textContent = 'Reintentar';
        button.onclick = () => complete(game, result); node.append(button);
      }
    });
    return current.completion;
  }
  function showResult(message) { const node = document.getElementById('ranking-result'); if (node) node.textContent = message; }
  async function showSavedState() {
    if (!session?.name) return;
    const own = await store.getRun(session.id);
    const node = document.getElementById('ranking-result');
    if (node && own?.status === 'synced') showResult('Resultado sincronizado.');
  }
  async function drawBoard() {
    if (!document.body.classList.contains('scoreboard-body')) return;
    const revision = ++viewRevision;
    const game = selected, { items, updatedAt } = await store.top(game);
    if (revision !== viewRevision) return;
    document.getElementById('ranking-title').textContent = names[game];
    document.querySelectorAll('[data-ranking-game]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.rankingGame === game)); });
    document.getElementById('top-five').innerHTML = Array.from({ length: 5 }, (_, i) => {
      const r = items[i];
      return `<li class="ranking-row ${i === 0 && r ? 'ranking-first' : ''}"><span class="rank-position">${String(i + 1).padStart(2, '0')}</span><div class="rank-person"><strong>${r ? escape(r.name) : 'Tu próxima marca'}</strong><span>${r ? `${time(r.durationMs)}${game === 'memoria' ? ` · ${r.moves} movimientos` : ''}${r.status === 'pending' ? ' · En este equipo' : ''}` : '—'}</span></div><span class="rank-score">${r ? r.score : '—'}<small>${game === 'decide' ? '/ 5' : 'pts'}</small></span></li>`;
    }).join('');
    const note = document.getElementById('ranking-note');
    note.textContent = updatedAt && navigator.onLine && !syncError ? `Actualizado a las ${new Date(updatedAt).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}` : 'Vista guardada en este equipo. Se actualiza al reconectar.';
  }
  async function refreshBoard() {
    if (!navigator.onLine) return drawBoard();
    try { await store.refresh(selected); syncError = false; }
    catch { syncError = true; }
    await drawBoard();
  }
  async function exportBoard() {
    const button = document.getElementById('ranking-share'); button.disabled = true;
    try {
      const game = selected, { items } = await store.top(game);
      await document.fonts.ready;
      const canvas = document.createElement('canvas'); canvas.width = 1080; canvas.height = 1500;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 1080, 1500); gradient.addColorStop(0, '#1840e2'); gradient.addColorStop(1, '#5e2f84');
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1080, 1500);
      const logo = new Image(); logo.src = '/assets/attach-logo.svg'; await logo.decode(); ctx.drawImage(logo, 68, 54, 240, 72);
      ctx.fillStyle = '#fff'; ctx.font = '500 23px Graphik,Arial'; ctx.fillText('IA PARA EJECUTIVOS · TOP 5', 68, 205);
      ctx.font = '500 68px Graphik,Arial'; ctx.fillText(names[game], 68, 298);
      for (let i = 0; i < 5; i++) {
        const y = 370 + i * 179, row = items[i];
        ctx.fillStyle = i === 0 && row ? '#ffffff' : '#ffffff14'; ctx.beginPath(); ctx.roundRect(60, y, 960, 152, 24); ctx.fill();
        ctx.fillStyle = i === 0 && row ? '#1840e2' : '#fff'; ctx.font = '500 36px Graphik,Arial'; ctx.fillText(String(i + 1).padStart(2, '0'), 90, y + 84);
        let size = 36; const label = row?.name || 'Tu próxima marca';
        do { ctx.font = `500 ${size--}px Graphik,Arial`; } while (ctx.measureText(label).width > 570 && size > 20);
        ctx.fillText(label, 180, y + 64);
        ctx.font = '400 22px Graphik,Arial'; ctx.fillText(row ? `${time(row.durationMs)}${game === 'memoria' ? ` · ${row.moves} movimientos` : ''}` : '—', 180, y + 105);
        ctx.textAlign = 'right'; ctx.font = '500 48px Graphik,Arial'; ctx.fillText(row ? String(row.score) : '—', 980, y + 72);
        ctx.font = '400 21px Graphik,Arial'; ctx.fillText(game === 'decide' ? '/ 5' : 'puntos', 980, y + 108); ctx.textAlign = 'left';
      }
      ctx.fillStyle = '#fff'; ctx.font = '400 23px Graphik,Arial'; ctx.fillText(document.getElementById('ranking-note').textContent, 68, 1350);
      ctx.font = '400 21px Graphik,Arial'; ctx.fillText('Attach Group · Experiencia por ParalelVR', 68, 1432);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const file = new File([blob], `Attach-Top5-${game}.png`, { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) { try { await navigator.share({ files: [file], title: `Top 5 · ${names[game]}` }); return; } catch (error) { if (error.name === 'AbortError') return; } }
      const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = file.name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 30000);
    } finally { button.disabled = false; }
  }
  document.querySelectorAll('[data-ranking-game]').forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.rankingGame; history.replaceState(null, '', `?game=${selected}&v=${VERSION}`); drawBoard(); refreshBoard();
  }));
  document.getElementById('ranking-refresh')?.addEventListener('click', synchronize);
  document.getElementById('ranking-share')?.addEventListener('click', () => exportBoard().catch(() => { document.getElementById('ranking-note').textContent = 'No se pudo crear la imagen. Puedes tomar una captura de esta pantalla.'; }));
  window.addEventListener('online', synchronize);
  window.addEventListener('offline', () => { updateStatus(); drawBoard(); });
  window.addEventListener('attach-data', () => { updateStatus(); drawBoard(); });
  navigator.serviceWorker?.addEventListener('message', event => { if (event.data?.type === 'ATTACH_SCORES_SYNCED') { updateStatus(); drawBoard(); showSavedState(); } });
  navigator.serviceWorker?.addEventListener('controllerchange', () => { if (initiallyControlled && document.body.classList.contains('catalog-body')) location.reload(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) synchronize(); });
  setInterval(() => { if (!document.hidden && navigator.onLine) synchronize(); }, 30000);
  updateStatus(); prepareOffline(); drawBoard(); synchronize();
  window.AttachSession = Object.freeze({ begin, complete });
})();
