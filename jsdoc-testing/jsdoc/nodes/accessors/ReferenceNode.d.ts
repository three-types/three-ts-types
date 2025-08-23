export default ReferenceNode;
export function reference(name: string, type: string, object?: Object | null): ReferenceNode;
export function referenceBuffer(name: string, type: string, count: number, object: Object): ReferenceNode;
/**
 * This type of node establishes a reference to a property of another object.
 * In this way, the value of the node is automatically linked to the value of
 * referenced object. Reference nodes internally represent the linked value
 * as a uniform.
 *
 * @augments Node
 */
declare class ReferenceNode extends Node {
    /**
     * Constructs a new reference node.
     *
     * @param {string} property - The name of the property the node refers to.
     * @param {string} uniformType - The uniform type that should be used to represent the property value.
     * @param {?Object} [object=null] - The object the property belongs to.
     * @param {?number} [count=null] - When the linked property is an array-like, this parameter defines its length.
     */
    constructor(property: string, uniformType: string, object?: Object | null, count?: number | null);
    /**
     * The name of the property the node refers to.
     *
     * @type {string}
     */
    property: string;
    /**
     * The uniform type that should be used to represent the property value.
     *
     * @type {string}
     */
    uniformType: string;
    /**
     * The object the property belongs to.
     *
     * @type {?Object}
     * @default null
     */
    object: Object | null;
    /**
     * When the linked property is an array, this parameter defines its length.
     *
     * @type {?number}
     * @default null
     */
    count: number | null;
    /**
     * The property name might have dots so nested properties can be referred.
     * The hierarchy of the names is stored inside this array.
     *
     * @type {Array<string>}
     */
    properties: Array<string>;
    /**
     * Points to the current referred object. This property exists next to {@link ReferenceNode#object}
     * since the final reference might be updated from calling code.
     *
     * @type {?Object}
     * @default null
     */
    reference: Object | null;
    /**
     * The uniform node that holds the value of the reference node.
     *
     * @type {UniformNode}
     * @default null
     */
    node: UniformNode;
    /**
     * The uniform group of the internal uniform.
     *
     * @type {UniformGroupNode}
     * @default null
     */
    group: UniformGroupNode;
    /**
     * An optional label of the internal uniform node.
     *
     * @type {?string}
     * @default null
     */
    name: string | null;
    /**
     * When the referred property is array-like, this method can be used
     * to access elements via an index node.
     *
     * @param {IndexNode} indexNode - indexNode.
     * @return {ReferenceElementNode} A reference to an element.
     */
    element(indexNode: IndexNode): ReferenceElementNode;
    /**
     * Sets the uniform group for this reference node.
     *
     * @param {UniformGroupNode} group - The uniform group to set.
     * @return {ReferenceNode} A reference to this node.
     */
    setGroup(group: UniformGroupNode): ReferenceNode;
    /**
     * Sets the name for the internal uniform.
     *
     * @param {string} name - The label to set.
     * @return {ReferenceNode} A reference to this node.
     */
    setName(name: string): ReferenceNode;
    /**
     * Sets the label for the internal uniform.
     *
     * @deprecated
     * @param {string} name - The label to set.
     * @return {ReferenceNode} A reference to this node.
     */
    label(name: string): ReferenceNode;
    /**
     * Sets the node type which automatically defines the internal
     * uniform type.
     *
     * @param {string} uniformType - The type to set.
     */
    setNodeType(uniformType: string): void;
    /**
     * Returns the property value from the given referred object.
     *
     * @param {Object} [object=this.reference] - The object to retrieve the property value from.
     * @return {any} The value.
     */
    getValueFromReference(object?: Object): any;
    /**
     * Allows to update the reference based on the given state. The state is only
     * evaluated {@link ReferenceNode#object} is not set.
     *
     * @param {(NodeFrame|NodeBuilder)} state - The current state.
     * @return {Object} The updated reference.
     */
    updateReference(state: (NodeFrame | NodeBuilder)): Object;
    /**
     * The output of the reference node is the internal uniform node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {UniformNode} The output node.
     */
    setup(): UniformNode;
    /**
     * Overwritten to update the internal uniform value.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(): void;
    /**
     * Retrieves the value from the referred object property and uses it
     * to updated the internal uniform.
     */
    updateValue(): void;
}
import Node from '../core/Node.js';
/**
 * This class is only relevant if the referenced property is array-like.
 * In this case, `ReferenceElementNode` allows to refer to a specific
 * element inside the data structure via an index.
 *
 * @augments ArrayElementNode
 */
declare class ReferenceElementNode extends ArrayElementNode {
    /**
     * Constructs a new reference element node.
     *
     * @param {?ReferenceNode} referenceNode - The reference node.
     * @param {Node} indexNode - The index node that defines the element access.
     */
    constructor(referenceNode: ReferenceNode | null, indexNode: Node);
    /**
     * Similar to {@link ReferenceNode#reference}, an additional
     * property references to the current node.
     *
     * @type {?ReferenceNode}
     * @default null
     */
    referenceNode: ReferenceNode | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isReferenceElementNode: boolean;
    /**
     * This method is overwritten since the node type is inferred from
     * the uniform type of the reference node.
     *
     * @return {string} The node type.
     */
    getNodeType(): string;
    generate(builder: any): any;
}
import ArrayElementNode from '../utils/ArrayElementNode.js';
