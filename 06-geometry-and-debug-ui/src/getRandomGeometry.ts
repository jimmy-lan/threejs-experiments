import { getBufferGeometry } from "./getBufferGeometry";

export const getRandomGeometry = () => {
  const randomVertices = [];
  for (let i = 0; i < 50 * 3; i++) {
    randomVertices.push([
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5,
    ]);
  }
  return getBufferGeometry(...randomVertices);
};
