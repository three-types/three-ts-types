import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const hash: (seed: NodeRepresentation) => ShaderNodeObject<Node>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        hash: typeof hash;
    }
}
