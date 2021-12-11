import { DoubleSide, Mesh, PlaneGeometry, ShaderMaterial } from "three";

const geometry = new PlaneGeometry(1, 1, 16, 16);
const material = new ShaderMaterial({
  vertexShader: planeVertexShader,
  fragmentShader: planeFragmentShader,
  side: DoubleSide,
});
const plane = new Mesh(geometry, material);

export { plane };
