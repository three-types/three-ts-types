export default InputNode;
/**
 * Base class for representing data input nodes.
 *
 * @augments Node
 */
declare class InputNode extends Node {
    /**
     * Constructs a new input node.
     *
     * @param {any} value - The value of this node. This can be any JS primitive, functions, array buffers or even three.js objects (vector, matrices, colors).
     * @param {?string} nodeType - The node type. If no explicit type is defined, the node tries to derive the type from its value.
     */
    constructor(value: any, nodeType?: string | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isInputNode: boolean;
    /**
     * The value of this node. This can be any JS primitive, functions, array buffers or even three.js objects (vector, matrices, colors).
     *
     * @type {any}
     */
    value: any;
    /**
     * The precision of the value in the shader.
     *
     * @type {?('low'|'medium'|'high')}
     * @default null
     */
    precision: ("low" | "medium" | "high") | null;
    getNodeType(): string | null;
    /**
     * Returns the input type of the node which is by default the node type. Derived modules
     * might overwrite this method and use a fixed type or compute one analytically.
     *
     * A typical example for different input and node types are textures. The input type of a
     * normal RGBA texture is `texture` whereas its node type is `vec4`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(builder: NodeBuilder): string;
    /**
     * Sets the precision to the given value. The method can be
     * overwritten in derived classes if the final precision must be computed
     * analytically.
     *
     * @param {('low'|'medium'|'high')} precision - The precision of the input value in the shader.
     * @return {InputNode} A reference to this node.
     */
    setPrecision(precision: ("low" | "medium" | "high")): InputNode;
    serialize(data: any): void;
    deserialize(data: any): void;
    generate(): void;
}
import Node from './Node.js';
