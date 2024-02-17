import { NodeTypeOption } from "../core/constants.js";
import { NodeOrType, NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";
import StorageArrayElementNode from "../utils/StoargeArrayElementNode.js";
import BufferNode from "./BufferNode.js";

export default class StorageBufferNode extends BufferNode {
    constructor(value: ArrayLike<number>, bufferType: NodeTypeOption, bufferCount?: number);

    element(indexNode: NodeRepresentation): ShaderNodeObject<StorageArrayElementNode>;
}

export const storage: (
    value: ArrayLike<number>,
    nodeOrType: NodeOrType,
    count: number,
) => ShaderNodeObject<StorageBufferNode>;
