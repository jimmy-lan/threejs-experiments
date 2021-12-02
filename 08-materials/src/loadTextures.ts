import { TextureLoader } from "three";

const textureLoader = new TextureLoader();

const loadDoorTexture = (filename: string) => {
  return textureLoader.load(`/assets/textures/door/${filename}`);
};

export const loadTextures = () => {
  const door = {
    color: loadDoorTexture("color.jpg"),
  };
};
