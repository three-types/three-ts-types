import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const Discard: (conditional: NodeRepresentation) => ShaderNodeObject<Node>;
export const Return: () => ShaderNodeObject<Node>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        discard: typeof Discard;
    }
}
