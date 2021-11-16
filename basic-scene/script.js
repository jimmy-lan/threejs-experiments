const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#6898FD" });
const box = new THREE.Mesh(geometry, material);

const scene = THREE.Scene();
scene.add(box);

const renderSize = {
  width: 600,
  height: 600,
  getAspect: function () {
    return this.width / this.height;
  },
};

const camera = new THREE.PerspectiveCamera(50, renderSize.getAspect());
