/* ==========================================================================
   CYBER CLOSET - STANDALONE HUMAN AVATAR 3D TESTER (THREE.JS + GLTFLOADER)
   ========================================================================== */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, controls, avatarModel;
let autoRotateActive = true;
let wireframeActive = false;

function initAvatarTester() {
  const container = document.getElementById('avatarContainer');
  const canvas = document.getElementById('avatarCanvas');
  const statusEl = document.getElementById('statusText');
  const statsEl = document.getElementById('statsText');

  if (!container || !canvas) return;

  // 1. SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0c16);

  // 2. CAMERA
  camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight || 1,
    0.1,
    100
  );
  camera.position.set(0, 1.1, 3.2);

  // 3. RENDERER
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // 4. LIGHTING (Cyber Closet Studio Lighting)
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0x111428, 2.5);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
  keyLight.position.set(2.5, 4, 3.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  scene.add(keyLight);

  const cyanSpot = new THREE.SpotLight(0x00f3ff, 8.0, 10, Math.PI / 3, 0.5);
  cyanSpot.position.set(-2.5, 2.5, -2);
  scene.add(cyanSpot);

  const magentaSpot = new THREE.SpotLight(0xff007f, 6.0, 10, Math.PI / 3, 0.5);
  magentaSpot.position.set(2.5, 1.2, -2);
  scene.add(magentaSpot);

  // 5. PLATFORM / PODIUM
  const podiumGroup = new THREE.Group();
  scene.add(podiumGroup);

  const ringGeo = new THREE.TorusGeometry(0.7, 0.015, 16, 64);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  podiumGroup.add(ring);

  const innerRingGeo = new THREE.TorusGeometry(0.5, 0.012, 16, 64);
  const innerRingMat = new THREE.MeshBasicMaterial({ color: 0xff007f });
  const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
  innerRing.rotation.x = Math.PI / 2;
  podiumGroup.add(innerRing);

  const shadowPlaneGeo = new THREE.PlaneGeometry(2.0, 2.0);
  const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.4 });
  const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = 0.001;
  shadowPlane.receiveShadow = true;
  podiumGroup.add(shadowPlane);

  // 6. CONTROLS (Girar e Aproximar)
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(0, 0.9, 0);
  controls.minDistance = 1.2;
  controls.maxDistance = 5.0;
  controls.autoRotate = autoRotateActive;
  controls.autoRotateSpeed = 2.0;

  // 7. CARREGAMENTO GLTF DO AVATAR BASE
  const glbPath = 'assets/modelos3d/avatares/avatar-base.glb';
  if (statusEl) statusEl.textContent = `Carregando GLB de: ${glbPath}...`;

  const loader = new GLTFLoader();
  loader.load(
    glbPath,
    (gltf) => {
      avatarModel = gltf.scene;

      let totalVerts = 0;
      let totalFaces = 0;

      avatarModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.geometry) {
            if (child.geometry.attributes.position) {
              totalVerts += child.geometry.attributes.position.count;
            }
            if (child.geometry.index) {
              totalFaces += child.geometry.index.count / 3;
            }
          }
        }
      });

      // Cálculo de caixa delimitadora e ajuste do modelo
      const box = new THREE.Box3().setFromObject(avatarModel);
      const size = box.getSize(new THREE.Vector3());

      scene.add(avatarModel);

      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#00ff88;">✓ Avatar GLB Carregado com Sucesso!</span>`;
      }
      if (statsEl) {
        statsEl.innerHTML = `
          <strong>Altura:</strong> ${size.y.toFixed(2)}m | 
          <strong>Vértices:</strong> ${totalVerts} | 
          <strong>Triângulos:</strong> ${totalFaces}
        `;
      }

      console.log('Cyber Closet: Avatar GLB carregado no visualizador de teste com sucesso!', gltf);
    },
    (xhr) => {
      if (xhr.lengthComputable && statusEl) {
        const percent = Math.round((xhr.loaded / xhr.total) * 100);
        statusEl.textContent = `Carregando Avatar: ${percent}%`;
      }
    },
    (error) => {
      console.error('Erro ao carregar modelo GLB do Avatar:', error);
      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#ff3366;">❌ Erro ao carregar arquivo GLB: ${error.message || error}</span>`;
      }
    }
  );

  // 8. BOTÕES DA INTERFACE DE TESTE
  const btnRotate = document.getElementById('btnToggleRotate');
  if (btnRotate) {
    btnRotate.addEventListener('click', () => {
      autoRotateActive = !autoRotateActive;
      controls.autoRotate = autoRotateActive;
      btnRotate.textContent = autoRotateActive ? '⏸️ Pausar Rotação' : '▶️ Girar Rotação';
    });
  }

  const btnWireframe = document.getElementById('btnToggleWireframe');
  if (btnWireframe) {
    btnWireframe.addEventListener('click', () => {
      wireframeActive = !wireframeActive;
      if (avatarModel) {
        avatarModel.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.wireframe = wireframeActive;
          }
        });
      }
      btnWireframe.textContent = wireframeActive ? '🎨 Modo Sólido (PBR)' : '🕸️ Modo Wireframe';
    });
  }

  const btnResetCam = document.getElementById('btnResetCamera');
  if (btnResetCam) {
    btnResetCam.addEventListener('click', () => {
      camera.position.set(0, 1.1, 3.2);
      controls.target.set(0, 0.9, 0);
      controls.update();
    });
  }

  // 9. RENDER LOOP
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Redimensionamento responsivo
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

document.addEventListener('DOMContentLoaded', initAvatarTester);
