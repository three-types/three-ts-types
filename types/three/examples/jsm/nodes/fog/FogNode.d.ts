import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";
import NodeBuilder from "../core/NodeBuilder.js";

export default class FogNode extends Node {
    isFogNode: true;
    colorNode: Node;
    factorNode: Node;

    constructor(colorNode: Node, factorNode: Node);

    getViewZNode(builder: NodeBuilder): Node;
}

export const fog: (colorNode: NodeRepresentation, factorNode: NodeRepresentation) => ShaderNodeObject<FogNode>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        fog: typeof fog;
    }
}
