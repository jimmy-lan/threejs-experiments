import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { loadFont } from "./loadFont";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

/**
 * Base
 */
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new Scene();
const textureLoader = new TextureLoader();

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const start = async () => {
  const cube = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial());
  scene.add(cube);

  const helvetikerFont = await loadFont(
    "/fonts/helvetiker_regular.typeface.json"
  );
  const textGeometry = new TextGeometry("Hello Three.js", {
    font: helvetikerFont,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  const textMaterial = new MeshBasicMaterial({ wireframe: true });
  const text = new Mesh(textGeometry, textMaterial);
  scene.add(text);
};

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 100);
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

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

start();
tick();
