import { TextureLoader } from "three";

const textureLoader = new TextureLoader();

const loadTexture = (folder: string, filename: string) => {
  return textureLoader.load(`/assets/textures/${folder}/${filename}`);
};

const loadDoorTexture = (filename: string) => {
  return loadTexture("door", filename);
};

export const loadTextures = () => {
  const door = {
    color: loadDoorTexture("color.jpg"),
    alpha: loadDoorTexture("alpha.jpg"),
    ambientOcclusion: loadDoorTexture("ambientOcclusion.jpg"),
    height: loadDoorTexture("height.jpg"),
    normal: loadDoorTexture("normal.jpg"),
    metalness: loadDoorTexture("metalness.jpg"),
    roughness: loadDoorTexture("roughness.jpg"),
  };
};
