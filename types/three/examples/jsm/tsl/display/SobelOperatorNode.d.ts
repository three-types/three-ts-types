import { Node, TempNode, TextureNode } from "three/webgpu";

declare class SobelOperatorNode extends TempNode<"vec4"> {
    textureNode: TextureNode;

    constructor(textureNode: TextureNode);
}

export default SobelOperatorNode;

export const sobel: (node: Node) => SobelOperatorNode;
