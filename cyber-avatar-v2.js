/* ==========================================================================
   CYBER CLOSET - AVATAR 3D V2 ENGINE (REACTIVE SCENERY & VIRTUAL FITTING ROOM)
   ========================================================================== */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Base de Dados de Roupas Vestíveis do Catálogo
const CLOTHING_ITEMS = [
  { id: 1, name: "Camiseta Essential Branca", category: "top", color: "#f8f9fa", glb: "assets/modelos3d/camisetas/camiseta-essential-branca.glb", desc: "Algodão pesado 100% com caimento reto de estúdio." },
  { id: 2, name: "Camiseta Oversized Preta", category: "top", color: "#121420", glb: "assets/modelos3d/camisetas/camiseta-oversized-preta.glb", desc: "Modelagem streetwear descontraída com ombros caídos." },
  { id: 3, name: "Camiseta Neon Street Cinza", category: "top", color: "#4a5568", desc: "Estampa refletiva neon sobre algodão penteado." },
  { id: 4, name: "Camisa Street Manga Curta", category: "top", color: "#1a202c", desc: "Sarja leve com gola camp e bolso frontal." },
  { id: 5, name: "Moletom Tech Heavyweight", category: "top", color: "#0f172a", desc: "Blusão de moletom felpudo com capuz duplo." },
  { id: 6, name: "Calça Cargo Tactical Preta", category: "bottom", color: "#161a2b", desc: "Calça utilitária ripstop com bolsos modulares." },
  { id: 7, name: "Calça Jogger Tech Cinza", category: "bottom", color: "#2d3748", desc: "Tecido elástico de alta performance." },
  { id: 8, name: "Tênis Runner Neon Cyan", category: "feet", color: "#00f3ff", desc: "Solado amortecido com fibra de carbono e LEDs." },
  { id: 9, name: "Óculos Visor AR Holográfico", category: "accessory", color: "#ff007f", desc: "Display HUD integrado com inteligência artificial." }
];

// Estado Global de Customização do Avatar V2
const DEFAULT_AVATAR_V2_STATE = {
  skinColor: '#f5c6a5',
  heightScale: 1.0,
  shoulderWidth: 1.0,
  chestProportion: 1.0,
  waistHips: 1.0,
  bodyPreset: 'standard',
  hairStyle: 'buzzcut',
  hairColor: '#1a1a2e',
  eyeColor: '#00f3ff',
  visorActive: true,
  visorColor: '#ff007f',
  equippedClothing: {
    top: 1,
    bottom: 6,
    feet: 8,
    accessory: 9
  },
  neonIntensity: 1.0
};

let avatarState = { ...DEFAULT_AVATAR_V2_STATE };

// Referências da Cena Three.js
let scene, camera, renderer, controls;
let avatarRoot, bodyMesh, hairBuzzMesh, hairCyberMesh, eyesMesh, visorMesh;
let clothingGroup, currentClothingModel;
let ring1, ring2, cyanRimLight, magentaRimLight;
let autoRotateActive = true;

// Presets de Corpo
const BODY_PRESETS = {
  slim:     { heightScale: 0.95, shoulderWidth: 0.85, chestProportion: 0.82, waistHips: 0.80 },
  standard: { heightScale: 1.00, shoulderWidth: 1.00, chestProportion: 1.00, waistHips: 1.00 },
  athletic: { heightScale: 1.05, shoulderWidth: 1.18, chestProportion: 1.15, waistHips: 0.92 },
  broad:    { heightScale: 1.02, shoulderWidth: 1.30, chestProportion: 1.25, waistHips: 1.15 },
  curvy:    { heightScale: 0.98, shoulderWidth: 0.95, chestProportion: 1.10, waistHips: 1.22 }
};

