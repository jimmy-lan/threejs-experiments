import { renderer, scene, camera, plane } from "./objects";

export const start = () => {
  scene.add(plane);
  renderer.render(scene, camera);
};
