import { Camera } from "../../cameras/Camera.js";
import { StereoCamera } from "../../cameras/StereoCamera.js";
import { Scene } from "../../scenes/Scene.js";
import { ShaderNodeObject } from "../shadernode/ShaderNode.js";
import PassNode from "./PassNode.js";

declare class AnaglyphPassNode extends PassNode {
    readonly isAnaglyphPassNode: true;

    stereo: StereoCamera;

    constructor(scene: Scene, camera: Camera);
}

export const anaglyphPass: (scene: Scene, camera: Camera) => ShaderNodeObject<AnaglyphPassNode>;

export default AnaglyphPassNode;
