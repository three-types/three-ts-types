import { Camera } from "../../cameras/Camera.js";
import { Light } from "../../lights/Light";
import LightsNode from "../../nodes/lighting/LightsNode.js";
import { Scene } from "../../scenes/Scene.js";
import ChainMap from "./ChainMap.js";

declare class Lighting extends ChainMap<[Scene, Camera], LightsNode> {
    constructor();

    createNode(lights?: Light[]): LightsNode;

    getNode(scene: Scene, camera: Camera): LightsNode;
}

export default Lighting;
