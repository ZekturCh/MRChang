import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { createPanel } from "./scene.js";

export async function loadGamePanels(scene, textureLoader) {
  const res = await fetch("data/games.json");
  const games = await res.json();

  const panels = [];
  const startZ = -5;        // where first panel sits
  const gapZ = -5;          // spacing along corridor

  games.forEach((g, i) => {
    const tex = textureLoader.load(g.image);
    const panel = createPanel({ texture: tex });
    panel.position.set(
      i % 2 === 0 ? -1.5 : 1.5, // alternate L/R
      1.6,
      startZ + i * gapZ
    );
    panel.userData.game = g;
    // rotate slight inward
    panel.rotation.y = (i % 2 === 0) ? Math.PI/8 : -Math.PI/8;
    scene.add(panel);
    panels.push(panel);
  });

  return panels;
}
