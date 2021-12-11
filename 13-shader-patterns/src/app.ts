import { renderer, scene, camera, plane } from "./objects";
import { orbitControls } from "./controls/orbitControls";

const renderFrame = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderFrame);
};

export const start = () => {
  scene.add(plane);
  renderer.render(scene, camera);
  requestAnimationFrame(renderFrame);
};
