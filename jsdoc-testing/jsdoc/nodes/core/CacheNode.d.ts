export default CacheNode;
export function cache(node: Node, parent?: boolean): CacheNode;
export function namespace(node: Object, namespace: string): Object;
/**
 * This node can be used as a cache management component for another node.
 * Caching is in general used by default in {@link NodeBuilder} but this node
 * allows the usage of a shared parent cache during the build process.
 *
 * @augments Node
 */
declare class CacheNode extends Node {
    /**
     * Constructs a new cache node.
     *
     * @param {Node} node - The node that should be cached.
     * @param {boolean} [parent=true] - Whether this node refers to a shared parent cache or not.
     */
    constructor(node: Node, parent?: boolean);
    /**
     * The node that should be cached.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * Whether this node refers to a shared parent cache or not.
     *
     * @type {boolean}
     * @default true
     */
    parent: boolean;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCacheNode: boolean;
    getNodeType(builder: any): string;
    build(builder: any, ...params: any[]): string | Node | null;
}
import Node from './Node.js';
