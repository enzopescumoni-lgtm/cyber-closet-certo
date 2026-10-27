/* ==========================================================================
   CYBER CLOSET - AVATAR 3D CUSTOMIZER & EDITOR ENGINE (THREE.JS + GLTFLOADER)
   ========================================================================== */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Estado Global de Customização do Avatar
const DEFAULT_AVATAR_STATE = {
  skinColor: '#f5c6a5',
  heightScale: 1.0,
  shoulderWidth: 1.0,
  chestProportion: 1.0,
  waistHips: 1.0,
  armLength: 1.0,
  legLength: 1.0,
  bodyPreset: 'standard',
  hairStyle: 'buzzcut', // 'bald', 'buzzcut', 'cyberlocks', 'visor'
  hairColor: '#1a1a2e',
  eyeColor: '#00f3ff',
  visorColor: '#ff007f',
  visorActive: false
};

let avatarState = { ...DEFAULT_AVATAR_STATE };

// Referências Three.js
let scene, camera, renderer, controls;
let avatarRoot, bodyMesh, hairBuzzMesh, hairCyberMesh, eyesMesh, visorMesh;
let autoRotateActive = true;

// Presets de Corpo
const BODY_PRESETS = {
  slim:     { heightScale: 0.95, shoulderWidth: 0.85, chestProportion: 0.82, waistHips: 0.80, armLength: 0.98, legLength: 0.98 },
  standard: { heightScale: 1.00, shoulderWidth: 1.00, chestProportion: 1.00, waistHips: 1.00, armLength: 1.00, legLength: 1.00 },
  athletic: { heightScale: 1.05, shoulderWidth: 1.18, chestProportion: 1.15, waistHips: 0.92, armLength: 1.02, legLength: 1.03 },
  broad:    { heightScale: 1.02, shoulderWidth: 1.30, chestProportion: 1.25, waistHips: 1.15, armLength: 1.00, legLength: 1.00 },
  curvy:    { heightScale: 0.98, shoulderWidth: 0.95, chestProportion: 1.10, waistHips: 1.22, armLength: 0.98, legLength: 0.97 }
};

function initAvatarEditor() {
  const container = document.getElementById('avatarContainer');
  const canvas = document.getElementById('avatarCanvas');
  const statusEl = document.getElementById('statusText');

  if (!container || !canvas) return;

  // 1. SCENE SETUP
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070913);

  // 2. CAMERA
  camera = new THREE.PerspectiveCamera(
    32,
    container.clientWidth / container.clientHeight || 1,
    0.1,
    100
  );
  camera.position.set(0, 1.15, 3.4);

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

  // 4. LIGHTING (Estúdio Cyberpunk)
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0x101428, 2.5);
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

  // 5. PÓDIO HOLOGRÁFICO
  const podiumGroup = new THREE.Group();
  scene.add(podiumGroup);

  const ringGeo = new THREE.TorusGeometry(0.72, 0.015, 16, 64);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  podiumGroup.add(ring);

  const innerRingGeo = new THREE.TorusGeometry(0.52, 0.012, 16, 64);
  const innerRingMat = new THREE.MeshBasicMaterial({ color: 0xff007f });
  const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
  innerRing.rotation.x = Math.PI / 2;
  podiumGroup.add(innerRing);

  const shadowPlaneGeo = new THREE.PlaneGeometry(2.0, 2.0);
  const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.35 });
  const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = 0.001;
  shadowPlane.receiveShadow = true;
  podiumGroup.add(shadowPlane);

  // 6. CONTROLES DE CÂMERA (ORBIT CONTROLS)
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(0, 0.90, 0);
  controls.minDistance = 1.1;
  controls.maxDistance = 4.8;
  controls.autoRotate = autoRotateActive;
  controls.autoRotateSpeed = 1.8;

  // 7. CARREGAMENTO DO AVATAR GLB MULTI-MESH
  const glbPath = 'assets/modelos3d/avatares/avatar-base.glb';
  if (statusEl) statusEl.textContent = `Carregando modelo 3D do Avatar...`;

  const loader = new GLTFLoader();
  loader.load(
    glbPath,
    (gltf) => {
      avatarRoot = gltf.scene;
      scene.add(avatarRoot);

      // Identificação dos nós e malhas por nome
      avatarRoot.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.name === 'Body_Mesh') bodyMesh = child;
          else if (child.name === 'Hair_Buzzcut') hairBuzzMesh = child;
          else if (child.name === 'Hair_CyberLocks') hairCyberMesh = child;
          else if (child.name === 'Eyes_Mesh') eyesMesh = child;
          else if (child.name === 'Visor_Cyber') visorMesh = child;
        }
      });

      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#00ff88;">✓ Editor 3D Pronto!</span>`;
      }

      // Tenta carregar do localStorage se existir
      loadSavedCustomization(false);

      // Aplica o estado inicial
      updateAvatarVisuals();
    },
    undefined,
    (error) => {
      console.error('Erro ao carregar avatar GLB:', error);
      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#ff3366;">❌ Erro ao carregar GLB</span>`;
      }
    }
  );

  // 8. RENDER LOOP
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    if (avatarRoot) {
      avatarRoot.position.y = Math.sin(time * 1.8) * 0.01;
    }
    if (ring) ring.rotation.z = time * 0.3;
    if (innerRing) innerRing.rotation.z = -time * 0.45;

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Redimensionamento
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Configurar Event Listeners da UI de Personalização
  setupUIEventListeners();
}

