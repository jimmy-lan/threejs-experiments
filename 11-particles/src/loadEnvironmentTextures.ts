import { CubeTextureLoader } from "three";

const cubeTextureLoader = new CubeTextureLoader();

const getPath = (set: string, filename: string) => {
  return `/assets/textures/environmentMaps/${set}/${filename}`;
};

export const loadEnvironmentTextures = (set: string) => {
  return cubeTextureLoader.load([
    getPath(set, "px.jpg"),
    getPath(set, "nx.jpg"),
    getPath(set, "py.jpg"),
    getPath(set, "ny.jpg"),
    getPath(set, "pz.jpg"),
    getPath(set, "nz.jpg"),
  ]);
};
