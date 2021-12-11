import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera } from "../objects";
import { getCanvas } from "../helpers";

const canvas = getCanvas();
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

export { orbitControls };
