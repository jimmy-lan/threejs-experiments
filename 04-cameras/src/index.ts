import {
  BoxGeometry,
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
const camera = new PerspectiveCamera(50, size.aspect);
camera.position.z = 3;

const scene = new Scene();
scene.add(cube, camera);
const canvas = document.querySelector(RENDER_CANVAS_SELECTOR);
const renderer = new WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

const cursor = new Vector2(0, 0);
addEventListener("mousemove", (event: MouseEvent) => {
  cursor.x = event.clientX / size.width;
  cursor.y = event.clientY / size.height;
});
