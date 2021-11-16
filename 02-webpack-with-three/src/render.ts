import { WebGLRenderer } from "three";
import { Size } from "./size";

const RENDER_EL_SELECTOR = "canvas.root";

const getCanvas = () => {
  const canvas = document.querySelector(RENDER_EL_SELECTOR);
  if (!canvas) {
    throw new Error(
      `Unable to locate target canvas. Selector: ${RENDER_EL_SELECTOR}`
    );
  }
  return canvas;
};

const getRenderer = (size: Size) => {
  const canvas = getCanvas();
  const renderer = new WebGLRenderer({ canvas });
  renderer.setSize(size.width, size.height);
  return renderer;
};
