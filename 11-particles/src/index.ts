import {
  BufferAttribute,
  BufferGeometry,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";
import "./style.css";
import { Size } from "./Size";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const RENDER_CANVAS_SELECTOR = "canvas.root";

const size = new Size(window.innerWidth, window.innerHeight);
const camera = new PerspectiveCamera(50, size.aspect);
camera.position.z = 3;
const scene = new Scene();
const textureLoader = new TextureLoader();
const particleTexture = textureLoader.load("/assets/textures/particles/2.png");

const numParticles = 1000;
const positions = new Float32Array(numParticles * 3);
for (let i = 0; i < positions.length; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new BufferGeometry();
particlesGeometry.setAttribute("position", new BufferAttribute(positions, 3));
const particlesMaterial = new PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  transparent: true,
  alphaMap: particleTexture,
  color: "#ff88cc",
});
const particles = new Points(particlesGeometry, particlesMaterial);
scene.add(particles);

const canvas = document.querySelector(RENDER_CANVAS_SELECTOR);
const controls = new OrbitControls(camera, canvas as HTMLElement);
controls.enableDamping = true;

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

const renderFrame = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderFrame);
};

requestAnimationFrame(renderFrame);
