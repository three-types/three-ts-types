import OperatorNode from "../math/OperatorNode.js";
import { ShaderNodeObject } from "../tsl/TSLCore.js";
import Node from "../core/Node.js";

export const rotateUV: (
    uv: Node,
    rotation: Node,
    center?: Node,
) => ShaderNodeObject<OperatorNode>;

export const spherizeUV: (
    uv: Node,
    strength: Node | number,
    center?: Node,
) => ShaderNodeObject<OperatorNode>;
