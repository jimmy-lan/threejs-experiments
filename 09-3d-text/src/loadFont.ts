import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

const fontLoader = new FontLoader();

export const loadFont = (url: string) => {
  return new Promise((resolve, reject) => {
    return fontLoader.load(
      url,
      (font) => resolve(font),
      () => {},
      (event) => reject(event)
    );
  });
};
