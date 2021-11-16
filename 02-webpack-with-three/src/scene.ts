import { Camera, Scene } from "three";
import { getSphere } from "./sphere";
import { getAxesHelper } from "./axesHelper";

export const constructScene = (camera: Camera) => {
  const scene = new Scene();
  const sphere = getSphere();
  const axesHelper = getAxesHelper();
  sphere.position.set(1, 1, sphere.position.z);
  camera.position.z = 8;
  scene.add(sphere);
  scene.add(camera);
  scene.add(axesHelper);
  return scene;
};
