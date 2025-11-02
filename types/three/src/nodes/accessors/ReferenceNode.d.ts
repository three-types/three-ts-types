import Node from "../core/Node.js";

interface ReferenceNodeInterface<T> extends Node {
    property: string;

    uniformType: string;

    object: T;
    count: number | null;

    properties: string[];
    reference: T | null;
    node: Node | null;

    setNodeType(uniformType: string): void;
}

declare const ReferenceNode: {
    new<TNodeType, T>(
        property: string,
        uniformType: string,
        object?: T | null,
        count?: number | null,
    ): ReferenceNode<TNodeType, T>;
};

type ReferenceNode<TNodeType, T> = ReferenceNodeInterface<T> & Node<TNodeType>;

export default ReferenceNode;

export const reference: <TNodeType, T>(name: string, type: string, object: T) => ReferenceNode<TNodeType, T>;
export const referenceBuffer: <TNodeType, T>(
    name: string,
    type: string,
    count: number,
    object: T,
) => ReferenceNode<TNodeType, T>;
