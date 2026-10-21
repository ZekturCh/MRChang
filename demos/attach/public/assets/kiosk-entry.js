// Keep one fullscreen document while the games navigate inside it.
if (window.top === window.self) {
  location.replace('/kiosk/?page=' + encodeURIComponent(location.pathname + location.search + location.hash));
}
