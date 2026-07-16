import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";

import "./ModelViewer.css";

function resolveAssetPath(src) {
  if (!src) return "";

  if (/^(https?:|blob:|data:)/i.test(src)) {
    return src;
  }

  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, "")}`;
}

function getModelFormat(url) {
  const cleanUrl = url.split(/[?#]/)[0].toLowerCase();

  return cleanUrl.endsWith(".obj") ? "OBJ" : "STL";
}

function orientationFromSize(size) {
  const rotation = new THREE.Euler(0, 0, 0);
  const smallestAxis = [
    ["x", size.x],
    ["y", size.y],
    ["z", size.z],
  ].sort((a, b) => a[1] - b[1])[0][0];

  if (smallestAxis === "x") rotation.y = Math.PI / 2;
  if (smallestAxis === "y") rotation.x = Math.PI / 2;

  return rotation;
}

function disposeMaterial(material) {
  if (Array.isArray(material)) {
    material.forEach((entry) => entry?.dispose());
    return;
  }

  material?.dispose();
}

function createMaterials(accent) {
  const solidMaterial = new THREE.MeshPhysicalMaterial({
    color: accent,
    emissive: new THREE.Color(accent).multiplyScalar(0.12),
    metalness: 0.42,
    roughness: 0.26,
    clearcoat: 0.65,
    clearcoatRoughness: 0.22,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
  });

  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xd9d0ff,
    transparent: true,
    opacity: 0.11,
    wireframe: true,
    depthWrite: false,
  });

  return { solidMaterial, wireMaterial };
}

function buildStlObject(geometry, materials) {
  geometry.computeVertexNormals();

  const root = new THREE.Group();
  const solidMesh = new THREE.Mesh(
    geometry,
    materials.solidMaterial
  );
  const wireMesh = new THREE.Mesh(
    geometry,
    materials.wireMaterial
  );

  wireMesh.scale.setScalar(1.002);
  root.add(solidMesh, wireMesh);

  return root;
}

function buildObjObject(object, materials) {
  const originalMaterials = new Set();

  object.traverse((child) => {
    if (!child.isMesh) return;

    child.geometry.computeVertexNormals();

    if (Array.isArray(child.material)) {
      child.material.forEach((material) =>
        originalMaterials.add(material)
      );
    } else if (child.material) {
      originalMaterials.add(child.material);
    }
  });

  const wireObject = object.clone(true);

  object.traverse((child) => {
    if (child.isMesh) {
      child.material = materials.solidMaterial;
    }
  });

  wireObject.traverse((child) => {
    if (child.isMesh) {
      child.material = materials.wireMaterial;
    }
  });

  originalMaterials.forEach((material) => material.dispose());

  const root = new THREE.Group();
  root.add(object, wireObject);

  return root;
}

function centreAndFitObject(object, fit) {
  object.updateMatrixWorld(true);

  const bounds = new THREE.Box3().setFromObject(object);
  const centre = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  const largestDimension = Math.max(size.x, size.y, size.z) || 1;
  const fittedSize = Math.max(0.5, Number(fit) || 1.65);
  const scale = fittedSize / largestDimension;

  object.scale.setScalar(scale);
  object.position.set(
    -centre.x * scale,
    -centre.y * scale,
    -centre.z * scale
  );
  object.updateMatrixWorld(true);

  return size;
}

export default function ModelViewer({
  src,
  label = "3D OBJECT",
  accent = "#a88bff",
  autoRotate = true,
  fit = 1.65,
  rotation = [0, 0, 0],
}) {
  const mountRef = useRef(null);
  const [status, setStatus] = useState("INITIALISING");
  const [progress, setProgress] = useState(0);

  const modelUrl = useMemo(() => resolveAssetPath(src), [src]);
  const modelFormat = useMemo(
    () => getModelFormat(modelUrl),
    [modelUrl]
  );
  const rotationX = Number(rotation?.[0] ?? 0);
  const rotationY = Number(rotation?.[1] ?? 0);
  const rotationZ = Number(rotation?.[2] ?? 0);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount || !modelUrl) {
      setStatus("MODEL UNAVAILABLE");
      return undefined;
    }

    let animationFrame = 0;
    let disposed = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 100);
    camera.position.set(0, 0.15, 3.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.75)
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.className = "model-viewer__canvas";
    renderer.domElement.setAttribute(
      "aria-label",
      `Interactive model: ${label}`
    );
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.enablePan = false;
    controls.minDistance = 1.7;
    controls.maxDistance = 6;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.9;
    controls.target.set(0, 0, 0);
    controls.saveState();

    scene.add(
      new THREE.HemisphereLight(0xc9bcff, 0x12081e, 1.7)
    );

    const keyLight = new THREE.DirectionalLight(0xd7ccff, 4.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(accent, 7, 10);
    rimLight.position.set(-3, 0.5, 2.5);
    scene.add(rimLight);

    const lowerLight = new THREE.PointLight(0x4c31a8, 4, 8);
    lowerLight.position.set(2, -3, -1);
    scene.add(lowerLight);

    const floorRing = new THREE.Mesh(
      new THREE.RingGeometry(0.83, 0.85, 96),
      new THREE.MeshBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
      })
    );
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.y = -0.92;
    scene.add(floorRing);

    const materials = createMaterials(accent);
    const loader =
      modelFormat === "OBJ" ? new OBJLoader() : new STLLoader();

    setStatus(`LOADING ${modelFormat}`);
    setProgress(0);

    loader.load(
      modelUrl,
      (loadedModel) => {
        if (disposed) {
          if (loadedModel?.dispose) loadedModel.dispose();
          return;
        }

        const renderable =
          modelFormat === "OBJ"
            ? buildObjObject(loadedModel, materials)
            : buildStlObject(loadedModel, materials);

        const size = centreAndFitObject(renderable, fit);
        const modelGroup = new THREE.Group();
        const orientationGroup = new THREE.Group();

        modelGroup.rotation.set(rotationX, rotationY, rotationZ);
        orientationGroup.rotation.copy(orientationFromSize(size));
        orientationGroup.rotation.z -= 0.08;
        orientationGroup.add(renderable);
        modelGroup.add(orientationGroup);
        scene.add(modelGroup);

        setProgress(100);
        setStatus("MODEL ONLINE");
      },
      (event) => {
        if (!event.lengthComputable || !event.total) return;

        setProgress(
          Math.min(99, Math.round((event.loaded / event.total) * 100))
        );
      },
      (error) => {
        console.error("MAGI OS model load failed:", error);
        setStatus("MODEL LOAD FAILED");
      }
    );

    function resize() {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    function render() {
      controls.update();
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    }

    render();

    function resetView() {
      controls.reset();
    }

    renderer.domElement.addEventListener("dblclick", resetView);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener(
        "dblclick",
        resetView
      );
      controls.dispose();

      scene.traverse((object) => {
        object.geometry?.dispose();
        if (object.material) disposeMaterial(object.material);
      });

      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [
    accent,
    autoRotate,
    fit,
    label,
    modelFormat,
    modelUrl,
    rotationX,
    rotationY,
    rotationZ,
  ]);

  return (
    <div className="model-viewer" data-model-status={status}>
      <div className="model-viewer__mount" ref={mountRef} />

      <div className="model-viewer__corners" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>

      <header className="model-viewer__header">
        <span>OBJECT SCAN / {modelFormat}</span>
        <strong>{status}</strong>
      </header>

      <div
        className="model-viewer__progress"
        aria-hidden={status === "MODEL ONLINE"}
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      <footer className="model-viewer__footer">
        <span>DRAG: ROTATE</span>
        <span>PINCH: ZOOM</span>
        <span>DOUBLE TAP: RESET</span>
      </footer>
    </div>
  );
}
