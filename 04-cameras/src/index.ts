import {
  BoxGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector2,
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
const cubeEdgeLines = new LineSegments(
  new EdgesGeometry(cube.geometry),
  new LineBasicMaterial({ color: "#fff" })
);
const camera = new PerspectiveCamera(50, size.aspect);
camera.position.z = 3;

const scene = new Scene();
scene.add(cube, cubeEdgeLines, camera);
const canvas = document.querySelector(RENDER_CANVAS_SELECTOR);
const renderer = new WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

const cursor = new Vector2(0, 0);
addEventListener("mousemove", (event: MouseEvent) => {
  // x, y range: [-0.5, 0.5]
  cursor.x = event.clientX / size.width - 0.5;
  cursor.y = -(event.clientY / size.height - 0.5);
});

const renderFrame = () => {
  camera.position.set(cursor.x * 5, cursor.y * 5, camera.position.z);
  camera.lookAt(cube.position);

  renderer.render(scene, camera);
  requestAnimationFrame(renderFrame);
};

requestAnimationFrame(renderFrame);
