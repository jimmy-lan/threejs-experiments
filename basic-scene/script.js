const getCanvas = () => {
  const canvas = document.querySelector("canvas.root");
  if (!canvas) {
    console.error("Unable to locate root canvas to render object.");
  }
  return canvas;
};

class Size {
  constructor(width = 600, height = 600) {
    this.width = width;
    this.height = height;
  }

  getAspect() {
    return this.width / this.height;
  }
}

const canvas = getCanvas();
const renderSize = new Size();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#6898FD" });
const box = new THREE.Mesh(geometry, material);

const camera = new THREE.PerspectiveCamera(50, renderSize.getAspect());
// Allows us to see the box from the front.
camera.position.z = 3;

const scene = new THREE.Scene();
scene.add(box);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(renderSize.width, renderSize.height);
renderer.render(scene, camera);
