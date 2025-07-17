import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/GLTFLoader.js';

export function loadModelsForPanels(panels) {
  const loader = new GLTFLoader();

  panels.forEach(panel => {
    loader.load(panel.modelPath, (gltf) => {
      const model = gltf.scene;
      model.scale.set(1.2, 1.2, 1.2);
      model.position.set(0, 1.5, 0); // sobre la bandeja
      panel.group.add(model);
      panel.model = model;

      // Animación de rotación continua
      function rotateModel() {
        requestAnimationFrame(rotateModel);
        if (panel.model) panel.model.rotation.y += 0.01;
      }
      rotateModel();
    });
  });
}

