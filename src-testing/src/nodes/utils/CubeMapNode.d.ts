import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

declare class CubeMapNode extends TempNode {
    envNode: Node;

    constructor(envNode: Node);
}

export const cubeMapNode: (envNode: NodeRepresentation) => ShaderNodeObject<CubeMapNode>;

export default CubeMapNode;
