import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const sepia: (args: [NodeRepresentation]) => ShaderNodeObject<Node>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        sepia: typeof sepia;
    }
}
