import {
  BoxGeometry,
  ColorRepresentation,
  Group,
  Mesh,
  MeshBasicMaterial,
} from "three";

const getCube = (
  width: number,
  height: number,
  depth: number,
  color: ColorRepresentation
) => {
  return new Mesh(
    new BoxGeometry(width, height, depth),
    new MeshBasicMaterial({ color })
  );
};

const getCubeGroup = () => {
  const group = new Group();
  const cube1 = getCube(1, 1, 1, "#ff0000");
  const cube2 = getCube(1, 1, 1, "#00ff00");
  cube2.position.x = -2;
  const cube3 = getCube(1, 1, 1, "#0000ff");
  cube3.position.x = 2;
  group.add(cube1, cube2, cube3);
  return group;
};
