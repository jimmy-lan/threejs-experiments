import "./style.css";
import { getSphere } from "./sphere";
import { getCamera } from "./camera";
import { Size } from "./size";
import { getRenderer } from "./renderer";

const start = () => {
  const size = new Size();
  const sphere = getSphere();
  const camera = getCamera(size);
  const renderer = getRenderer(size);
};

start();
