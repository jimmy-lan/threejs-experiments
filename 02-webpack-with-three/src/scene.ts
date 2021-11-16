import { Scene } from "three";
import { Size } from "./size";
import { getSphere } from "./sphere";
import { getCamera } from "./camera";

export const constructScene = (size: Size) => {
  const scene = new Scene();
  scene.add(getSphere());
  scene.add(getCamera(size));
  return scene;
};
