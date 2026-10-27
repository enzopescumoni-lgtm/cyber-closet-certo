/* ==========================================================================
   CYBER CLOSET - STYLIZED 3D HUMAN AVATAR V2 TESTER (THREE.JS + ANIMATIONS)
   ========================================================================== */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, controls, avatarModel, mixer;
let autoRotateActive = true;
let wireframeActive = false;
let animationActive = true;

function initStylizedAvatarTester() {
  const container = document.getElementById('avatarContainer');
  const canvas = document.getElementById('avatarCanvas');
  const statusEl = document.getElementById('statusText');
  const statsEl = document.getElementById('statsText');

  if (!container || !canvas) return;

  // 1. SCENE SETUP
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070914);

  // 2. CAMERA SETUP
  camera = new THREE.PerspectiveCamera(
    32,
    container.clientWidth / container.clientHeight || 1,
    0.1,
    100
  );
  camera.position.set(0, 1.25, 3.4);

  // 3. RENDERER SETUP
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // 4. LIGHTING SETUP (Xbox 360 Character Showcase Studio Palette)
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0x11152a, 2.5);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(2.5, 4.0, 3.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  scene.add(keyLight);

  const cyanRimLight = new THREE.SpotLight(0x00f3ff, 8.0, 10, Math.PI / 3, 0.5);
  cyanRimLight.position.set(-2.5, 2.5, -2);
  scene.add(cyanRimLight);

  const magentaRimLight = new THREE.SpotLight(0xff007f, 6.0, 10, Math.PI / 3, 0.5);
  magentaRimLight.position.set(2.5, 1.2, -2);
  scene.add(magentaRimLight);

  // 5. PODIUM HOLOGRÁFICO NEON
  const podiumGroup = new THREE.Group();
  scene.add(podiumGroup);

  const ring1Geo = new THREE.TorusGeometry(0.72, 0.015, 16, 64);
  const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 2;
  podiumGroup.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(0.52, 0.012, 16, 64);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xff007f });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = Math.PI / 2;
  podiumGroup.add(ring2);

  const shadowPlaneGeo = new THREE.PlaneGeometry(2.0, 2.0);
  const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.35 });
  const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = 0.001;
  shadowPlane.receiveShadow = true;
  podiumGroup.add(shadowPlane);

  // 6. CONTROLES DE CÂMERA
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(0, 0.92, 0);
  controls.minDistance = 1.1;
  controls.maxDistance = 4.8;
  controls.autoRotate = autoRotateActive;
  controls.autoRotateSpeed = 1.8;

  // 7. CARREGAMENTO DO NOVO MODELO GLB STYLIZED
  const glbPath = 'assets/modelos3d/avatares/avatar-v2-stylized.glb';
  if (statusEl) statusEl.textContent = `Carregando Avatar Estilizado V2...`;

  const loader = new GLTFLoader();
  loader.load(
    glbPath,
    (gltf) => {
      avatarModel = gltf.scene;

      let totalVerts = 0;
      let totalFaces = 0;
      let hasArmature = false;

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
          if (child.isSkinnedMesh) hasArmature = true;
        }
      });

      scene.add(avatarModel);

      // Configuração de Animação de Esqueleto (AnimationMixer)
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(avatarModel);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
        console.log('Animação Idle ativada:', gltf.animations[0].name);
      }

      const box = new THREE.Box3().setFromObject(avatarModel);
      const size = box.getSize(new THREE.Vector3());

      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#00ff88;">✓ Avatar Estilizado V2 Carregado com Sucesso!</span>`;
      }
      if (statsEl) {
        statsEl.innerHTML = `
          <strong>Altura:</strong> ${size.y.toFixed(2)}m | 
          <strong>Vértices:</strong> ${totalVerts} | 
          <strong>Triângulos:</strong> ${Math.round(totalFaces)} | 
          <strong>Rigging:</strong> ${hasArmature ? 'Sim (Armature)' : 'Sim'}
        `;
      }

      console.log('Cyber Closet: Novo Avatar Estilizado V2 carregado com sucesso!', gltf);
    },
    (xhr) => {
      if (xhr.lengthComputable && statusEl) {
        const percent = Math.round((xhr.loaded / xhr.total) * 100);
        statusEl.textContent = `Carregando Avatar: ${percent}%`;
      }
    },
    (error) => {
      console.error('Erro ao carregar avatar-v2-stylized.glb:', error);
      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#ff3366;">❌ Erro ao carregar GLB</span>`;
      }
    }
  );

  // 8. CONTROLES DE INTERFACE DA PÁGINA DE TESTE
  const btnRotate = document.getElementById('btnToggleRotate');
  if (btnRotate) {
    btnRotate.addEventListener('click', () => {
      autoRotateActive = !autoRotateActive;
      controls.autoRotate = autoRotateActive;
      btnRotate.textContent = autoRotateActive ? '⏸️ Pausar Rotação' : '▶️ Girar 360°';
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

  const btnAnim = document.getElementById('btnToggleAnim');
  if (btnAnim) {
    btnAnim.addEventListener('click', () => {
      animationActive = !animationActive;
      if (mixer) {
        mixer.timeScale = animationActive ? 1.0 : 0.0;
      }
      btnAnim.textContent = animationActive ? '⏸️ Pausar Animação Idle' : '▶️ Play Animação Idle';
    });
  }

  const btnResetCam = document.getElementById('btnResetCamera');
  if (btnResetCam) {
    btnResetCam.addEventListener('click', () => {
      camera.position.set(0, 1.25, 3.4);
      controls.target.set(0, 0.92, 0);
      controls.update();
    });
  }

  // 9. ANIMATION LOOP
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    if (mixer && animationActive) {
      mixer.update(delta);
    }

    if (ring1) ring1.rotation.z = clock.getElapsedTime() * 0.35;
    if (ring2) ring2.rotation.z = -clock.getElapsedTime() * 0.50;

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

document.addEventListener('DOMContentLoaded', initStylizedAvatarTester);
