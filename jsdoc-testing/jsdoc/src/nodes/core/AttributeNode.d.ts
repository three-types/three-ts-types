export default AttributeNode;
export function attribute(name: string, nodeType?: string | null): AttributeNode;
/**
 * Base class for representing shader attributes as nodes.
 *
 * @augments Node
 */
declare class AttributeNode extends Node {
    /**
     * Constructs a new attribute node.
     *
     * @param {string} attributeName - The name of the attribute.
     * @param {?string} nodeType - The node type.
     */
    constructor(attributeName: string, nodeType?: string | null);
    _attributeName: string;
    getHash(builder: any): string;
    /**
     * Returns the node which provides the value of this attribute in the current context, if any.
     * The context can provide attributes with a `getAttribute( name, builder )` function, e.g. if the
     * vertices are pulled from a storage buffer or the surface is reconstructed per fragment. The
     * function should return the same node for the same attribute.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {?Node} The node providing the value of the attribute.
     */
    getContextAttribute(builder: NodeBuilder): Node | null;
    generateNodeType(builder: any): string | null;
    /**
     * Sets the attribute name to the given value. The method can be
     * overwritten in derived classes if the final name must be computed
     * analytically.
     *
     * @param {string} attributeName - The name of the attribute.
     * @return {AttributeNode} A reference to this node.
     */
    setAttributeName(attributeName: string): AttributeNode;
    /**
     * Returns the attribute name of this node. The method can be
     * overwritten in derived classes if the final name must be computed
     * analytically.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The attribute name.
     */
    getAttributeName(): string;
    generate(builder: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
import Node from './Node.js';
