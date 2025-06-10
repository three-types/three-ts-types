import { NodeRepresentation, ShaderNodeObject } from "three/tsl";
import { Node, TempNode, Vector2 } from "three/webgpu";

declare class ChromaticAberrationNode extends TempNode {
    textureNode: Node;
    strengthNode: Node;
    centerNode: Node;
    scaleNode: Node;

    constructor(textureNode: Node, strengthNode: Node, centerNode: Node, scaleNode: Node);
}

export default ChromaticAberrationNode;

export const chromaticAberration: (
    node: NodeRepresentation,
    strength?: NodeRepresentation,
    center?: NodeRepresentation | Vector2 | null,
    scale?: NodeRepresentation,
) => ShaderNodeObject<ChromaticAberrationNode>;
