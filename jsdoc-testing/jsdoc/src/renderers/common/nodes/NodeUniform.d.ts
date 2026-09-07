/**
 * A special form of Number uniform binding type.
 * It's value is managed by a node object.
 *
 * @private
 * @augments NumberUniform
 */
export class NumberNodeUniform extends NumberUniform {
    /**
     * Constructs a new node-based Number uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform);
    /**
     * The node uniform.
     *
     * @type {NodeUniform}
     */
    nodeUniform: NodeUniform;
    /**
     * Overwritten to return the value of the node uniform.
     *
     * @return {number} The value.
     */
    getValue(): number;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string;
}
/**
 * A special form of Vector2 uniform binding type.
 * It's value is managed by a node object.
 *
 * @private
 * @augments Vector2Uniform
 */
export class Vector2NodeUniform extends Vector2Uniform {
    /**
     * Constructs a new node-based Vector2 uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform);
    /**
     * The node uniform.
     *
     * @type {NodeUniform}
     */
    nodeUniform: NodeUniform;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string;
}
/**
 * A special form of Vector3 uniform binding type.
 * It's value is managed by a node object.
 *
 * @private
 * @augments Vector3Uniform
 */
export class Vector3NodeUniform extends Vector3Uniform {
    /**
     * Constructs a new node-based Vector3 uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform);
    /**
     * The node uniform.
     *
     * @type {NodeUniform}
     */
    nodeUniform: NodeUniform;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string;
}
/**
 * A special form of Vector4 uniform binding type.
 * It's value is managed by a node object.
 *
 * @private
 * @augments Vector4Uniform
 */
export class Vector4NodeUniform extends Vector4Uniform {
    /**
     * Constructs a new node-based Vector4 uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform);
    /**
     * The node uniform.
     *
     * @type {NodeUniform}
     */
    nodeUniform: NodeUniform;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string;
}
/**
 * A special form of Color uniform binding type.
 * It's value is managed by a node object.
 *
 * @private
 * @augments ColorUniform
 */
export class ColorNodeUniform extends ColorUniform {
    /**
     * Constructs a new node-based Color uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform);
    /**
     * The node uniform.
     *
     * @type {NodeUniform}
     */
    nodeUniform: NodeUniform;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string;
}
/**
 * A special form of Matrix2 uniform binding type.
 * It's value is managed by a node object.
 *
 * @private
 * @augments Matrix2Uniform
 */
export class Matrix2NodeUniform extends Matrix2Uniform {
    /**
     * Constructs a new node-based Matrix2 uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform);
    /**
     * The node uniform.
     *
     * @type {NodeUniform}
     */
    nodeUniform: NodeUniform;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string;
}
/**
 * A special form of Matrix3 uniform binding type.
 * It's value is managed by a node object.
 *
 * @private
 * @augments Matrix3Uniform
 */
export class Matrix3NodeUniform extends Matrix3Uniform {
    /**
     * Constructs a new node-based Matrix3 uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform);
    /**
     * The node uniform.
     *
     * @type {NodeUniform}
     */
    nodeUniform: NodeUniform;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string;
}
/**
 * A special form of Matrix4 uniform binding type.
 * It's value is managed by a node object.
 *
 * @private
 * @augments Matrix4Uniform
 */
export class Matrix4NodeUniform extends Matrix4Uniform {
    /**
     * Constructs a new node-based Matrix4 uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform);
    /**
     * The node uniform.
     *
     * @type {NodeUniform}
     */
    nodeUniform: NodeUniform;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string;
}
import { NumberUniform } from '../Uniform.js';
import { Vector2Uniform } from '../Uniform.js';
import { Vector3Uniform } from '../Uniform.js';
import { Vector4Uniform } from '../Uniform.js';
import { ColorUniform } from '../Uniform.js';
import { Matrix2Uniform } from '../Uniform.js';
import { Matrix3Uniform } from '../Uniform.js';
import { Matrix4Uniform } from '../Uniform.js';
