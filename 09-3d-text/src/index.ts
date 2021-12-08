import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  Mesh,
  MeshMatcapMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import { loadFont } from "./loadFont";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

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
  const textGeometry = new TextGeometry("Orange Cat!", {
    font: helvetikerFont,
    size: 0.5,
    height: 0.2,
    curveSegments: 30,
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

  const donutGeometry = new TorusGeometry(0.3, 0.2, 20, 45);
  for (let _ = 0; _ < 100; _++) {
    const donut = new Mesh(donutGeometry, matcapMaterial);

    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const donutScale = Math.random();
    donut.scale.set(donutScale, donutScale, donutScale);

    scene.add(donut);
  }
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
