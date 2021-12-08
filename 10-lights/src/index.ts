import "./style.css";

import {
  AmbientLight,
  BoxGeometry,
  Clock,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Size } from "./Size";
import GUI from "lil-gui";

const canvas = document.querySelector("canvas.root");

const scene = new Scene();
const gui = new GUI();
const size = new Size(window.innerWidth, window.innerHeight);

const ambientLight = new AmbientLight("#fff", 0.5);
scene.add(ambientLight);
gui
  .add(ambientLight, "intensity")
  .name("Ambient light intensity")
  .min(0)
  .max(1);

const directionalLight = new DirectionalLight("#fff", 0.5);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);
gui
  .add(directionalLight, "intensity")
  .name("Directional light intensity")
  .min(0)
  .max(1);

const material = new MeshStandardMaterial();
material.roughness = 0.4;

const sphere = new Mesh(new SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new Mesh(new BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new Mesh(new TorusGeometry(0.3, 0.2, 32, 64), material);
torus.position.x = 1.5;

const plane = new Mesh(new PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
});

const camera = new PerspectiveCamera(75, size.aspect, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

const controls = new OrbitControls(camera, canvas as HTMLElement);
controls.enableDamping = true;

const renderer = new WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
