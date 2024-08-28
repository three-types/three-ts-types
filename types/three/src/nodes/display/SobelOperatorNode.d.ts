import TextureNode from "../accessors/TextureNode.js";
import TempNode from "../core/TempNode.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

declare class SobelOperatorNode extends TempNode {
    textureNode: TextureNode;

    constructor(textureNode: TextureNode);
}

export default SobelOperatorNode;

export const sobel: (node: NodeRepresentation) => ShaderNodeObject<SobelOperatorNode>;