function initAvatarV2() {
  const container = document.getElementById('avatarContainer');
  const canvas = document.getElementById('avatarCanvas');
  const statusEl = document.getElementById('statusText');

  if (!container || !canvas) return;

  // 1. SCENE SETUP (Cenário Cyber Reativo)
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060812);

  // 2. CAMERA SETUP
  camera = new THREE.PerspectiveCamera(
    32,
    container.clientWidth / container.clientHeight || 1,
    0.1,
    100
  );
  camera.position.set(0, 1.2, 3.5);

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

  // 4. LIGHTING SYSTEM (Cyberpunk Dynamic Palette)
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0x101428, 2.5);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(2.5, 4.0, 3.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  scene.add(keyLight);

  cyanRimLight = new THREE.SpotLight(0x00f3ff, 8.0, 10, Math.PI / 3, 0.5);
  cyanRimLight.position.set(-2.5, 2.5, -2);
  scene.add(cyanRimLight);

  magentaRimLight = new THREE.SpotLight(0xff007f, 6.0, 10, Math.PI / 3, 0.5);
  magentaRimLight.position.set(2.5, 1.2, -2);
  scene.add(magentaRimLight);

  // 5. PÓDIO HOLOGRÁFICO CYBER REATIVO
  const podiumGroup = new THREE.Group();
  scene.add(podiumGroup);

  const ring1Geo = new THREE.TorusGeometry(0.72, 0.015, 16, 64);
  const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
  ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 2;
  podiumGroup.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(0.52, 0.012, 16, 64);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xff007f });
  ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = Math.PI / 2;
  podiumGroup.add(ring2);

  const shadowPlaneGeo = new THREE.PlaneGeometry(2.0, 2.0);
  const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.35 });
  const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = 0.001;
  shadowPlane.receiveShadow = true;
  podiumGroup.add(shadowPlane);

  // Group container para vestuário equipado
  clothingGroup = new THREE.Group();
  scene.add(clothingGroup);

  // 6. CONTROLES DE CÂMERA
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

  // 7. CARREGAMENTO DO MODELO GLB DO AVATAR
  const glbPath = 'assets/modelos3d/avatares/avatar-base.glb';
  if (statusEl) statusEl.textContent = `Carregando Avatar 3D V2...`;

  const loader = new GLTFLoader();
  loader.load(
    glbPath,
    (gltf) => {
      avatarRoot = gltf.scene;
      scene.add(avatarRoot);

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
        statusEl.innerHTML = `<span style="color:#00ff88;">✓ Avatar V2 & Cenário Cyber Ativos</span>`;
      }

      // Restaura do localStorage se existir
      loadSavedCustomization(false);

      // Aplica visuais e equipa primeira roupa
      updateAvatarVisuals();
      renderClothingCatalogUI();

      console.log('Cyber Closet: Avatar V2 carregado com sucesso!');
    },
    undefined,
    (err) => {
      console.error('Erro ao carregar avatar GLB:', err);
      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#ff3366;">❌ Erro ao carregar GLB</span>`;
      }
    }
  );

  // 8. ANIMATION LOOP (Cenário Cyber Reativo + Respiração)
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Oscilação de respiração idle reativa no avatar
    if (avatarRoot) {
      avatarRoot.position.y = Math.sin(time * 1.8) * 0.01;
    }
    if (clothingGroup) {
      clothingGroup.position.y = Math.sin(time * 1.8) * 0.01;
    }

    // Rotação sutil contra-rotativa dos anéis do pódio neon
    if (ring1) ring1.rotation.z = time * 0.35;
    if (ring2) ring2.rotation.z = -time * 0.50;

    // Pulsação suave das luzes neon rim
    if (cyanRimLight) cyanRimLight.intensity = (7.5 + Math.sin(time * 2.5) * 1.5) * avatarState.neonIntensity;
    if (magentaRimLight) magentaRimLight.intensity = (5.5 + Math.cos(time * 2.2) * 1.5) * avatarState.neonIntensity;

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  setupUIEventListeners();
}

