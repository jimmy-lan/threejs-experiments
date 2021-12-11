import { PerspectiveCamera, Scene } from "three";
import { getRenderSize } from "./helpers";

/**
 * Create a scene with a default camera added to the scene.
 * @param size Size of the render.
 */
export const createSceneWithCamera = () => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(50, getRenderSize().aspect);
  camera.position.z = 3;
  scene.add(camera);
  window.addEventListener("resize", () => {
    camera.aspect = getRenderSize().aspect;
    camera.updateProjectionMatrix();
  });
  return scene;
};
