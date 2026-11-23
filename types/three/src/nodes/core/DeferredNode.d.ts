import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";

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
    constructor(node: Node, name: string, params: unknown[]);
    /**
     * The node whose resolved node receives the call.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The method name.
     *
     * @type {string}
     */
    name: string;
    /**
     * The method parameters.
     *
     * @type {Array<any>}
     */
    params: unknown[];
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isDeferredNode: boolean;
    generateNodeType(builder: NodeBuilder, output?: string | null): string;
    getElementType(builder: NodeBuilder): string;
    getMemberType(builder: NodeBuilder, name: string): string;
    /**
     * Returns the result of the call. It can be requested before the setup of this node,
     * e.g. by a varying that needs the type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node} The result of the call.
     */
    getOutputNode(builder: NodeBuilder): Node;
    setup(builder: NodeBuilder): Node;
}

export default DeferredNode;

/**
 * Adds a method to all nodes that is deferred to the node they resolve to during the build.
 * Nodes that implement the method are not affected.
 *
 * @param {string} name - The method name.
 */
export function addDeferredMethod(name: string): void;
