import { Camera, Scene } from "three";
import { getSphere } from "./sphere";

export const constructScene = (camera: Camera) => {
  const scene = new Scene();
  scene.add(getSphere());
  scene.add(camera);
  return scene;
};
