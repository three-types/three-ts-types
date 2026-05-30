export default WorkgroupInfoNode;
export function workgroupArray(type: string, count?: number): WorkgroupInfoNode;
/**
 * A node allowing the user to create a 'workgroup' scoped buffer within the
 * context of a compute shader. Typically, workgroup scoped buffers are
 * created to hold data that is transferred from a global storage scope into
 * a local workgroup scope. For invocations within a workgroup, data
 * access speeds on 'workgroup' scoped buffers can be significantly faster
 * than similar access operations on globally accessible storage buffers.
 *
 * This node can only be used with a WebGPU backend.
 *
 * @augments Node
 */
declare class WorkgroupInfoNode extends Node {
    /**
     * Constructs a new buffer scoped to type scope.
     *
     * @param {string} scope - TODO.
     * @param {string} bufferType - The data type of a 'workgroup' scoped buffer element.
     * @param {number} [bufferCount=0] - The number of elements in the buffer.
     */
    constructor(scope: string, bufferType: string, bufferCount?: number);
    /**
     * The buffer type.
     *
     * @type {string}
     */
    bufferType: string;
    /**
     * The buffer count.
     *
     * @type {number}
     * @default 0
     */
    bufferCount: number;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWorkgroupInfoNode: boolean;
    /**
     * The data type of the array buffer.
     *
     * @type {string}
     */
    elementType: string;
    /**
     * TODO.
     *
     * @type {string}
     */
    scope: string;
    /**
     * Sets the name of this node.
     *
     * @param {string} name - The name to set.
     * @return {WorkgroupInfoNode} A reference to this node.
     */
    setName(name: string): WorkgroupInfoNode;
    /**
     * Sets the name/label of this node.
     *
     * @deprecated
     * @param {string} name - The name to set.
     * @return {WorkgroupInfoNode} A reference to this node.
     */
    label(name: string): WorkgroupInfoNode;
    /**
     * Sets the scope of this node.
     *
     * @param {string} scope - The scope to set.
     * @return {WorkgroupInfoNode} A reference to this node.
     */
    setScope(scope: string): WorkgroupInfoNode;
    /**
     * The data type of the array buffer.
     *
     * @return {string} The element type.
     */
    getElementType(): string;
    /**
     * Overwrites the default implementation since the input type
     * is inferred from the scope.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(): string;
    /**
     * This method can be used to access elements via an index node.
     *
     * @param {IndexNode} indexNode - indexNode.
     * @return {WorkgroupInfoElementNode} A reference to an element.
     */
    element(indexNode: IndexNode): WorkgroupInfoElementNode;
    generate(builder: any): any;
}
import Node from '../core/Node.js';
/**
 * Represents an element of a 'workgroup' scoped buffer.
 *
 * @augments ArrayElementNode
 */
declare class WorkgroupInfoElementNode extends ArrayElementNode {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWorkgroupInfoElementNode: boolean;
    generate(builder: any, output: any): any;
}
import ArrayElementNode from '../utils/ArrayElementNode.js';
