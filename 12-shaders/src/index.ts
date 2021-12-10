import "./style.css";
import {
  Clock,
  Color,
  DoubleSide,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Size } from "./Size";
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";
import GUI from "lil-gui";

const RENDER_CANVAS_SELECTOR = "canvas.root";

const size = new Size(window.innerWidth, window.innerHeight);
const camera = new PerspectiveCamera(50, size.aspect);
camera.position.z = 3;
const scene = new Scene();
const textureLoader = new TextureLoader();
const flagTexture = textureLoader.load("assets/textures/flag-french.jpg");
const gui = new GUI();

const canvas = document.querySelector(RENDER_CANVAS_SELECTOR);
const controls = new OrbitControls(camera, canvas as HTMLElement);
controls.enableDamping = true;

const geometry = new PlaneGeometry(1, 1, 16, 16);
// const count = geometry.attributes.position.count;
// const randoms = new Float32Array(count);
// for (let i = 0; i < count; i++) {
//   randoms[i] = Math.random();
// }
// geometry.setAttribute("aRandom", new BufferAttribute(randoms, 1));
const material = new ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  side: DoubleSide,
  uniforms: {
    uFrequency: {
      value: new Vector2(10, 5),
    },
    uTime: {
      value: 0,
    },
    uColor: {
      value: new Color("orange"),
    },
    uTexture: {
      value: flagTexture,
    },
  },
});
const mesh = new Mesh(geometry, material);
scene.add(mesh);

gui
  .add(material.uniforms.uFrequency.value, "x")
  .min(0)
  .max(20)
  .step(0.01)
  .name("frequencyX");
gui
  .add(material.uniforms.uFrequency.value, "y")
  .min(0)
  .max(20)
  .step(0.01)
  .name("frequencyY");

const renderer = new WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
renderer.render(scene, camera);

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
});

const clock = new Clock();
const renderFrame = () => {
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsedTime;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderFrame);
};

requestAnimationFrame(renderFrame);
