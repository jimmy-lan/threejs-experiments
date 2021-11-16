import { Camera, Scene } from "three";
import { getSphere } from "./sphere";
import { getAxesHelper } from "./axesHelper";

export const constructScene = (camera: Camera) => {
  const scene = new Scene();
  const sphere = getSphere();
  const axesHelper = getAxesHelper();
  sphere.position.set(1, 1, sphere.position.z);
  sphere.scale.set(0.5, 0.5, 2);
  /*
   * When rotating objects, imagine an axes helper rotating with the 3D object.
   * So, the order of rotation matters.
   */
  sphere.rotation.x = Math.PI * 0.25;
  sphere.rotation.y = Math.PI * 0.25;
  // sphere.rotation.reorder("YX")
  camera.position.set(2, 2, 8);
  scene.add(sphere);
  scene.add(camera);
  scene.add(axesHelper);
  return scene;
};
