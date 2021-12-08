import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Clock,
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

const numParticles = 500;
const positions = new Float32Array(numParticles * 3);
const colors = new Float32Array(numParticles * 3);
for (let i = 0; i < positions.length; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

const particlesGeometry = new BufferGeometry();
particlesGeometry.setAttribute("position", new BufferAttribute(positions, 3));
particlesGeometry.setAttribute("color", new BufferAttribute(colors, 3));
const particlesMaterial = new PointsMaterial({
  size: 0.3,
  sizeAttenuation: true,
  transparent: true,
  alphaMap: particleTexture,
  depthWrite: false,
  blending: AdditiveBlending,
  vertexColors: true,
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

const clock = new Clock();

const renderFrame = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderFrame);
};

requestAnimationFrame(renderFrame);
