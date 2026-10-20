(() => {
  'use strict';

  const stage = document.getElementById('stage');
  const mode = document.body.dataset.game;
  const timed = mode === 'active';
  const FX = window.AttachFX;
  const content = window.AttachGameContent;
  const ROUND_SIZE = 5;
  const ANSWER_MS = 10000;
  const HOME = '../../?v=20261020-vertical-v8';
  const title = timed ? 'Elige la IA' : 'Decide con IA';
  const effects = new Set();

  let round = [];
  let options = [];
  let index = 0;
  let points = 0;
  let correct = 0;
  let ideal = 0;
  let partial = 0;
  let wrong = 0;
  let expired = 0;
  let playing = false;
  let answered = false;
  let paused = false;
  let timer = null;
  let deadline = 0;
  let remaining = ANSWER_MS;

  const escape = value => String(value).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);

  function shuffle(input) {
    const items = [...input];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  function later(fn, ms) {
    const id = setTimeout(() => { effects.delete(id); fn(); }, ms);
    effects.add(id);
  }

  function stopClock() {
    clearInterval(timer);
    timer = null;
  }

  function cleanup() {
    stopClock();
    effects.forEach(clearTimeout);
    effects.clear();
    playing = false;
    answered = false;
    paused = false;
    delete stage.dataset.questionId;
  }

  function top(tag) {
    return `<div class="stage-top"><span class="eyebrow">${title}</span><span class="stage-tag">${escape(tag)}</span></div>`;
  }

  function progress() {
    return `<div class="round-progress" aria-label="Caso ${index + 1} de ${ROUND_SIZE}">${round.map((_, i) => `<i class="${i <= index ? 'done' : ''}"></i>`).join('')}</div>`;
  }

  function intro() {
    cleanup();
    stage.dataset.view = 'intro';
    stage.innerHTML = top(timed ? '10 segundos por caso' : '5 casos al azar') + `
      <div class="intro-view">
        <div class="intro-art" aria-hidden="true"><canvas data-core></canvas><span class="core-glyph">${FX.icon(timed ? 'bolt' : 'brain')}</span></div>
        <h1>${timed ? 'Una tarea concreta.<br>La IA que mejor encaja.' : 'Elige con criterio.<br>Decide con IA.'}</h1>
        <p>${timed ? 'Toca la herramienta que mejor resuelve cada encargo. Tienes diez segundos para elegir.' : 'Cinco situaciones de liderazgo. Toca la decisión que tomarías y descubre el criterio detrás de cada respuesta.'}</p>
        ${timed ? '<div class="score-legend"><span><b>+100</b> Ajuste ideal</span><span><b>+50</b> Ajuste parcial</span><span><b>−5</b> Respuesta errónea</span></div>' : ''}
        <div class="actions"><button class="primary" id="start">Iniciar experiencia <span aria-hidden="true">↗</span></button></div>
        <p class="result-info">${timed ? 'Cinco casos por ronda · Sin respuesta: 0 puntos.' : 'Sin límite de tiempo · Cinco preguntas distintas en cada partida.'}</p>
      </div>`;
  }

  function start() {
    cleanup();
    round = shuffle(timed ? content.activeCases : content.triviaCases).slice(0, ROUND_SIZE);
    index = points = correct = ideal = partial = wrong = expired = 0;
    playing = true;
    renderRound();
  }

  function renderRound() {
    stopClock();
    answered = false;
    paused = false;
    const item = round[index];
    stage.dataset.questionId = item.id;
    options = shuffle(timed ? item.options : item.answers);
    if (timed) renderTimed(item);
    else renderTrivia(item);
  }

  function renderTimed(item) {
    stage.dataset.view = 'timed';
    stage.innerHTML = top(`Caso ${index + 1} de ${ROUND_SIZE}`) + progress() + `
      <div class="timed-toolbar">
        <div class="stats"><span><strong id="score">${points}</strong> puntos</span></div>
        <div class="timer-controls"><span class="countdown" aria-label="Tiempo para elegir"><strong id="clock" role="timer" aria-live="off">10</strong> s</span><button class="small-button" id="pause">Pausar</button></div>
      </div>
      <div class="time-track" id="time-track" role="progressbar" aria-label="Tiempo disponible" aria-valuemin="0" aria-valuemax="10" aria-valuenow="10"><i id="time-fill"></i></div>
      <div class="play-body">
      <div class="task-heading"><span class="task-category">${escape(item.title)}</span><h1 class="question timed-question" id="case-question">${escape(item.question)}</h1></div>
      <div id="arena" class="arena choice-arena" role="group" aria-labelledby="case-question">
        ${options.map((option, i) => `<button type="button" class="ia-orb" data-choice="${i}" aria-label="${escape(option.label)}"><span class="orb-name">${escape(option.label)}</span><span class="orb-status" aria-hidden="true"></span></button>`).join('')}
      </div>
      </div>
      <div class="response-area"><div id="feedback" class="feedback round-feedback" role="status"><span>Toca la IA que mejor encaja.</span></div>
      <div class="next-row"><button class="primary" id="next" hidden>${index === ROUND_SIZE - 1 ? 'Ver resultado' : 'Siguiente caso →'}</button></div></div>`;
    remaining = ANSWER_MS;
    deadline = performance.now() + remaining;
    tick();
    timer = setInterval(tick, 50);
  }

  function tick() {
    if (!playing || !timed || paused || answered) return;
    remaining = Math.max(0, deadline - performance.now());
    document.getElementById('clock').textContent = Math.ceil(remaining / 1000);
    document.getElementById('time-fill').style.width = `${remaining / ANSWER_MS * 100}%`;
    document.getElementById('time-track').setAttribute('aria-valuenow', (remaining / 1000).toFixed(1));
    if (remaining === 0) resolveTimed(null);
  }

  function resolveTimed(choice) {
    if (!playing || paused || answered) return;
    // A click arriving after the deadline must not earn points between timer ticks.
    if (performance.now() >= deadline) choice = null;
    if (choice !== null && !options[choice]) return;
    answered = true;
    stopClock();
    const selected = choice === null ? null : options[choice];
    const best = options.find(option => option.score === 100);
    const score = selected?.score ?? 0;
    if (!selected) expired++;
    else if (score === 100) ideal++;
    else if (score === 50) partial++;
    else wrong++;
    points += score;
    document.getElementById('score').textContent = points;
    stage.querySelectorAll('[data-choice]').forEach((button, i) => {
      button.disabled = true;
      if (i === choice) button.classList.add('is-selected');
      if (options[i].score === 100) {
        button.classList.add('is-best');
        button.querySelector('.orb-status').textContent = 'Recomendada';
      }
    });
    const feedback = document.getElementById('feedback');
    feedback.className = `feedback round-feedback ${score > 0 ? 'success' : 'risk-feedback'}`;
    let headline;
    let detail;
    if (!selected) {
      headline = 'Tiempo agotado · 0 puntos';
      detail = `${best.label} es el mejor ajuste. ${best.why}`;
      document.getElementById('clock').textContent = '0';
      document.getElementById('time-fill').style.width = '0%';
      document.getElementById('time-track').setAttribute('aria-valuenow', '0');
    } else {
      headline = score === 100 ? '+100 · Ajuste ideal' : score === 50 ? '+50 · Ajuste parcial' : '−5 · No corresponde al encargo';
      detail = `${selected.why}${score === 100 ? '' : ` Mejor ajuste: ${best.label}.`}`;
      FX.burst(stage.querySelector(`[data-choice="${choice}"]`), score > 0);
      if (score > 0) {
        const pulse = document.createElement('i');
        pulse.className = 'arena-pulse';
        document.getElementById('arena').append(pulse);
        later(() => pulse.remove(), 850);
      }
    }
    feedback.innerHTML = `<strong>${escape(headline)}</strong><span>${escape(detail)}</span>`;
    document.getElementById('pause').disabled = true;
    document.getElementById('next').hidden = false;
  }

  function renderTrivia(item) {
    stage.dataset.view = 'trivia';
    stage.innerHTML = top(`Caso ${index + 1} de ${ROUND_SIZE}`) + progress() + `
      <div class="play-body trivia-body">
        <div class="task-heading"><span class="task-category">${escape(item.title)}</span><h1 class="question" id="case-question">${escape(item.question)}</h1></div>
        <div class="answers" role="group" aria-labelledby="case-question">${options.map((answer, i) => `<button type="button" class="answer" data-answer="${i}"><b>${String.fromCharCode(65 + i)}</b><span>${escape(answer.text)}</span></button>`).join('')}</div>
      </div>
      <div class="response-area"><div class="feedback round-feedback" id="feedback" role="status">Toca la decisión que tomarías.</div>
      <div class="next-row"><button id="next" class="primary" hidden>${index === ROUND_SIZE - 1 ? 'Ver resultado' : 'Siguiente caso →'}</button></div></div>`;
  }

  function resolveTrivia(choice) {
    if (!playing || answered || !options[choice]) return;
    answered = true;
    const good = options[choice].correct;
    if (good) correct++;
    stage.querySelectorAll('[data-answer]').forEach((button, i) => {
      button.disabled = true;
      if (options[i].correct) button.classList.add('correct');
      else if (i === choice) button.classList.add('wrong');
    });
    FX.burst(stage.querySelector(`[data-answer="${choice}"]`), good);
    const feedback = document.getElementById('feedback');
    feedback.className = `feedback round-feedback ${good ? 'success' : 'risk-feedback'}`;
    feedback.innerHTML = `<strong>${good ? 'Buena decisión.' : 'Revisa este criterio.'}</strong><span>${escape(round[index].why)}</span>`;
    document.getElementById('next').hidden = false;
  }

  function next() {
    if (!playing || !answered) return;
    index++;
    if (index === round.length) finish();
    else renderRound();
  }

  function pause() {
    if (!timed || !playing || paused || answered) return;
    remaining = Math.max(0, deadline - performance.now());
    if (!remaining) { resolveTimed(null); return; }
    paused = true;
    stopClock();
    const overlay = document.createElement('div');
    overlay.id = 'pause-layer';
    overlay.className = 'pause';
    overlay.innerHTML = '<div><h2>Tu caso está en pausa</h2><p>El tiempo se ha detenido.</p><button id="resume" class="primary">Continuar</button><div class="actions"><button class="secondary" id="restart">Volver a empezar</button></div></div>';
    stage.append(overlay);
    document.getElementById('resume').focus();
  }

  function resume() {
    if (!paused || !playing) return;
    paused = false;
    deadline = performance.now() + remaining;
    document.getElementById('pause-layer')?.remove();
    tick();
    timer = setInterval(tick, 50);
  }

  function finish() {
    cleanup();
    stage.dataset.view = 'result';
    stage.innerHTML = top('Ronda completada') + `
      <div class="intro-view result-view"><span class="eyebrow">Criterio en acción</span>
        <h1>${timed ? 'Cada tarea tiene<br>su mejor herramienta.' : 'Decisiones para llevar<br>a la práctica.'}</h1>
        <strong class="result-number">${timed ? points : `${correct}/${ROUND_SIZE}`}</strong>
        <p class="result-info">${timed ? 'puntos · máximo posible: 500' : 'decisiones recomendadas de cinco'}</p>
        ${timed ? `<div class="result-breakdown"><span><b>${ideal}</b> ideales</span><span><b>${partial}</b> parciales</span><span><b>${wrong}</b> errores</span><span><b>${expired}</b> sin respuesta</span></div>` : ''}
        <div class="actions"><button class="primary" id="start">Jugar de nuevo</button><a class="secondary" href="${HOME}">Elegir otro juego</a></div>
      </div>`;
  }

  stage.addEventListener('click', event => {
    const choice = event.target.closest('[data-choice]');
    if (choice) resolveTimed(Number(choice.dataset.choice));
    const answer = event.target.closest('[data-answer]');
    if (answer) resolveTrivia(Number(answer.dataset.answer));
    const id = event.target.closest('button')?.id;
    if (id === 'start' || id === 'restart') start();
    else if (id === 'next') next();
    else if (id === 'pause') pause();
    else if (id === 'resume') resume();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && timed) pause();
  });
  window.addEventListener('pagehide', cleanup);
  document.getElementById('fullscreen').addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch { /* A browser may decline fullscreen; the game remains usable. */ }
  });
  intro();
})();
