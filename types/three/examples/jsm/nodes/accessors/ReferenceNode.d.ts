import { NodeTypeOption } from "../core/constants.js";
import Node from "../core/Node.js";
import { NodeOrType, NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export default class ReferenceNode<T> extends Node {
    property: string;
    indexNode: Node | null;

    uniformType: NodeTypeOption;

    object: T;
    reference: T | null;

    node: Node | null;

    constructor(property: string, uniformType: NodeTypeOption, object?: T | null, indexNode?: Node | null);

    setNodeType(uniformType: NodeTypeOption): void;
}

export const reference: <T>(name: string, nodeOrType: NodeOrType, object: T) => ShaderNodeObject<ReferenceNode<T>>;
export const referenceIndex: <T>(
    name: string,
    index: NodeRepresentation,
    nodeOrType: NodeOrType,
    object: T,
) => ShaderNodeObject<ReferenceNode<T>>;
