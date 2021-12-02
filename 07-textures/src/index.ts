import {
  BoxGeometry,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  LoadingManager,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  RepeatWrapping,
  Scene,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";
import "./style.css";
import { Size } from "./Size";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const RENDER_CANVAS_SELECTOR = "canvas.root";

const loadingManager = new LoadingManager();
const textureLoader = new TextureLoader(loadingManager);
const colorTexture = textureLoader.load("assets/door/color.jpg");
const alphaTexture = textureLoader.load("assets/door/alpha.jpg");
const heightTexture = textureLoader.load("assets/door/height.jpg");
const normalTexture = textureLoader.load("assets/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "assets/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("assets/door/metalness.jpg");
const roughnessTexture = textureLoader.load("assets/door/roughness.jpg");

colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;
colorTexture.wrapS = RepeatWrapping;
colorTexture.wrapT = RepeatWrapping;

colorTexture.offset.x = 0.5;
colorTexture.offset.y = 0.5;

colorTexture.rotation = 0.25 * Math.PI;

const size = new Size(window.innerWidth, window.innerHeight);
const boxGeometry = new BoxGeometry(1, 1, 1);
const cubeMaterial = new MeshBasicMaterial({ map: colorTexture });
const cube = new Mesh(boxGeometry, cubeMaterial);
const cubeOutline = new LineSegments(
  new EdgesGeometry(boxGeometry),
  new LineBasicMaterial({ color: "white" })
);
const cubeGroup = new Group();
cubeGroup.add(cube, cubeOutline);

const camera = new PerspectiveCamera(50, size.aspect);
camera.position.z = 3;

const scene = new Scene();
scene.add(cubeGroup, camera);

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
