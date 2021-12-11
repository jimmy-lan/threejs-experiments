import { PerspectiveCamera, Scene } from "three";
import { Size } from "./models/Size";

export const createSceneWithCamera = (size: Size) => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(50, size.aspect);
  camera.position.z = 3;
  scene.add(camera);
  return scene;
};
