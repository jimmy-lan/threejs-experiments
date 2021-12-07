import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import {
  AxesHelper,
  Mesh,
  MeshMatcapMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { loadFont } from "./loadFont";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

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
  const helvetikerFont = await loadFont(
    "/fonts/helvetiker_regular.typeface.json"
  );
  const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
  const textGeometry = new TextGeometry("Hello Three.js", {
    font: helvetikerFont,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.computeBoundingBox();
  textGeometry.center();
  const matcapMaterial = new MeshMatcapMaterial({ matcap: matcapTexture });
  const text = new Mesh(textGeometry, matcapMaterial);
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
