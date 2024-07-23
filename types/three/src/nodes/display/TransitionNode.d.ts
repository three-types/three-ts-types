import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

declare class TransitionNode extends TempNode {
    textureNodeA: Node;
    textureNodeB: Node;
    mixTextureNode: Node;

    mixRatioNode: Node;
    thresholdNode: Node;
    useTextureNode: Node;

    constructor(
        textureNodeA: Node,
        textureNodeB: Node,
        mixTextureNode: Node,
        mixRatioNode: Node,
        thresholdNode: Node,
        useTextureNode: Node,
    );
}

export const transition: (
    node: NodeRepresentation,
    nodeB: NodeRepresentation,
    mixTexture: NodeRepresentation,
    mixRatio?: number,
    threshold?: number,
    useTexture?: number,
) => ShaderNodeObject<TransitionNode>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        transition: typeof transition;
    }
}

export default TransitionNode;
