import { Camera } from "../../cameras/Camera.js";
import { StereoCamera } from "../../cameras/StereoCamera.js";
import { Scene } from "../../scenes/Scene.js";
import { ShaderNodeObject } from "../shadernode/ShaderNode.js";
import AnaglyphPassNode from "./AnaglyphPassNode.js";
import PassNode from "./PassNode.js";

declare class ParallaxBarrierPassNode extends PassNode {
    readonly isParallaxBarrierPassNode: true;

    stereo: StereoCamera;

    constructor(scene: Scene, camera: Camera);
}

export const parallaxBarrierPass: (scene: Scene, camera: Camera) => ShaderNodeObject<ParallaxBarrierPassNode>;

export default AnaglyphPassNode;
