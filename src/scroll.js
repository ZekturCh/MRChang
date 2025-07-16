// Scroll mapping and camera animation
export function initScroll(camera, {onProgress}) {
  function handleScroll() {
    const max = document.body.scrollHeight - window.innerHeight;
    const progress = max <= 0 ? 0 : window.scrollY / max;
    onProgress(progress, camera);
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // initial
}
