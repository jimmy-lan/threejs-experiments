import { BufferAttribute, BufferGeometry } from "three";

export const getBufferGeometry = (...vertices: number[][]) => {
  const positions = [].concat(...vertices);
  const positionsAttribute = new BufferAttribute(positions, 3);
  const bufferGeometry = new BufferGeometry();
  bufferGeometry.setAttribute("position", positionsAttribute);
  return bufferGeometry;
};
