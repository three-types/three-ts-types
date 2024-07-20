import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import UniformNode from "../core/UniformNode.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

declare class Lut3DNode extends TempNode {
    inputNode: Node;
    lutNode: Node;
    size: ShaderNodeObject<UniformNode<number>>;
    intensityNode: Node;

    constructor(inputNode: Node, lutNode: Node, size: number, intensityNode: Node);
}

export const lut3D: (
    node: NodeRepresentation,
    lut: NodeRepresentation,
    size: number,
    intensity: NodeRepresentation,
) => ShaderNodeObject<Lut3DNode>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        lut3D: typeof lut3D;
    }
}

export default Lut3DNode;
