import {
  AmbientLight,
  BufferAttribute,
  Clock,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  NearestFilter,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import "./style.css";
import { Size } from "./Size";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadTextures } from "./loadTextures";
import GUI from "lil-gui";

const RENDER_CANVAS_SELECTOR = "canvas.root";

const size = new Size(window.innerWidth, window.innerHeight);
const camera = new PerspectiveCamera(50, size.aspect);
camera.position.z = 3;
const scene = new Scene();
const gui = new GUI();

const textures = loadTextures();
// Mesh basic material
// const material = new MeshBasicMaterial({
//   map: textures.door.color,
//   color: "cyan",
//   opacity: 0.5,
//   transparent: true,
//   alphaMap: textures.door.alpha,
//   side: DoubleSide,
// });

// Mesh normal material maps normals to colours.
// Doc: https://threejs.org/docs/#api/en/materials/MeshNormalMaterial
// const material = new MeshNormalMaterial({ flatShading: true });

// The matcap material simulates light based on normal vectors on the object.
// It does not react to light in the environment.
// const material = new MeshMatcapMaterial({ matcap: textures.matcap.regular });

// The depth material renders white for the part of object that is close to the camera
// and renders black for the part of object that is far from the camera.
// This can be useful to create effects like fogs.
// const material = new MeshDepthMaterial();

const ambientLight = new AmbientLight("#fff", 0.5);
const pointLight = new PointLight("#fff", 0.5);
pointLight.position.set(2, 3, 4);
scene.add(ambientLight, pointLight);
// The lambert material reacts to light.
// const material = new MeshLambertMaterial();
// const material = new MeshPhongMaterial({ shininess: 100, specular: "#1188ff" });
// textures.gradient.colors3.magFilter = NearestFilter;
// textures.gradient.colors3.minFilter = NearestFilter;
// textures.gradient.colors3.generateMipmaps = false;
// textures.gradient.colors5.magFilter = NearestFilter;
// textures.gradient.colors5.minFilter = NearestFilter;
// textures.gradient.colors5.generateMipmaps = false;
// const material = new MeshToonMaterial({
//   gradientMap: textures.gradient.colors3,
// });

const material = new MeshStandardMaterial({
  metalness: 0.45,
  roughness: 0.65,
  map: textures.door.color,
  aoMap: textures.door.ambientOcclusion,
  aoMapIntensity: 1,
  displacementMap: textures.door.height,
});
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);
gui.add(material, "aoMapIntensity").min(0).max(5).step(0.01);

const sphere = new Mesh(new SphereGeometry(0.5, 64, 64), material);
sphere.position.setX(-1.5);
sphere.geometry.setAttribute(
  "uv2",
  new BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
const plane = new Mesh(new PlaneGeometry(1, 1, 100, 100), material);
plane.position.setX(0);
plane.geometry.setAttribute(
  "uv2",
  new BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
const torus = new Mesh(new TorusGeometry(0.3, 0.2, 64, 128), material);
torus.position.setX(1.5);
torus.geometry.setAttribute(
  "uv2",
  new BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(camera, sphere, plane, torus);

const canvas = document.querySelector(RENDER_CANVAS_SELECTOR);
const controls = new OrbitControls(camera, canvas as HTMLElement);
controls.enableDamping = true;

const renderer = new WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
renderer.render(scene, camera);

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
});

const clock = new Clock();
const renderFrame = () => {
  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderFrame);
};

requestAnimationFrame(renderFrame);
