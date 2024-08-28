import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

declare class ConditionalNode extends Node {
    condNode: Node;
    ifNode: Node;
    elseNode: Node;

    constructor(condNode: Node, ifNode: Node, elseNode: Node);
}

export default ConditionalNode;

export const select: (
    condNode: NodeRepresentation,
    ifNode: NodeRepresentation,
    elseNode: NodeRepresentation,
) => ShaderNodeObject<Node>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        select: typeof select;
    }
}

/**
 * @deprecated cond() has been renamed to select()
 */
export const cond: (
    condNode: NodeRepresentation,
    ifNode: NodeRepresentation,
    elseNode: NodeRepresentation,
) => ShaderNodeObject<Node>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        cond: typeof cond;
    }
}
