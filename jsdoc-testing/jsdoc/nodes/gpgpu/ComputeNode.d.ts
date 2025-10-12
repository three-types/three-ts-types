export default ComputeNode;
export function computeKernel(node: Node, workgroupSize?: Array<number>): AtomicFunctionNode;
export function compute(node: Node, count: number, workgroupSize?: Array<number>): AtomicFunctionNode;
/**
 * TODO
 *
 * @augments Node
 */
declare class ComputeNode extends Node {
    /**
     * Constructs a new compute node.
     *
     * @param {Node} computeNode - TODO
     * @param {Array<number>} workgroupSize - TODO.
     */
    constructor(computeNode: Node, workgroupSize: Array<number>);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isComputeNode: boolean;
    /**
     * TODO
     *
     * @type {Node}
     */
    computeNode: Node;
    /**
     * TODO
     *
     * @type {Array<number>}
     * @default [ 64 ]
     */
    workgroupSize: Array<number>;
    /**
     * TODO
     *
     * @type {number}
     */
    count: number;
    /**
     * TODO
     *
     * @type {?Function}
     */
    onInitFunction: Function | null;
    setCount(count: any): this;
    getCount(): number;
    /**
     * Sets the {@link ComputeNode#name} property.
     *
     * @param {string} name - The name of the uniform.
     * @return {ComputeNode} A reference to this node.
     */
    setName(name: string): ComputeNode;
    /**
     * Sets the {@link ComputeNode#name} property.
     *
     * @deprecated
     * @param {string} name - The name of the uniform.
     * @return {ComputeNode} A reference to this node.
     */
    label(name: string): ComputeNode;
    /**
     * TODO
     *
     * @param {Function} callback - TODO.
     * @return {ComputeNode} A reference to this node.
     */
    onInit(callback: Function): ComputeNode;
    /**
     * The method execute the compute for this node.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateBefore({ renderer }: NodeFrame): void;
    setup(builder: any): string | Node | null;
    generate(builder: any, output: any): any;
}
import Node from '../core/Node.js';
