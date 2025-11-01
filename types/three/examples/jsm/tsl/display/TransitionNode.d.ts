import { Node, TempNode, TextureNode, UniformNode } from "three/webgpu";

declare class TransitionNode extends TempNode<"vec4"> {
    textureNodeA: TextureNode;
    textureNodeB: TextureNode;
    mixTextureNode: TextureNode;

    mixRatioNode: Node;
    thresholdNode: Node;
    useTextureNode: Node;

    constructor(
        textureNodeA: TextureNode,
        textureNodeB: TextureNode,
        mixTextureNode: TextureNode,
        mixRatioNode: Node,
        thresholdNode: Node,
        useTextureNode: Node,
    );
}

export default TransitionNode;

export const transition: (
    node: Node,
    nodeB: Node,
    mixTexture: Node,
    mixRatio: UniformNode<"float", number>,
    threshold: UniformNode<"float", number>,
    useTexture: UniformNode<"float", number>,
) => TransitionNode;
