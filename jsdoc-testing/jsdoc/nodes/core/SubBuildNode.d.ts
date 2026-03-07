export default SubBuildNode;
export function subBuild(node: Node, name: string, type?: string | null): Node;
/**
 * This node is used to build a sub-build in the node system.
 *
 * @augments Node
 * @param {Node} node - The node to be built in the sub-build.
 * @param {string} name - The name of the sub-build.
 * @param {?string} [nodeType=null] - The type of the node, if known.
 */
declare class SubBuildNode extends Node {
    constructor(node: any, name: any, nodeType?: null);
    /**
     * The node to be built in the sub-build.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSubBuildNode: boolean;
    getNodeType(builder: any): string;
    build(builder: any, ...params: any[]): string | Node | null;
}
import Node from './Node.js';