// ==========================================================================
// APLICAÇÃO VISUAL DAS PERSONALIZAÇÕES EM TEMPO REAL
// ==========================================================================
function updateAvatarVisuals() {
  if (!avatarRoot) return;

  // A. TONALIDADE DA PELE (MATERIAL PBR DO CORPO)
  if (bodyMesh && bodyMesh.material) {
    bodyMesh.material.color.set(avatarState.skinColor);
  }

  // B. ESCALAS E PROPORÇÕES CORPORAIS (MODIFICAÇÃO EM TEMPO REAL)
  avatarRoot.scale.set(
    avatarState.shoulderWidth * avatarState.waistHips,
    avatarState.heightScale,
    avatarState.chestProportion * avatarState.waistHips
  );

  // C. CABELOS E VISEIRA (VISIBILIDADE E CORES)
  if (hairBuzzMesh) {
    hairBuzzMesh.visible = (avatarState.hairStyle === 'buzzcut');
    if (hairBuzzMesh.material) {
      hairBuzzMesh.material.color.set(avatarState.hairColor);
    }
  }

  if (hairCyberMesh) {
    hairCyberMesh.visible = (avatarState.hairStyle === 'cyberlocks');
    if (hairCyberMesh.material) {
      hairCyberMesh.material.color.set(avatarState.hairColor);
      if (hairCyberMesh.material.emissive) {
        hairCyberMesh.material.emissive.set(avatarState.hairColor);
        hairCyberMesh.material.emissiveIntensity = 0.25;
      }
    }
  }

  if (visorMesh) {
    visorMesh.visible = avatarState.visorActive || (avatarState.hairStyle === 'visor');
    if (visorMesh.material) {
      visorMesh.material.color.set(avatarState.visorColor);
      if (visorMesh.material.emissive) {
        visorMesh.material.emissive.set(avatarState.visorColor);
      }
    }
  }

  // D. OLHOS / ÍRIS (COR E EMISSÃO)
  if (eyesMesh && eyesMesh.material) {
    eyesMesh.material.color.set(avatarState.eyeColor);
    if (eyesMesh.material.emissive) {
      eyesMesh.material.emissive.set(avatarState.eyeColor);
      eyesMesh.material.emissiveIntensity = 0.6;
    }
  }

  // E. SINCRONIZAR SLIDERS E INDICADORES DA INTERFACE
  syncUIToState();
}

function syncUIToState() {
  // Color Pickers
  const skinPicker = document.getElementById('skinColorPicker');
  if (skinPicker) skinPicker.value = avatarState.skinColor;

  const hairPicker = document.getElementById('hairColorPicker');
  if (hairPicker) hairPicker.value = avatarState.hairColor;

  const eyePicker = document.getElementById('eyeColorPicker');
  if (eyePicker) eyePicker.value = avatarState.eyeColor;

  // Sliders
  setSliderVal('sliderHeight', 'valHeight', avatarState.heightScale);
  setSliderVal('sliderShoulders', 'valShoulders', avatarState.shoulderWidth);
  setSliderVal('sliderChest', 'valChest', avatarState.chestProportion);
  setSliderVal('sliderWaist', 'valWaist', avatarState.waistHips);

  // Hair Buttons Active State
  document.querySelectorAll('.hair-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.style === avatarState.hairStyle);
  });

  // Body Preset Buttons Active State
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.preset === avatarState.bodyPreset);
  });
}

function setSliderVal(sliderId, valId, value) {
  const slider = document.getElementById(sliderId);
  const label = document.getElementById(valId);
  if (slider) slider.value = value;
  if (label) label.textContent = Number(value).toFixed(2);
}

