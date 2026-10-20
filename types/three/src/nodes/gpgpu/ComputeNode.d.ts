import IndirectStorageBufferAttribute from "../../renderers/common/IndirectStorageBufferAttribute.js";
import Renderer from "../../renderers/common/Renderer.js";
import Node from "../core/Node.js";
import UniformNode from "../core/UniformNode.js";

type ComputeDispatchSize = number | number[] | IndirectStorageBufferAttribute;

export default class ComputeNode extends Node {
    readonly isComputeNode: boolean;

    computeNode: Node;
    workgroupSize: number[];
    count: number | null;
    dispatchSize: ComputeDispatchSize | null;
    name: string;

    onInitFunction: ((args: { renderer: Renderer }) => void) | null;

    countNode: UniformNode<"uint", number> | null;

    constructor(computeNode: Node, workgroupSize: number[]);

    setName: (name: string) => this;

    /**
     * @deprecated "label()" has been deprecated. Use "setName()" instead.
     */
    label: (name: string) => this;

    onInit(callback: ((args: { renderer: Renderer }) => void) | null): this;
}

export const computeKernel: (node: Node, workgroupSize?: number[]) => ComputeNode;

export const compute: (
    node: Node,
    count: ComputeDispatchSize,
    workgroupSize?: number[],
) => ComputeNode;

declare module "../core/Node.js" {
    interface NodeElements {
        compute: (
            count: ComputeDispatchSize,
            workgroupSize?: number[],
        ) => ComputeNode;

        computeKernel: (workgroupSize?: number[]) => ComputeNode;
    }
}
