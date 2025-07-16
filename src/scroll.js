import { camera } from './scene.js';

let targetZ = 0;
let targetY = 1.5; // Altura normal de la cámara
const corridorLength = 25; // mismo largo del pasillo
const fallStart = 0.8; // cuando empieza a bajar en Y

export function initScroll() {
  document.body.style.height = '300vh'; // 3 pantallas para forzar scroll

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = scrollY / maxScroll;

    // Movimiento hacia el fondo
    targetZ = -corridorLength * progress;

    // Movimiento hacia abajo cuando pasas 80%
    if (progress > fallStart) {
      const extra = (progress - fallStart) / (1 - fallStart);
      targetY = 1.5 - 8 * extra; // baja hasta Y = -6.5
    } else {
      targetY = 1.5;
    }
  });
}

// Animación suave
export function updateScroll() {
  camera.position.z += (targetZ - camera.position.z) * 0.05; // interpolación suave
  camera.position.y += (targetY - camera.position.y) * 0.05;
}

