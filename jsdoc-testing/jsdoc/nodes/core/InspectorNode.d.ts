/**
 * Creates an inspector node to wrap around a given node for inspection purposes.
 *
 * @tsl
 * @param {Node} node - The node to inspect.
 * @param {string} [name=''] - Optional name for the inspector node.
 * @param {Function|null} [callback=null] - Optional callback to modify the node during setup.
 * @returns {Node} The inspector node.
 */
export function inspector(node: Node, name?: string, callback?: Function | null): Node;
export default InspectorNode;
import Node from './Node.js';
/**
 * InspectorNode is a wrapper node that allows inspection of node values during rendering.
 * It can be used to debug or analyze node outputs in the rendering pipeline.
 *
 * @augments Node
 */
declare class InspectorNode extends Node {
    /**
     * Creates an InspectorNode.
     *
     * @param {Node} node - The node to inspect.
     * @param {string} [name=''] - Optional name for the inspector node.
     * @param {Function|null} [callback=null] - Optional callback to modify the node during setup.
     */
    constructor(node: Node, name?: string, callback?: Function | null);
    node: Node;
    callback: Function | null;
    isInspectorNode: boolean;
    /**
     * Returns the name of the inspector node.
     *
     * @returns {string}
     */
    getName(): string;
    /**
     * Updates the inspector node, allowing inspection of the wrapped node.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(frame: NodeFrame): void;
    /**
     * Sets up the inspector node.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @returns {Node} The setup node.
     */
    setup(builder: NodeBuilder): Node;
}
