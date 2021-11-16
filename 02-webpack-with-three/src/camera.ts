import { PerspectiveCamera } from "three";
import { Size } from "./size";

export const getCamera = (size: Size) => {
  const camera = new PerspectiveCamera(55, size.aspect);
  camera.position.z = 3;
  return camera;
};
