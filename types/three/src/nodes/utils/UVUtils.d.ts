import OperatorNode from "../math/OperatorNode.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const rotateUV: (
    uv: NodeRepresentation,
    rotation: NodeRepresentation,
    center?: NodeRepresentation,
) => ShaderNodeObject<OperatorNode>;

export const spherizeUV: (
    uv: NodeRepresentation,
    strength: NodeRepresentation,
    center?: NodeRepresentation,
) => ShaderNodeObject<OperatorNode>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        rotateUV: typeof rotateUV;
        spherizeUV: typeof spherizeUV;
    }
}
