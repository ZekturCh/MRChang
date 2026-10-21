(() => {
  'use strict';
  const frame = document.getElementById('experience');
  const button = document.getElementById('kiosk-fullscreen');
  const allowed = new Set(['/', '/attach/memoria/', '/attach/oportunidades/', '/attach/decide/', '/ranking/']);
  const target = new URL(new URLSearchParams(location.search).get('page') || '/', location.origin);
  history.replaceState(null, '', '/');
  frame.src = target.origin === location.origin && allowed.has(target.pathname) ? target.href : '/';
  frame.addEventListener('load', () => {
    try {
      const child = frame.contentWindow;
      if (!allowed.has(child.location.pathname)) return;
      document.title = child.document.title;
      history.replaceState(null, '', '/');
    } catch { /* A navigation outside this app cannot change its shell. */ }
  });
  button.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
      button.blur();
    } catch { button.blur(); }
  });
  document.addEventListener('fullscreenchange', () => {
    button.setAttribute('aria-label', document.fullscreenElement ? 'Salir de pantalla completa' : 'Activar pantalla completa');
  });
})();
