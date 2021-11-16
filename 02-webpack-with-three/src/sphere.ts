import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";

export const getSphere = () => {
  const geometry = new SphereGeometry(2, 16, 16);
  const material = new MeshBasicMaterial({ color: "#6898FD" });
  return new Mesh(geometry, material);
};
