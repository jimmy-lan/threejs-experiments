import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";

export const getSphere = () => {
  const geometry = new SphereGeometry(2, 16, 16);
  const material = new MeshBasicMaterial({ color: "#ffff00" });
  return new Mesh(geometry, material);
};
