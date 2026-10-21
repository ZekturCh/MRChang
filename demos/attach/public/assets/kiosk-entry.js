// All internal links stay inside the existing fullscreen shell.
(() => {
  if (window.top === window.self) {
    location.replace('/kiosk/?page=' + encodeURIComponent(location.pathname + location.search + location.hash));
    return;
  }
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download')) return;
    const next = new URL(link.getAttribute('href'), location.href);
    if (next.origin !== location.origin) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.parent.postMessage({ type: 'ATTACH_NAVIGATE', href: next.href }, location.origin);
  }, true);
})();
