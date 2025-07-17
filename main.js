import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';
import { loadModelsForPanels } from './models.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// Cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(0, 2, 12);
camera.lookAt(0, 2, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Piso y techo
const gridFloor = new THREE.GridHelper(500, 100, 0xffffff, 0xffffff);
gridFloor.material.opacity = 0.15;
gridFloor.material.transparent = true;
scene.add(gridFloor);

const gridCeiling = new THREE.GridHelper(500, 100, 0xffffff, 0xffffff);
gridCeiling.material.opacity = 0.15;
gridCeiling.material.transparent = true;
gridCeiling.position.y = 4;
gridCeiling.rotation.x = Math.PI;
scene.add(gridCeiling);

// Logo
const textureLoader = new THREE.TextureLoader();
const logoTexture = textureLoader.load('PARALEL.png');
const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true });
const logoMesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 6), logoMaterial);
logoMesh.position.set(0, 2, 0);
scene.add(logoMesh);

// ---- createPanel (solo bandeja + texto) ----
function createPanel(text, side, zPos) {
  const group = new THREE.Group();

  // Bandeja para texto
  const trayGeometry = new THREE.PlaneGeometry(4.8, 1.5);
  const trayMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });
  const tray = new THREE.Mesh(trayGeometry, trayMaterial);
  tray.position.set(0, -0.8, -0.01);
  group.add(tray);

  // Texto
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 34px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  function wrapText(context, str, x, y, maxWidth, lineHeight) {
    const words = str.split(' ');
    let line = '';
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      if (context.measureText(testLine).width > maxWidth && i > 0) {
        context.fillText(line, x, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
  wrapText(ctx, text, canvas.width / 2, canvas.height / 2, 460, 38);

  const textTexture = new THREE.CanvasTexture(canvas);
  const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture, transparent: true, opacity: 0 });
  const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 1.3), textMaterial);
  textMesh.position.set(0, -0.8, 0);
  group.add(textMesh);

  group.position.set(side, 2, zPos);
  group.rotation.y = side < 0 ? Math.PI / 12 : -Math.PI / 12;

  return { group, trayMaterial, textMaterial };
}

// Paneles (texto + modelo)
const panelsData = [
  { text: 'Experiencias de realidad virtual inmersivas', model: 'exp.glb' },
  { text: 'Contenido adaptado a tu marca', model: 'bus.glb' },
  { text: 'Inversión adaptada a tu presupuesto', model: 'eco.glb' },
  { text: 'Atrévete a saltar al mundo paralelo', model: 'par.glb' }
];

const panels = [];
panelsData.forEach((panel, i) => {
  const side = i % 2 === 0 ? -5 : 5;
  const { group, trayMaterial, textMaterial } = createPanel(panel.text, side, -i * 15 - 15);
  scene.add(group);
  panels.push({ group, trayMaterial, textMaterial, modelPath: panel.model });
});

// Scroll
let scrollProgress = 0;
window.addEventListener('scroll', () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
});

// Animación
function animate() {
  requestAnimationFrame(animate);

  const targetZ = 12 - scrollProgress * 100;
  camera.position.z += (targetZ - camera.position.z) * 0.08;

  panels.forEach(panel => {
    const distance = Math.abs(camera.position.z - panel.group.position.z);
    const opacity = THREE.MathUtils.clamp(1 - distance / 45, 0, 1);
    panel.trayMaterial.opacity = opacity * 0.6;
    panel.textMaterial.opacity = opacity;
    if (panel.model) {
      panel.model.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = opacity;
        }
      });
    }
  });

  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Cargar modelos en paneles
loadModelsForPanels(panels);
