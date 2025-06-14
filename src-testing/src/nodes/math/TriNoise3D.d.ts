import Node from "../core/Node.js";
import { ShaderNodeObject } from "../tsl/TSLCore.js";

export const tri: (x: Node) => ShaderNodeObject<Node>;

export const tri3: (p: Node) => ShaderNodeObject<Node>;

export const triNoise3D: (
    p_immutable: Node,
    spd: Node,
    time: Node,
) => ShaderNodeObject<Node>;
