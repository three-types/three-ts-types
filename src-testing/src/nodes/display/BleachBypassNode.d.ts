import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const bleach: (color: NodeRepresentation, opacity?: number) => ShaderNodeObject<Node>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        bleach: typeof bleach;
    }
}
