export default ComputeNode;
export function computeKernel(node: Node, workgroupSize?: Array<number>): ComputeNode;
export function compute(node: Node, count: number | Array<number>, workgroupSize?: Array<number>): ComputeNode;
/**
 * Represents a compute shader node.
 *
 * @augments Node
 */
declare class ComputeNode extends Node {
    /**
     * Constructs a new compute node.
     *
     * @param {Node} computeNode - The node that defines the compute shader logic.
     * @param {Array<number>} workgroupSize - An array defining the X, Y, and Z dimensions of the workgroup for compute shader execution.
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
     * The node that defines the compute shader logic.
     *
     * @type {Node}
     */
    computeNode: Node;
    /**
     * An array defining the X, Y, and Z dimensions of the workgroup for compute shader execution.
     *
     * @type {Array<number>}
     * @default [ 64 ]
     */
    workgroupSize: Array<number>;
    /**
     * The total number of threads (invocations) to execute. If it is a number, it will be used
     * to automatically generate bounds checking against `instanceIndex`.
     *
     * @type {number|Array<number>}
     */
    count: number | Array<number>;
    /**
     * The dispatch size for workgroups on X, Y, and Z axes.
     * Used directly if `count` is not provided.
     *
     * @type {number|Array<number>}
     */
    dispatchSize: number | Array<number>;
    /**
     * A callback executed when the compute node finishes initialization.
     *
     * @type {?Function}
     */
    onInitFunction: Function | null;
    /**
     * A uniform node holding the dispatch count for bounds checking.
     * Created automatically when `count` is a number.
     *
     * @type {?UniformNode}
     */
    countNode: UniformNode | null;
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
     * Sets the callback to run during initialization.
     *
     * @param {Function} callback - The callback function.
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
