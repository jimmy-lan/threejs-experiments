import {
  BoxGeometry,
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import "./style.css";
import { Size } from "./size";

const RENDER_CANVAS_SELECTOR = "canvas.root";

const size = new Size();
const cube = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: "#6898FD" })
);
const camera = new PerspectiveCamera(50, size.aspect);
camera.position.z = 3;

const scene = new Scene();
scene.add(cube, camera);
const canvas = document.querySelector(RENDER_CANVAS_SELECTOR);
const renderer = new WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

const clock = new Clock();

const beforeRender = () => {
  clock.stop();
  const elapsedTime = clock.getElapsedTime();
  clock.start();
  cube.rotation.y += 0.3 * elapsedTime;
  renderer.render(scene, camera);
  requestAnimationFrame(beforeRender);
};

requestAnimationFrame(beforeRender);
