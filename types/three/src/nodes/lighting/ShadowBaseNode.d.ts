import { Light } from "../../lights/Light";
import Node from "../core/Node.js";
import { ShaderNodeObject } from "../tsl/TSLCore.js";

declare class ShadowBaseNode extends Node {
    light: Light;

    readonly isShadowBasedNode: true;

    constructor(light: Light);
}

export const shadowWorldPosition: ShaderNodeObject<Node>;

export default ShadowBaseNode;
