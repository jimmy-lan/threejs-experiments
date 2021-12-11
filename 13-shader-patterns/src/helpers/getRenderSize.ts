import { Size } from "../models";

export const getRenderSize = () => {
  return new Size(window.innerWidth, window.innerHeight);
};
