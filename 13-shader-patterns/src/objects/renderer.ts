import { WebGLRenderer } from "three";
import { getRenderSize } from "../helpers";

const canvas = document.querySelector("canvas.root");
const renderer = new WebGLRenderer({ canvas });
const size = getRenderSize();

const configureRender = () => {
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
};

window.addEventListener("resize", () => {
  configureRender();
});

configureRender();

export { renderer };
