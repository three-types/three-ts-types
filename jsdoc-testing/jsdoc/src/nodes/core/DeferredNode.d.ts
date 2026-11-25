/**
 * Adds a method to all nodes that is deferred to the node they resolve to during the build.
 * Nodes that implement the method are not affected.
 *
 * @param {string} name - The method name.
 */
export function addDeferredMethod(name: string): void;
export default DeferredNode;
/**
 * Calls a method of the node that the given node resolves to during the build.
 * This makes it possible to call methods of a node that is only known in the build,
 * e.g. `getMap().sample( uv() )` for a TSL function that returns a texture node.
 *
 * @augments Node
 */
declare class DeferredNode extends Node {
    /**
     * Constructs a new deferred node.
     *
     * @param {Node} node - The node whose resolved node receives the call.
     * @param {string} name - The method name.
     * @param {Array<any>} params - The method parameters.
     */
    constructor(node: Node, name: string, params: Array<any>);
    /**
     * The node whose resolved node receives the call.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The method parameters.
     *
     * @type {Array<any>}
     */
    params: Array<any>;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isDeferredNode: boolean;
    generateNodeType(builder: any, output?: null): string;
    getElementType(builder: any): string;
    getMemberType(builder: any, name: any): string;
    /**
     * Returns the result of the call. It can be requested before the setup of this node,
     * e.g. by a varying that needs the type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node} The result of the call.
     */
    getOutputNode(builder: NodeBuilder): Node;
    setup(builder: any): Node;
}
import Node from './Node.js';
