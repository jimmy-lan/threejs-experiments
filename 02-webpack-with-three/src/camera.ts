import { PerspectiveCamera } from "three";
import { Size } from "./size";

export const getCamera = (size: Size) => {
  return new PerspectiveCamera(55, size.aspect);
};
