import { PerspectiveCamera } from "three";
import { getRenderSize } from "./helpers";

const camera = new PerspectiveCamera(50, getRenderSize().aspect);
camera.position.z = 3;

window.addEventListener("resize", () => {
  camera.aspect = getRenderSize().aspect;
  camera.updateProjectionMatrix();
});

export { camera };
