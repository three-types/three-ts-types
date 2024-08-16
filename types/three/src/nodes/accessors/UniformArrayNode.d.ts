import Node from "../core/Node.js";
import { ShaderNodeObject } from "../shadernode/ShaderNode.js";
import ArrayElementNode from "../utils/ArrayElementNode.js";
import BufferNode from "./BufferNode.js";

declare class UniformArrayElementNode extends ArrayElementNode {
    constructor(arrayBuffer: Node, indexNode: Node);
}

declare class UniformArrayNode extends BufferNode {
    array: unknown[];
    elementType: string | null;

    readonly isArrayBufferNode: true;

    constructor(value: unknown[], elementType?: string | null);

    getElementLength(): number;

    element(indexNode: number): ShaderNodeObject<UniformArrayElementNode>;
}

export default UniformArrayNode;

export const uniformArray: (values: unknown[], nodeType?: string | null) => ShaderNodeObject<UniformArrayNode>;

/**
 * @deprecated THREE.WebGPURenderer: uniforms() has been renamed to uniformArray().
 */
export const uniforms: (values: unknown[], nodeType?: string | null) => ShaderNodeObject<UniformArrayNode>;