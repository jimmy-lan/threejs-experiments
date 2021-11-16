import { Camera, Scene } from "three";
import { getSphere } from "./sphere";

export const constructScene = (camera: Camera) => {
  const scene = new Scene();
  const sphere = getSphere();
  sphere.position.set(1, 1, sphere.position.z);
  camera.position.z = 8;
  scene.add(sphere);
  scene.add(camera);
  return scene;
};
