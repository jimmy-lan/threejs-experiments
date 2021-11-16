import "./style.css";
import { getCamera } from "./camera";
import { Size } from "./size";
import { getRenderer } from "./renderer";
import { constructScene } from "./scene";

const start = () => {
  const size = new Size();
  const camera = getCamera(size);
  const scene = constructScene(camera);
  const renderer = getRenderer(size);
  renderer.render(scene, camera);
};

start();