// ==========================================================================
// EVENT LISTENERS DOS CONTROLES DA INTERFACE
// ==========================================================================
function setupUIEventListeners() {
  // Presets de Pele Rápidos
  document.querySelectorAll('.skin-swatch').forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      avatarState.skinColor = e.target.dataset.color;
      updateAvatarVisuals();
    });
  });

  // Color Picker de Pele Livre
  const skinPicker = document.getElementById('skinColorPicker');
  if (skinPicker) {
    skinPicker.addEventListener('input', (e) => {
      avatarState.skinColor = e.target.value;
      updateAvatarVisuals();
    });
  }

  // Color Picker de Cabelo
  const hairPicker = document.getElementById('hairColorPicker');
  if (hairPicker) {
    hairPicker.addEventListener('input', (e) => {
      avatarState.hairColor = e.target.value;
      updateAvatarVisuals();
    });
  }

  // Color Picker de Olhos
  const eyePicker = document.getElementById('eyeColorPicker');
  if (eyePicker) {
    eyePicker.addEventListener('input', (e) => {
      avatarState.eyeColor = e.target.value;
      updateAvatarVisuals();
    });
  }

  // Presets de Cabelo Rápidos
  document.querySelectorAll('.hair-color-swatch').forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      avatarState.hairColor = e.target.dataset.color;
      updateAvatarVisuals();
    });
  });

  // Estilos de Cabelo (Botões)
  document.querySelectorAll('.hair-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      avatarState.hairStyle = e.currentTarget.dataset.style;
      updateAvatarVisuals();
    });
  });

  // Presets Corporais
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const presetKey = e.currentTarget.dataset.preset;
      if (BODY_PRESETS[presetKey]) {
        avatarState.bodyPreset = presetKey;
        Object.assign(avatarState, BODY_PRESETS[presetKey]);
        updateAvatarVisuals();
      }
    });
  });

  // Sliders Corporais
  bindSlider('sliderHeight', 'valHeight', (val) => { avatarState.heightScale = val; });
  bindSlider('sliderShoulders', 'valShoulders', (val) => { avatarState.shoulderWidth = val; });
  bindSlider('sliderChest', 'valChest', (val) => { avatarState.chestProportion = val; });
  bindSlider('sliderWaist', 'valWaist', (val) => { avatarState.waistHips = val; });

  // Viseira Cyber Toggle
  const visorToggle = document.getElementById('toggleVisor');
  if (visorToggle) {
    visorToggle.addEventListener('change', (e) => {
      avatarState.visorActive = e.target.checked;
      updateAvatarVisuals();
    });
  }

  // Botões de Câmera e Rotação
  const btnRotate = document.getElementById('btnToggleRotate');
  if (btnRotate) {
    btnRotate.addEventListener('click', () => {
      autoRotateActive = !autoRotateActive;
      controls.autoRotate = autoRotateActive;
      btnRotate.textContent = autoRotateActive ? '⏸️ Pausar Rotação' : '▶️ Girar 360°';
    });
  }

  const btnResetCam = document.getElementById('btnResetCamera');
  if (btnResetCam) {
    btnResetCam.addEventListener('click', () => {
      camera.position.set(0, 1.15, 3.4);
      controls.target.set(0, 0.90, 0);
      controls.update();
    });
  }

  // Botão de Resetar Aparência Original
  const btnReset = document.getElementById('btnResetOriginal');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      avatarState = { ...DEFAULT_AVATAR_STATE };
      updateAvatarVisuals();
      showToast('Aparência original restaurada!');
    });
  }

  // Botões de LocalStorage
  const btnSave = document.getElementById('btnSaveAvatar');
  if (btnSave) {
    btnSave.addEventListener('click', saveCustomizationToLocalStorage);
  }

  const btnLoad = document.getElementById('btnLoadAvatar');
  if (btnLoad) {
    btnLoad.addEventListener('click', () => {
      loadSavedCustomization(true);
    });
  }
}

function bindSlider(sliderId, valId, callback) {
  const slider = document.getElementById(sliderId);
  const label = document.getElementById(valId);
  if (slider) {
    slider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (label) label.textContent = val.toFixed(2);
      avatarState.bodyPreset = 'custom';
      callback(val);
      updateAvatarVisuals();
    });
  }
}

// ==========================================================================
// SALVAMENTO E CARREGAMENTO NO BROWSER (LOCALSTORAGE)
// ==========================================================================
const STORAGE_KEY = 'cyber_closet_avatar_customization_v1';

function saveCustomizationToLocalStorage() {
  try {
    const dataToSave = JSON.stringify({
      state: avatarState,
      savedAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEY, dataToSave);
    showToast('✓ Customização do Avatar salva com sucesso no navegador!');
  } catch (err) {
    console.error('Erro ao salvar no localStorage:', err);
    showToast('❌ Erro ao salvar dados no navegador.');
  }
}

function loadSavedCustomization(userTriggered = false) {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed && parsed.state) {
        avatarState = { ...DEFAULT_AVATAR_STATE, ...parsed.state };
        updateAvatarVisuals();
        if (userTriggered) {
          showToast('✓ Avatar personalizado carregado com sucesso!');
        }
      }
    } else if (userTriggered) {
      showToast('Nenhuma personalização salva anteriormente encontrada.');
    }
  } catch (err) {
    console.error('Erro ao carregar do localStorage:', err);
  }
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

document.addEventListener('DOMContentLoaded', initAvatarEditor);
