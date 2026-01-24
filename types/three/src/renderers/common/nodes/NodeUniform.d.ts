import { Color } from "../../../math/Color.js";
import { Matrix2 } from "../../../math/Matrix2.js";
import { Matrix3 } from "../../../math/Matrix3.js";
import { Matrix4 } from "../../../math/Matrix4.js";
import { Vector2 } from "../../../math/Vector2.js";
import { Vector3 } from "../../../math/Vector3.js";
import { Vector4 } from "../../../math/Vector4.js";
import NodeUniform from "../../../nodes/core/NodeUniform.js";
import {
    ColorUniform,
    Matrix2Uniform,
    Matrix3Uniform,
    Matrix4Uniform,
    NumberUniform,
    Vector2Uniform,
    Vector3Uniform,
    Vector4Uniform,
} from "../Uniform.js";
/**
 * A special form of Number uniform binding type.
 * It's value is managed by a node object.
 */
declare class NumberNodeUniform<TNodeType> extends NumberUniform {
    nodeUniform: NodeUniform<TNodeType, number>;
    /**
     * Constructs a new node-based Number uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform<TNodeType, number>);
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
    getType(): string | null;
}
/**
 * A special form of Vector2 uniform binding type.
 * It's value is managed by a node object.
 */
declare class Vector2NodeUniform<TNodeType> extends Vector2Uniform {
    nodeUniform: NodeUniform<TNodeType, Vector2>;
    /**
     * Constructs a new node-based Vector2 uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform<TNodeType, Vector2>);
    /**
     * Overwritten to return the value of the node uniform.
     *
     * @return {Vector2} The value.
     */
    getValue(): Vector2;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string | null;
}
/**
 * A special form of Vector3 uniform binding type.
 * It's value is managed by a node object.
 */
declare class Vector3NodeUniform<TNodeType> extends Vector3Uniform {
    nodeUniform: NodeUniform<TNodeType, Vector3>;
    /**
     * Constructs a new node-based Vector3 uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform<TNodeType, Vector3>);
    /**
     * Overwritten to return the value of the node uniform.
     *
     * @return {Vector3} The value.
     */
    getValue(): Vector3;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string | null;
}
/**
 * A special form of Vector4 uniform binding type.
 * It's value is managed by a node object.
 */
declare class Vector4NodeUniform<TNodeType> extends Vector4Uniform {
    nodeUniform: NodeUniform<TNodeType, Vector4>;
    /**
     * Constructs a new node-based Vector4 uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform<TNodeType, Vector4>);
    /**
     * Overwritten to return the value of the node uniform.
     *
     * @return {Vector4} The value.
     */
    getValue(): Vector4;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string | null;
}
/**
 * A special form of Color uniform binding type.
 * It's value is managed by a node object.
 */
declare class ColorNodeUniform<TNodeType> extends ColorUniform {
    nodeUniform: NodeUniform<TNodeType, Color>;
    /**
     * Constructs a new node-based Color uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform<TNodeType, Color>);
    /**
     * Overwritten to return the value of the node uniform.
     *
     * @return {Color} The value.
     */
    getValue(): Color;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string | null;
}
/**
 * A special form of Matrix2 uniform binding type.
 * It's value is managed by a node object.
 */
declare class Matrix2NodeUniform<TNodeType> extends Matrix2Uniform {
    nodeUniform: NodeUniform<TNodeType, Matrix2>;
    /**
     * Constructs a new node-based Matrix2 uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform<TNodeType, Matrix2>);
    /**
     * Overwritten to return the value of the node uniform.
     *
     * @return {Matrix2} The value.
     */
    getValue(): Matrix2;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string | null;
}
/**
 * A special form of Matrix3 uniform binding type.
 * It's value is managed by a node object.
 */
declare class Matrix3NodeUniform<TNodeType> extends Matrix3Uniform {
    nodeUniform: NodeUniform<TNodeType, Matrix3>;
    /**
     * Constructs a new node-based Matrix3 uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform<TNodeType, Matrix3>);
    /**
     * Overwritten to return the value of the node uniform.
     *
     * @return {Matrix3} The value.
     */
    getValue(): Matrix3;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string | null;
}
/**
 * A special form of Matrix4 uniform binding type.
 * It's value is managed by a node object.
 */
declare class Matrix4NodeUniform<TNodeType> extends Matrix4Uniform {
    nodeUniform: NodeUniform<TNodeType, Matrix4>;
    /**
     * Constructs a new node-based Matrix4 uniform.
     *
     * @param {NodeUniform} nodeUniform - The node uniform.
     */
    constructor(nodeUniform: NodeUniform<TNodeType, Matrix4>);
    /**
     * Overwritten to return the value of the node uniform.
     *
     * @return {Matrix4} The value.
     */
    getValue(): Matrix4;
    /**
     * Returns the node uniform data type.
     *
     * @return {string} The data type.
     */
    getType(): string | null;
}
export {
    ColorNodeUniform,
    Matrix2NodeUniform,
    Matrix3NodeUniform,
    Matrix4NodeUniform,
    NumberNodeUniform,
    Vector2NodeUniform,
    Vector3NodeUniform,
    Vector4NodeUniform,
};
export type NodeUniformGPU =
    | NumberNodeUniform<unknown>
    | Vector2NodeUniform<unknown>
    | Vector3NodeUniform<unknown>
    | Vector4NodeUniform<unknown>
    | ColorNodeUniform<unknown>
    | Matrix3NodeUniform<unknown>
    | Matrix4NodeUniform<unknown>;
