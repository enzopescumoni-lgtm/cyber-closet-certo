/* ==========================================================================
   CYBER CLOSET - PRODUCT 3D GLB MODEL VIEWER (THREE.JS + ORBIT CONTROLS)
   ========================================================================== */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, controls, currentModel;
let animationFrameId;
let currentGlbPath = null;
let currentContainer = null;

function disposeHierarchy(node) {
  if (!node) return;
  for (let i = node.children.length - 1; i >= 0; i--) {
    disposeHierarchy(node.children[i]);
  }
  if (node.geometry) {
    node.geometry.dispose();
  }
  if (node.material) {
    if (Array.isArray(node.material)) {
      node.material.forEach(m => disposeMaterial(m));
    } else {
      disposeMaterial(node.material);
    }
  }
}

function disposeMaterial(mat) {
  if (!mat) return;
  Object.keys(mat).forEach(prop => {
    if (mat[prop] && typeof mat[prop].dispose === 'function') {
      mat[prop].dispose();
    }
  });
  mat.dispose();
}

window.cleanupProduct3DViewer = function() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (currentModel && scene) {
    scene.remove(currentModel);
    disposeHierarchy(currentModel);
    currentModel = null;
  }
  if (controls) {
    controls.dispose();
    controls = null;
  }
  if (renderer) {
    renderer.dispose();
    renderer = null;
  }
  scene = null;
  camera = null;
  currentGlbPath = null;
};

window.updateProduct3DColor = function(colorHex) {
  if (!currentModel || !colorHex) return;
  const threeColor = new THREE.Color(colorHex);

  currentModel.traverse((child) => {
    if (child.isMesh && child.material) {
      const mat = child.material;
      const matName = (mat.name || '').toLowerCase();
      if (matName.includes('strip') || matName.includes('graphic') || matName.includes('neon') || matName.includes('metal')) {
        return;
      }
      if (mat.color) {
        mat.color.set(threeColor);
      }
    }
  });
};

window.initProduct3DViewer = function(containerId, canvasId, glbPath, initialColor) {
  const container = document.getElementById(containerId);
  const canvas = document.getElementById(canvasId);

  if (!container || !canvas) return;
  currentContainer = container;

  // Limpeza de sessão anterior
  window.cleanupProduct3DViewer();
  currentGlbPath = glbPath;

  // Overlay de Carregamento HUD
  let loaderEl = container.querySelector('.product3d-loader-hud');
  if (!loaderEl) {
    loaderEl = document.createElement('div');
    loaderEl.className = 'product3d-loader-hud';
    loaderEl.innerHTML = `
      <div class="loader-spinner-neon"></div>
      <div class="loader-text-neon">CARREGANDO MALHA 3D...</div>
    `;
    container.appendChild(loaderEl);
  }
  loaderEl.style.display = 'flex';

  // 1. SCENE
  scene = new THREE.Scene();

  // 2. CAMERA
  const width = container.clientWidth || 320;
  const height = container.clientHeight || 240;
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0.35, 1.5);

  // 3. RENDERER
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // 4. LIGHTING PBR
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0x111122, 2.8);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(2, 3, 3);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const cyanLight = new THREE.SpotLight(0x00f3ff, 5.0, 10, Math.PI / 3, 0.5);
  cyanLight.position.set(-2, 2, -1);
  scene.add(cyanLight);

  const magentaLight = new THREE.SpotLight(0xff007f, 4.5, 10, Math.PI / 3, 0.5);
  magentaLight.position.set(2, 1, -1);
  scene.add(magentaLight);

  // 5. CONTROLS (Girar 360°, Touch & Zoom)
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.5;
  controls.maxDistance = 3.5;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.0;

  // 6. CARREGAR GLB COM GLTFLOADER & TRATAMENTO DE ERRO
  const loader = new GLTFLoader();
  loader.load(
    glbPath,
    (gltf) => {
      if (loaderEl) loaderEl.style.display = 'none';
      if (!scene) return;

      currentModel = gltf.scene;

      currentModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.side = THREE.DoubleSide;
          }
        }
      });

      // Aplica cor inicial se fornecida
      if (initialColor) {
        window.updateProduct3DColor(initialColor);
      }

      // Escala e Centralização Automática no Pedestal
      const box = new THREE.Box3().setFromObject(currentModel);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetSize = 0.85;
      const scale = maxDim > 0 ? targetSize / maxDim : 1;
      currentModel.scale.set(scale, scale, scale);
      currentModel.updateMatrixWorld(true);

      const scaledBox = new THREE.Box3().setFromObject(currentModel);
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
      currentModel.position.set(-scaledCenter.x, -scaledCenter.y, -scaledCenter.z);

      scene.add(currentModel);
    },
    undefined,
    (error) => {
      console.warn('Modelo GLB não disponível no momento:', glbPath, error);
      if (loaderEl) {
        loaderEl.innerHTML = `
          <div style="font-size: 1.5rem; margin-bottom: 0.4rem;">📦</div>
          <div style="color: var(--neon-magenta); font-size: 0.75rem; font-family: var(--font-heading); text-align: center; padding: 0 1rem;">
            MODELO 3D EM CALIBRAÇÃO NEURAL
          </div>
          <div style="color: var(--text-muted); font-size: 0.7rem; margin-top: 0.3rem;">
            Exibindo renderização 2D
          </div>
        `;
        setTimeout(() => {
          if (typeof window.switchProductViewMode === 'function') {
            window.switchProductViewMode('2d');
          }
        }, 1500);
      }
    }
  );

  // 7. RENDER LOOP
  const clock = new THREE.Clock();

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    if (currentModel && controls && controls.state === -1) {
      currentModel.position.y += Math.sin(time * 2.5) * 0.0004;
    }

    if (controls) controls.update();
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  animate();
};