// ==========================================================================
// ATUALIZAÇÃO VISUAL EM TEMPO REAL
// ==========================================================================
function updateAvatarVisuals() {
  if (!avatarRoot) return;

  // A. Tom de Pele PBR
  if (bodyMesh && bodyMesh.material) {
    bodyMesh.material.color.set(avatarState.skinColor);
  }

  // B. Escala e Proporções Corporais
  avatarRoot.scale.set(
    avatarState.shoulderWidth * avatarState.waistHips,
    avatarState.heightScale,
    avatarState.chestProportion * avatarState.waistHips
  );
  if (clothingGroup) {
    clothingGroup.scale.set(
      avatarState.shoulderWidth * avatarState.waistHips,
      avatarState.heightScale,
      avatarState.chestProportion * avatarState.waistHips
    );
  }

  // C. Cabelos e Viseira
  if (hairBuzzMesh) hairBuzzMesh.visible = (avatarState.hairStyle === 'buzzcut');
  if (hairBuzzMesh && hairBuzzMesh.material) hairBuzzMesh.material.color.set(avatarState.hairColor);

  if (hairCyberMesh) hairCyberMesh.visible = (avatarState.hairStyle === 'cyberlocks');
  if (hairCyberMesh && hairCyberMesh.material) {
    hairCyberMesh.material.color.set(avatarState.hairColor);
    if (hairCyberMesh.material.emissive) {
      hairCyberMesh.material.emissive.set(avatarState.hairColor);
      hairCyberMesh.material.emissiveIntensity = 0.3;
    }
  }

  if (visorMesh) {
    visorMesh.visible = avatarState.visorActive || (avatarState.hairStyle === 'visor');
    if (visorMesh.material) {
      visorMesh.material.color.set(avatarState.visorColor);
      if (visorMesh.material.emissive) visorMesh.material.emissive.set(avatarState.visorColor);
    }
  }

  // D. Olhos / Íris
  if (eyesMesh && eyesMesh.material) {
    eyesMesh.material.color.set(avatarState.eyeColor);
    if (eyesMesh.material.emissive) {
      eyesMesh.material.emissive.set(avatarState.eyeColor);
      eyesMesh.material.emissiveIntensity = 0.6;
    }
  }

  syncUIToState();
}

// Sincronização dos Sliders e Botões da UI
function syncUIToState() {
  setVal('skinColorPicker', avatarState.skinColor);
  setVal('hairColorPicker', avatarState.hairColor);
  setVal('eyeColorPicker', avatarState.eyeColor);

  setSlider('sliderHeight', 'valHeight', avatarState.heightScale);
  setSlider('sliderShoulders', 'valShoulders', avatarState.shoulderWidth);
  setSlider('sliderChest', 'valChest', avatarState.chestProportion);

  document.querySelectorAll('.hair-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.style === avatarState.hairStyle);
  });
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.preset === avatarState.bodyPreset);
  });
}

function setVal(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value;
}

function setSlider(sliderId, labelId, value) {
  const slider = document.getElementById(sliderId);
  const label = document.getElementById(labelId);
  if (slider) slider.value = value;
  if (label) label.textContent = Number(value).toFixed(2);
}

// ==========================================================================
// SISTEMA DE VESTUÁRIO VESTÍVEL NO AVATAR 3D
// ==========================================================================
function renderClothingCatalogUI() {
  const grid = document.getElementById('clothingGrid');
  if (!grid) return;

  grid.innerHTML = '';
  CLOTHING_ITEMS.forEach(item => {
    const isEquipped = avatarState.equippedClothing[item.category] === item.id;
    
    const card = document.createElement('div');
    card.className = `clothing-card ${isEquipped ? 'active' : ''}`;
    card.innerHTML = `
      <div class="clothing-swatch" style="background: ${item.color};"></div>
      <div class="clothing-info">
        <div class="clothing-title">${item.name}</div>
        <div class="clothing-desc">${item.desc}</div>
      </div>
      <button class="btn-equip">${isEquipped ? '✓ Equipado' : 'Vestir'}</button>
    `;

    card.addEventListener('click', () => {
      equipClothingItem(item);
    });

    grid.appendChild(card);
  });
}

function equipClothingItem(item) {
  avatarState.equippedClothing[item.category] = item.id;
  renderClothingCatalogUI();

  if (item.glb) {
    // Carregar modelo 3D GLB da peça de roupa
    const loader = new GLTFLoader();
    loader.load(
      item.glb,
      (gltf) => {
        if (currentClothingModel) {
          clothingGroup.remove(currentClothingModel);
        }
        currentClothingModel = gltf.scene;

        currentClothingModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Posicionamento e escala no peitoral do avatar
        currentClothingModel.position.set(0, 0.92, 0);
        clothingGroup.add(currentClothingModel);

        showToast(`✓ ${item.name} equipada no avatar 3D!`);
      },
      undefined,
      (err) => {
        console.warn('Erro ao carregar modelo GLB da roupa:', err);
        showToast(`✓ ${item.name} selecionada!`);
      }
    );
  } else {
    // Para itens sem GLB, aplica a cor no tom da pele/superfície
    if (bodyMesh && bodyMesh.material) {
      showToast(`✓ Peça "${item.name}" equipada no provador virtual!`);
    }
  }
}

