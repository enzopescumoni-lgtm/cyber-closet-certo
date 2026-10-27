/* ==========================================================================
   CYBER CLOSET - AVATAR 3D HUMAN PROCEDURAL ENGINE (THREE.JS V1)
   ========================================================================== */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js';

// Elements
const container = document.querySelector('.avatar-viewer');
const canvas = document.querySelector('#avatarCanvas');

if (canvas && container) {
  // 1. SCENE SETUP
  const scene = new THREE.Scene();

  // 2. CAMERA SETUP
  const camera = new THREE.PerspectiveCamera(
    32,
    container.clientWidth / container.clientHeight || 1,
    0.1,
    100
  );
  camera.position.set(0, 1.35, 3.8);

  // 3. RENDERER SETUP
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // 4. LIGHTING SETUP (Cyberpunk Palette: Cyan & Magenta Rims)
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0x111122, 2.2);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
  keyLight.position.set(2.5, 4, 4);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 10;
  keyLight.shadow.bias = -0.001;
  scene.add(keyLight);

  const cyanRimLight = new THREE.SpotLight(0x00f3ff, 8.0, 10, Math.PI / 3, 0.5);
  cyanRimLight.position.set(-2.5, 2.5, -2);
  scene.add(cyanRimLight);

  const magentaRimLight = new THREE.SpotLight(0xff007f, 6.0, 10, Math.PI / 3, 0.5);
  magentaRimLight.position.set(2.5, 1.2, -2);
  scene.add(magentaRimLight);

  // 5. ORBIT CONTROLS SETUP
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(0, 0.95, 0);
  controls.minDistance = 2.2;
  controls.maxDistance = 5.0;
  controls.maxPolarAngle = Math.PI / 2 + 0.05;

  // 6. AVATAR HIERARCHY & PROCEDURAL GEOMETRY BUILDER
  const avatarRoot = new THREE.Group();
  scene.add(avatarRoot);

  // Materials & Shaders
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xf5c6a5,
    roughness: 0.55,
    metalness: 0.05
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a2e,
    roughness: 0.4
  });

  const shirtMat = new THREE.MeshStandardMaterial({
    color: 0x111424,
    roughness: 0.35,
    metalness: 0.15
  });

  const pantsMat = new THREE.MeshStandardMaterial({
    color: 0x161a2b,
    roughness: 0.6
  });

  const pocketMat = new THREE.MeshStandardMaterial({
    color: 0x20263c,
    roughness: 0.5
  });

  const shoesBaseMat = new THREE.MeshStandardMaterial({
    color: 0x0f1220,
    roughness: 0.3
  });

  const shoesCyanMat = new THREE.MeshStandardMaterial({
    color: 0x00f3ff,
    emissive: 0x00f3ff,
    emissiveIntensity: 0.3,
    roughness: 0.2
  });

  const chainMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    metalness: 0.9,
    roughness: 0.1
  });

  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyeIrisMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
  const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x050510 });
  const eyebrowMat = new THREE.MeshBasicMaterial({ color: 0x11111a });
  const mouthMat = new THREE.MeshBasicMaterial({ color: 0x7a3e2e });

  // Body Groups for Morphing Scale & Positioning
  const headGroup = new THREE.Group();
  const torsoGroup = new THREE.Group();
  const leftShoulderGroup = new THREE.Group();
  const rightShoulderGroup = new THREE.Group();
  const legsGroup = new THREE.Group();
  const leftLegMesh = new THREE.Group();
  const rightLegMesh = new THREE.Group();

  avatarRoot.add(torsoGroup);
  avatarRoot.add(headGroup);
  avatarRoot.add(leftShoulderGroup);
  avatarRoot.add(rightShoulderGroup);
  avatarRoot.add(legsGroup);

  // A. CABEÇA, ROSTO & ROUPA SUPERIOR
  const headGeo = new THREE.SphereGeometry(0.22, 32, 32);
  headGeo.scale(1, 1.12, 0.95);
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headMesh.position.set(0, 1.55, 0);
  headMesh.castShadow = true;
  headGroup.add(headMesh);

  const neckGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.14, 16);
  const neckMesh = new THREE.Mesh(neckGeo, skinMat);
  neckMesh.position.set(0, 1.35, 0);
  neckMesh.castShadow = true;
  headGroup.add(neckMesh);

  // Cabelo Estilizado Moderno
  const hairBaseGeo = new THREE.SphereGeometry(0.235, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55);
  const hairBaseMesh = new THREE.Mesh(hairBaseGeo, hairMat);
  hairBaseMesh.position.set(0, 1.57, -0.01);
  headGroup.add(hairBaseMesh);

  for (let i = -2; i <= 2; i++) {
    const lockGeo = new THREE.ConeGeometry(0.06, 0.18, 8);
    const lock = new THREE.Mesh(lockGeo, hairMat);
    lock.position.set(i * 0.05, 1.76, 0.08 - Math.abs(i) * 0.02);
    lock.rotation.x = -0.3;
    lock.rotation.z = -i * 0.15;
    headGroup.add(lock);
  }

  // Olhos & Piscadas
  const eyesGroup = new THREE.Group();
  headGroup.add(eyesGroup);

  const leftEyeGroup = new THREE.Group();
  leftEyeGroup.position.set(-0.075, 1.57, 0.18);
  const rightEyeGroup = new THREE.Group();
  rightEyeGroup.position.set(0.075, 1.57, 0.18);
  eyesGroup.add(leftEyeGroup);
  eyesGroup.add(rightEyeGroup);

  [leftEyeGroup, rightEyeGroup].forEach(eye => {
    const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 16), eyeWhiteMat);
    sclera.scale.set(1, 0.75, 0.5);
    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 16), eyeIrisMat);
    iris.position.set(0, 0, 0.02);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 16), eyePupilMat);
    pupil.position.set(0, 0, 0.028);
    eye.add(sclera); eye.add(iris); eye.add(pupil);
  });

  // Sobrancelhas
  const browGeo = new THREE.BoxGeometry(0.06, 0.012, 0.01);
  const leftBrow = new THREE.Mesh(browGeo, eyebrowMat);
  leftBrow.position.set(-0.075, 1.62, 0.19);
  leftBrow.rotation.z = 0.08;
  const rightBrow = new THREE.Mesh(browGeo, eyebrowMat);
  rightBrow.position.set(0.075, 1.62, 0.19);
  rightBrow.rotation.z = -0.08;
  headGroup.add(leftBrow); headGroup.add(rightBrow);

  // Nariz Simplificado
  const noseGeo = new THREE.ConeGeometry(0.025, 0.06, 4);
  const noseMesh = new THREE.Mesh(noseGeo, skinMat);
  noseMesh.position.set(0, 1.53, 0.205);
  noseMesh.rotation.x = -0.15;
  headGroup.add(noseMesh);

  // Boca Expressiva
  const mouthGeo = new THREE.TorusGeometry(0.035, 0.008, 8, 16, Math.PI);
  const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
  mouthMesh.position.set(0, 1.47, 0.19);
  mouthMesh.rotation.x = Math.PI;
  headGroup.add(mouthMesh);

  // Corrente / Acessório Cyber no Pescoço
  const chainGeo = new THREE.TorusGeometry(0.1, 0.01, 12, 24);
  const chainMesh = new THREE.Mesh(chainGeo, chainMat);
  chainMesh.position.set(0, 1.29, 0.02);
  chainMesh.rotation.x = Math.PI / 2.3;
  torsoGroup.add(chainMesh);

  // B. TRONCO / CAMISETA PRETA (STREETWEAR)
  const tshirtChestGeo = new THREE.CylinderGeometry(0.28, 0.23, 0.52, 24);
  const tshirtMesh = new THREE.Mesh(tshirtChestGeo, shirtMat);
  tshirtMesh.position.set(0, 1.02, 0);
  tshirtMesh.castShadow = true;
  tshirtMesh.receiveShadow = true;
  torsoGroup.add(tshirtMesh);

  // Logo Estampa Cyber na Camiseta
  const logoPatchGeo = new THREE.PlaneGeometry(0.12, 0.06);
  const logoPatchMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, side: THREE.DoubleSide });
  const logoPatch = new THREE.Mesh(logoPatchGeo, logoPatchMat);
  logoPatch.position.set(-0.08, 1.15, 0.245);
  torsoGroup.add(logoPatch);

  // Braços & Ombros
  function createArm(sideIsLeft) {
    const armGroup = new THREE.Group();
    const sign = sideIsLeft ? -1 : 1;

    const sleeveGeo = new THREE.CylinderGeometry(0.09, 0.085, 0.22, 16);
    const sleeveMesh = new THREE.Mesh(sleeveGeo, shirtMat);
    sleeveMesh.position.set(0, -0.08, 0);
    sleeveMesh.castShadow = true;
    armGroup.add(sleeveMesh);

    const forearmGeo = new THREE.CylinderGeometry(0.075, 0.06, 0.32, 16);
    const forearmMesh = new THREE.Mesh(forearmGeo, skinMat);
    forearmMesh.position.set(0, -0.28, 0);
    forearmMesh.castShadow = true;
    armGroup.add(forearmMesh);

    const handGeo = new THREE.SphereGeometry(0.055, 16, 16);
    handGeo.scale(0.8, 1, 0.6);
    const handMesh = new THREE.Mesh(handGeo, skinMat);
    handMesh.position.set(0, -0.46, 0);
    handMesh.castShadow = true;
    armGroup.add(handMesh);

    armGroup.rotation.z = sign * 0.15;
    return armGroup;
  }

  const leftArm = createArm(true);
  leftShoulderGroup.position.set(-0.28, 1.22, 0);
  leftShoulderGroup.add(leftArm);

  const rightArm = createArm(false);
  rightShoulderGroup.position.set(0.28, 1.22, 0);
  rightShoulderGroup.add(rightArm);

  // C. PERNAS / CALÇA CARGO ESCURA
  function createLeg(sideIsLeft) {
    const legGroup = new THREE.Group();
    const sign = sideIsLeft ? -1 : 1;

    const legGeo = new THREE.CylinderGeometry(0.13, 0.095, 0.68, 20);
    const legMesh = new THREE.Mesh(legGeo, pantsMat);
    legMesh.position.set(0, -0.34, 0);
    legMesh.castShadow = true;
    legMesh.receiveShadow = true;
    legGroup.add(legMesh);

    const pocketGeo = new THREE.BoxGeometry(0.06, 0.14, 0.12);
    const pocketMesh = new THREE.Mesh(pocketGeo, pocketMat);
    pocketMesh.position.set(sign * 0.12, -0.30, 0.02);
    pocketMesh.castShadow = true;
    legGroup.add(pocketMesh);

    const shoeGroup = new THREE.Group();
    shoeGroup.position.set(0, -0.70, 0.04);

    const shoeBodyGeo = new THREE.BoxGeometry(0.12, 0.1, 0.26);
    const shoeBody = new THREE.Mesh(shoeBodyGeo, shoesBaseMat);
    shoeBody.castShadow = true;

    const shoeSoleGeo = new THREE.BoxGeometry(0.13, 0.03, 0.28);
    const shoeSoleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const shoeSole = new THREE.Mesh(shoeSoleGeo, shoeSoleMat);
    shoeSole.position.set(0, -0.05, 0);

    const shoeCyanStrip = new THREE.Mesh(new THREE.BoxGeometry(0.125, 0.025, 0.18), shoesCyanMat);
    shoeCyanStrip.position.set(0, 0.02, 0.02);

    shoeGroup.add(shoeBody);
    shoeGroup.add(shoeSole);
    shoeGroup.add(shoeCyanStrip);
    legGroup.add(shoeGroup);

    return legGroup;
  }

  const leftLeg = createLeg(true);
  leftLegMesh.position.set(-0.14, 0.74, 0);
  leftLegMesh.add(leftLeg);
  legsGroup.add(leftLegMesh);

  const rightLeg = createLeg(false);
  rightLegMesh.position.set(0.14, 0.74, 0);
  rightLegMesh.add(rightLeg);
  legsGroup.add(rightLegMesh);

  // D. PLATAFORMA PÓDIO HOLOGRÁFICO NEON
  const podiumGroup = new THREE.Group();
  scene.add(podiumGroup);

  const ring1Geo = new THREE.TorusGeometry(0.65, 0.015, 16, 64);
  const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 2;
  podiumGroup.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(0.50, 0.012, 16, 64);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xff007f });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = Math.PI / 2;
  podiumGroup.add(ring2);

  const shadowPlaneGeo = new THREE.PlaneGeometry(1.5, 1.5);
  const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.35 });
  const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = 0.001;
  shadowPlane.receiveShadow = true;
  podiumGroup.add(shadowPlane);

  // 7. SISTEMA DE MORPHING CORPORAL & PRESETS DE CORPO
  const BODY_PRESETS = {
    slim:      { height: 0.45, shoulderWidth: 0.35, chest: 0.30, waist: 0.25, hips: 0.35 },
    standard:  { height: 0.50, shoulderWidth: 0.50, chest: 0.50, waist: 0.50, hips: 0.50 },
    athletic:  { height: 0.55, shoulderWidth: 0.75, chest: 0.70, waist: 0.40, hips: 0.50 },
    broad:     { height: 0.50, shoulderWidth: 0.82, chest: 0.80, waist: 0.70, hips: 0.65 },
    curvy:     { height: 0.48, shoulderWidth: 0.55, chest: 0.70, waist: 0.40, hips: 0.80 }
  };

  let currentSettings = { height: 0.5, shoulderWidth: 0.5, chest: 0.5, waist: 0.5, hips: 0.5 };
  let targetSettings = { ...currentSettings };

  function applyMorphTargetValues() {
    for (let k in targetSettings) {
      currentSettings[k] += (targetSettings[k] - currentSettings[k]) * 0.12;
    }

    const { height, shoulderWidth, chest, waist, hips } = currentSettings;

    avatarRoot.scale.y = 0.85 + (height * 0.30);

    const shoulderDistance = 0.22 + (shoulderWidth * 0.15);
    leftShoulderGroup.position.x = -shoulderDistance;
    rightShoulderGroup.position.x = shoulderDistance;

    torsoGroup.scale.x = 0.72 + (shoulderWidth * 0.45);
    torsoGroup.scale.z = 0.75 + (chest * 0.50);

    legsGroup.scale.x = 0.75 + (hips * 0.45);
    legsGroup.scale.z = 0.75 + (waist * 0.45);

    const legDistance = 0.10 + (hips * 0.08);
    leftLegMesh.position.x = -legDistance;
    rightLegMesh.position.x = legDistance;
  }

  // API Global de Controle Corporal
  window.setAvatarBodyPreset3D = function(presetKey) {
    if (!BODY_PRESETS[presetKey]) return;
    targetSettings = { ...BODY_PRESETS[presetKey] };

    document.querySelectorAll('.body-preset-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.preset === presetKey);
    });

    for (let key in targetSettings) {
      const slider = document.getElementById(`slider-${key}`);
      const valLabel = document.getElementById(`val-${key}`);
      if (slider) slider.value = targetSettings[key].toFixed(2);
      if (valLabel) valLabel.textContent = targetSettings[key].toFixed(2);
    }
  };

  window.setAvatarBodySlider3D = function(key, value) {
    targetSettings[key] = parseFloat(value);
    document.querySelectorAll('.body-preset-btn').forEach(btn => btn.classList.remove('active'));
  };

  window.resetAvatarPosition3D = function() {
    window.setAvatarBodyPreset3D('standard');
    avatarRoot.rotation.y = 0;
    camera.position.set(0, 1.35, 3.8);
    controls.target.set(0, 0.95, 0);
    controls.update();
  };

  // API de Troca em Tempo Real de Tom de Pele & Cor do Cabelo
  window.set3DAvatarSkin = function(hexColor) {
    if (skinMat && hexColor) {
      skinMat.color.set(hexColor);
    }
  };

  window.set3DAvatarHair = function(style, hexColor) {
    if (hairMat && hexColor) {
      hairMat.color.set(hexColor);
    }
  };

  // 8. ANIMAÇÃO IDLE SUTIL & PISCADAS DE OLHOS
  let clock = new THREE.Clock();
  let blinkTimer = 0;
  let isBlinking = false;

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    avatarRoot.position.y = Math.sin(time * 1.8) * 0.012;
    headGroup.rotation.y = Math.sin(time * 0.9) * 0.03;
    headGroup.rotation.x = Math.cos(time * 1.4) * 0.015;

    ring1.rotation.z = time * 0.3;
    ring2.rotation.z = -time * 0.45;

    blinkTimer += 0.016;
    if (blinkTimer > 3.5 && !isBlinking) {
      isBlinking = true;
      blinkTimer = 0;
    }

    if (isBlinking) {
      eyesGroup.scale.y -= 0.25;
      if (eyesGroup.scale.y <= 0.05) {
        eyesGroup.scale.y = 0.05;
        isBlinking = false;
      }
    } else if (eyesGroup.scale.y < 1.0) {
      eyesGroup.scale.y += 0.2;
      if (eyesGroup.scale.y >= 1.0) eyesGroup.scale.y = 1.0;
    }

    applyMorphTargetValues();

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // 9. EVENT LISTENERS PARA BOTÕES DE ROTAÇÃO E REDIMENSIONAMENTO
  const rotateLeftBtn = document.getElementById('rotateLeft');
  const rotateRightBtn = document.getElementById('rotateRight');
  const rotationSlider = document.getElementById('avatar-rotation-slider');

  if (rotateLeftBtn) {
    rotateLeftBtn.addEventListener('click', () => {
      avatarRoot.rotation.y -= 0.45;
      syncRotationUI();
    });
  }

  if (rotateRightBtn) {
    rotateRightBtn.addEventListener('click', () => {
      avatarRoot.rotation.y += 0.45;
      syncRotationUI();
    });
  }

  if (rotationSlider) {
    rotationSlider.addEventListener('input', (e) => {
      const deg = parseInt(e.target.value);
      avatarRoot.rotation.y = (deg * Math.PI) / 180;
      const valSpan = document.getElementById('rotation-angle-val');
      if (valSpan) valSpan.textContent = `${deg}°`;
    });
  }

  function syncRotationUI() {
    if (!rotationSlider) return;
    let deg = Math.round((avatarRoot.rotation.y * 180 / Math.PI) % 360);
    if (deg < 0) deg += 360;
    rotationSlider.value = deg;
    const valSpan = document.getElementById('rotation-angle-val');
    if (valSpan) valSpan.textContent = `${deg}°`;
  }

  window.addEventListener('resize', () => {
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  // 10. MODULARIDADE DE VESTUÁRIO
  window.equipClothingOn3DAvatar = function(item) {
    if (!item) return;
    if (item.categoria === 'Moletons' || item.categoria === 'Jaquetas' || item.categoria === 'Camisetas') {
      if (item.marca === 'adidas') {
        shirtMat.color.setHex(0x181a26);
        shirtMat.roughness = 0.25;
      } else {
        shirtMat.color.setHex(0x111424);
        shirtMat.roughness = 0.35;
      }
    } else if (item.categoria === 'Calças' || item.categoria === 'Shorts') {
      pantsMat.color.setHex(item.estacao === 'inverno' ? 0x22283f : 0x181f38);
    } else if (item.categoria === 'Acessórios') {
      shoesCyanMat.color.setHex(0x00f3ff);
    }
  };
}
