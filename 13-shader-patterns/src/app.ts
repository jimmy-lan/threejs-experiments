import { renderer } from "./objects/renderer";
import { scene } from "./objects/scene";
import { camera } from "./objects/camera";

export const start = () => {
  renderer.render(scene, camera);
};
