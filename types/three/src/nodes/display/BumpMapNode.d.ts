import Node from "../core/Node.js";

declare class BumpMapNode extends Node {
    textureNode: Node;
    scaleNode: Node | null;

    constructor(textureNode: Node, scaleNode?: Node | null);
}

export default BumpMapNode;

export const bumpMap: (
    textureNode: Node,
    scaleNode?: Node | null,
) => BumpMapNode;
