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
export function updateCameraFromProgress(progress, camera) {
  // key positions
  const heroPos = { x:0, y:1.6, z:5 };
  const hallPos = { x:0, y:1.6, z:-20 };
  const dropPos = { x:0, y:-5,  z:-20 };
  const realPos = { x:0, y:-5,  z:-22 };

  function lerp(a,b,t){ return a + (b-a)*t; }
  let x,y,z;

  if (progress < 0.6){
    const t = progress/0.6;
    x = lerp(heroPos.x, hallPos.x, t);
    y = lerp(heroPos.y, hallPos.y, t);
    z = lerp(heroPos.z, hallPos.z, t);
  } else if (progress < 0.85){
    const t = (progress-0.6)/0.25;
    x = lerp(hallPos.x, dropPos.x, t);
    y = lerp(hallPos.y, dropPos.y, t);
    z = lerp(hallPos.z, dropPos.z, t);
  } else {
    const t = (progress-0.85)/0.15;
    x = lerp(dropPos.x, realPos.x, t);
    y = lerp(dropPos.y, realPos.y, t);
    z = lerp(dropPos.z, realPos.z, t);
  }

  camera.position.set(x,y,z);
  camera.lookAt(0,1.6,-25);

  return progress;
}
