export default AtomicFunctionNode;
export function atomicFunc(method: string, pointerNode: Node, valueNode: Node): AtomicFunctionNode;
export function atomicLoad(pointerNode: Node): AtomicFunctionNode;
export function atomicStore(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
export function atomicAdd(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
export function atomicSub(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
export function atomicMax(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
export function atomicMin(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
export function atomicAnd(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
export function atomicOr(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
export function atomicXor(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
/**
 * `AtomicFunctionNode` represents any function that can operate on atomic variable types
 * within a shader. In an atomic function, any modification to an atomic variable will
 * occur as an indivisible step with a defined order relative to other modifications.
 * Accordingly, even if multiple atomic functions are modifying an atomic variable at once
 * atomic operations will not interfere with each other.
 *
 * This node can only be used with a WebGPU backend.
 *
 * @augments Node
 */
declare class AtomicFunctionNode extends Node {
    /**
     * Constructs a new atomic function node.
     *
     * @param {string} method - The signature of the atomic function to construct.
     * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
     * @param {Node} valueNode - The value that mutates the atomic variable.
     */
    constructor(method: string, pointerNode: Node, valueNode: Node);
    /**
     * The signature of the atomic function to construct.
     *
     * @type {string}
     */
    method: string;
    /**
     * An atomic variable or element of an atomic buffer.
     *
     * @type {Node}
     */
    pointerNode: Node;
    /**
     * A value that modifies the atomic variable.
     *
     * @type {Node}
     */
    valueNode: Node;
    /**
     * Overwrites the default implementation to return the type of
     * the pointer node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(builder: NodeBuilder): string;
    generate(builder: any): any;
}
declare namespace AtomicFunctionNode {
    let ATOMIC_LOAD: string;
    let ATOMIC_STORE: string;
    let ATOMIC_ADD: string;
    let ATOMIC_SUB: string;
    let ATOMIC_MAX: string;
    let ATOMIC_MIN: string;
    let ATOMIC_AND: string;
    let ATOMIC_OR: string;
    let ATOMIC_XOR: string;
}
import Node from '../core/Node.js';
