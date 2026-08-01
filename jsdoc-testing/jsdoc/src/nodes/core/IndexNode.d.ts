export default IndexNode;
/**
 * TSL object that represents the index of a vertex within a mesh.
 *
 * @tsl
 * @type {IndexNode}
 */
export const vertexIndex: IndexNode;
/**
 * TSL object that represents the index of either a mesh instance or an invocation of a compute shader.
 *
 * @tsl
 * @type {IndexNode}
 */
export const instanceIndex: IndexNode;
/**
 * TSL object that represents the index of the subgroup the current compute invocation belongs to.
 *
 * @tsl
 * @type {IndexNode}
 */
export const subgroupIndex: IndexNode;
/**
 * TSL object that represents the index of a compute invocation within the scope of a subgroup.
 *
 * @tsl
 * @type {IndexNode}
 */
export const invocationSubgroupIndex: IndexNode;
/**
 * TSL object that represents the index of a compute invocation within the scope of a workgroup load.
 *
 * @tsl
 * @type {IndexNode}
 */
export const invocationLocalIndex: IndexNode;
/**
 * TSL object that represents the index of a draw call.
 *
 * @tsl
 * @type {IndexNode}
 */
export const drawIndex: IndexNode;
/**
 * This class represents shader indices of different types. The following predefined node
 * objects cover frequent use cases:
 *
 * - `vertexIndex`: The index of a vertex within a mesh.
 * - `instanceIndex`: The index of either a mesh instance or an invocation of a compute shader.
 * - `drawIndex`: The index of a draw call.
 * - `invocationLocalIndex`: The index of a compute invocation within the scope of a workgroup load.
 * - `invocationSubgroupIndex`: The index of a compute invocation within the scope of a subgroup.
 * - `subgroupIndex`: The index of a compute invocation's subgroup within its workgroup.
 *
 * @augments Node
 */
declare class IndexNode extends Node {
    /**
     * Constructs a new index node.
     *
     * @param {('vertex'|'instance'|'subgroup'|'invocationLocal'|'invocationGlobal'|'invocationSubgroup'|'draw')} scope - The scope of the index node.
     */
    constructor(scope: ("vertex" | "instance" | "subgroup" | "invocationLocal" | "invocationGlobal" | "invocationSubgroup" | "draw"));
    /**
     * The scope of the index node.
     *
     * @type {string}
     */
    scope: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isIndexNode: boolean;
    generate(builder: any): any;
}
declare namespace IndexNode {
    let VERTEX: string;
    let INSTANCE: string;
    let SUBGROUP: string;
    let INVOCATION_LOCAL: string;
    let INVOCATION_SUBGROUP: string;
    let DRAW: string;
}
import Node from './Node.js';
