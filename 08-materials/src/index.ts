import {
  Clock,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import "./style.css";
import { Size } from "./Size";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadTextures } from "./loadTextures";

const RENDER_CANVAS_SELECTOR = "canvas.root";

const size = new Size(window.innerWidth, window.innerHeight);
const camera = new PerspectiveCamera(50, size.aspect);
camera.position.z = 3;
const scene = new Scene();

const textures = loadTextures();
const material = new MeshBasicMaterial({
  map: textures.door.color,
  color: "cyan",
  opacity: 0.5,
  transparent: true,
  alphaMap: textures.door.alpha,
  side: DoubleSide,
});

const sphere = new Mesh(new SphereGeometry(0.5, 16, 16), material);
sphere.position.setX(-1.5);
const plane = new Mesh(new PlaneGeometry(1, 1), material);
plane.position.setX(0);
const torus = new Mesh(new TorusGeometry(0.3, 0.2, 16, 32), material);
torus.position.setX(1.5);

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