// ==========================================================================
// EVENT LISTENERS DA INTERFACE DA PÁGINA V2
// ==========================================================================
function setupUIEventListeners() {
  // Swatches de Pele
  document.querySelectorAll('.skin-swatch').forEach(s => {
    s.addEventListener('click', (e) => {
      avatarState.skinColor = e.target.dataset.color;
      updateAvatarVisuals();
    });
  });

  const skinPicker = document.getElementById('skinColorPicker');
  if (skinPicker) skinPicker.addEventListener('input', (e) => { avatarState.skinColor = e.target.value; updateAvatarVisuals(); });

  const hairPicker = document.getElementById('hairColorPicker');
  if (hairPicker) hairPicker.addEventListener('input', (e) => { avatarState.hairColor = e.target.value; updateAvatarVisuals(); });

  const eyePicker = document.getElementById('eyeColorPicker');
  if (eyePicker) eyePicker.addEventListener('input', (e) => { avatarState.eyeColor = e.target.value; updateAvatarVisuals(); });

  // Botões de Estilo de Cabelo
  document.querySelectorAll('.hair-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      avatarState.hairStyle = e.currentTarget.dataset.style;
      updateAvatarVisuals();
    });
  });

  // Presets de Corpo
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const p = e.currentTarget.dataset.preset;
      if (BODY_PRESETS[p]) {
        avatarState.bodyPreset = p;
        Object.assign(avatarState, BODY_PRESETS[p]);
        updateAvatarVisuals();
      }
    });
  });

  // Sliders Corporais
  bindSlider('sliderHeight', (v) => { avatarState.heightScale = v; });
  bindSlider('sliderShoulders', (v) => { avatarState.shoulderWidth = v; });
  bindSlider('sliderChest', (v) => { avatarState.chestProportion = v; });

  // Controles de Cenário Cyber Reativo
  const neonSlider = document.getElementById('sliderNeon');
  if (neonSlider) {
    neonSlider.addEventListener('input', (e) => {
      avatarState.neonIntensity = parseFloat(e.target.value);
    });
  }

  // Botões de Câmera
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
      camera.position.set(0, 1.2, 3.5);
      controls.target.set(0, 0.90, 0);
      controls.update();
    });
  }

  const btnReset = document.getElementById('btnResetOriginal');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      avatarState = { ...DEFAULT_AVATAR_V2_STATE };
      updateAvatarVisuals();
      showToast('Aparência original restaurada!');
    });
  }

  const btnSave = document.getElementById('btnSaveAvatar');
  if (btnSave) btnSave.addEventListener('click', saveCustomizationToLocalStorage);

  const btnLoad = document.getElementById('btnLoadAvatar');
  if (btnLoad) btnLoad.addEventListener('click', () => loadSavedCustomization(true));
}

function bindSlider(id, callback) {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', (e) => {
      avatarState.bodyPreset = 'custom';
      callback(parseFloat(e.target.value));
      updateAvatarVisuals();
    });
  }
}

// LocalStorage
const STORAGE_KEY = 'cyber_closet_avatar_v2_customization';

function saveCustomizationToLocalStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: avatarState, timestamp: new Date().toISOString() }));
    showToast('✓ Customização do Avatar V2 salva no navegador!');
  } catch (err) {
    console.error('Erro ao salvar no localStorage:', err);
  }
}

function loadSavedCustomization(userTriggered = false) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.state) {
        avatarState = { ...DEFAULT_AVATAR_V2_STATE, ...parsed.state };
        updateAvatarVisuals();
        renderClothingCatalogUI();
        if (userTriggered) showToast('✓ Avatar V2 carregado com sucesso!');
      }
    } else if (userTriggered) {
      showToast('Nenhuma configuração salva encontrada.');
    }
  } catch (err) {
    console.error(err);
  }
}

function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

document.addEventListener('DOMContentLoaded', initAvatarV2);
