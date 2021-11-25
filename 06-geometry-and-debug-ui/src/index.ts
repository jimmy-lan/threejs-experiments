import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
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
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const RENDER_CANVAS_SELECTOR = "canvas.root";

const size = new Size(window.innerWidth, window.innerHeight);
const positions = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
const positionsAttribute = new BufferAttribute(positions, 3);
const geometry = new BufferGeometry();
geometry.setAttribute("position", positionsAttribute);
const mesh = new Mesh(
  geometry,
  new MeshBasicMaterial({ color: "#6898FD", wireframe: true })
);

const camera = new PerspectiveCamera(50, size.aspect);
camera.position.z = 3;

const scene = new Scene();
scene.add(mesh, camera);

const canvas = document.querySelector(RENDER_CANVAS_SELECTOR);
const controls = new OrbitControls(camera, canvas as HTMLElement);
// https://threejs.org/docs/#examples/en/controls/OrbitControls.dampingFactor
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

const renderer = new WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
renderer.render(scene, camera);

const cursor = new Vector2(0, 0);
addEventListener("mousemove", (event: MouseEvent) => {
  // x, y range: [-0.5, 0.5]
  cursor.x = event.clientX / size.width - 0.5;
  cursor.y = -(event.clientY / size.height - 0.5);
});

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
});

window.addEventListener("dblclick", async () => {
  const fullscreenElement =
    // @ts-ignore
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      await canvas.requestFullscreen();
    } else {
      // @ts-ignore
      await canvas.webkitRequestFullscreen();
    }
    return;
  }
  if (document.exitFullscreen) {
    await document.exitFullscreen();
  } else {
    // @ts-ignore
    await document.webkitExitFullscreen();
  }
});

const renderFrame = () => {
  // camera.position.set(
  //   Math.sin(cursor.x * Math.PI * 2) * 3,
  //   cursor.y * 5,
  //   Math.cos(cursor.x * Math.PI * 2) * 3
  // );
  // camera.lookAt(cube.position);

  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(renderFrame);
};

requestAnimationFrame(renderFrame);
