import { WebGLRenderer } from "three";
import { getCanvas, getRenderSize } from "../helpers";

const canvas = getCanvas();
const renderer = new WebGLRenderer({ canvas });

const configureRender = () => {
  const size = getRenderSize();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
};

window.addEventListener("resize", () => {
  configureRender();
});

configureRender();

export { renderer };
