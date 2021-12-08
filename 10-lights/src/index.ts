import "./style.css";

import {
  AmbientLight,
  BoxGeometry,
  Clock,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  RectAreaLight,
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
gui.addFolder("Ambient Light").add(ambientLight, "intensity").min(0).max(1);

const directionalLight = new DirectionalLight("#fff", 0.5);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);
gui
  .addFolder("Directional Light")
  .add(directionalLight, "intensity")
  .min(0)
  .max(1);

const hemisphereLight = new HemisphereLight("#ff0000", "#0000ff", 0.5);
scene.add(hemisphereLight);
gui
  .addFolder("Hemisphere Light")
  .add(hemisphereLight, "intensity")
  .min(0)
  .max(1);

const pointLight = new PointLight("#ff9000", 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);
const pointLightGui = gui.addFolder("Point Light");
pointLightGui.add(pointLight, "intensity").min(0).max(1);
pointLightGui.add(pointLight, "distance").min(3).max(30);
pointLightGui.add(pointLight, "decay").min(0).max(10);
pointLightGui.add(pointLight.position, "x").min(-10).max(10);
pointLightGui.add(pointLight.position, "y").min(-10).max(10);
pointLightGui.add(pointLight.position, "z").min(-10).max(10);

const rectAreaLight = new RectAreaLight("#4e00ff", 2, 1, 1);
scene.add(rectAreaLight);

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
