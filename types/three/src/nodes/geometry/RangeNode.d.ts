import { Color } from "../../math/Color.js";
import { Vector2 } from "../../math/Vector2.js";
import { Vector3 } from "../../math/Vector3.js";
import { Vector4 } from "../../math/Vector4.js";
import Node from "../core/Node.js";
import NodeBuilder from "../core/NodeBuilder.js";

interface RangeNodeInterface<TNodeType> {
    minNode: Node<TNodeType>;
    maxNode: Node<TNodeType>;

    constructor(minNode: Node<TNodeType>, maxNode: Node<TNodeType>);

    getVectorLength(builder: NodeBuilder): number;
}

declare const RangeNode: {
    new<TNodeType>(minNode: Node<TNodeType>, maxNode: Node<TNodeType>): RangeNode<TNodeType>;
};

type RangeNode<TNodeType> = RangeNodeInterface<TNodeType> & Node<TNodeType>;

export default RangeNode;

interface Range {
    (
        minNode: Color,
        maxNode: Color,
    ): RangeNode<"vec3">;
}

export const range: Range;
