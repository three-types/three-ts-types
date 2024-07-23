import { CoordinateSystem } from "../constants.js";
import { Euler } from "./Euler.js";
import { Matrix3 } from "./Matrix3.js";
import { Quaternion } from "./Quaternion.js";
import { Vector3 } from "./Vector3.js";

export type Matrix4Tuple = [
    n11: number,
    n12: number,
    n13: number,
    n14: number,
    n21: number,
    n22: number,
    n23: number,
    n24: number,
    n31: number,
    n32: number,
    n33: number,
    n34: number,
    n41: number,
    n42: number,
    n43: number,
    n44: number,
];

/**
 * A 4x4 Matrix.
 *
 * @example
 * // Simple rig for rotating around 3 axes
 * const m = new THREE.Matrix4();
 * const m1 = new THREE.Matrix4();
 * const m2 = new THREE.Matrix4();
 * const m3 = new THREE.Matrix4();
 * const alpha = 0;
 * const beta = Math.PI;
 * const gamma = Math.PI/2;
 * m1.makeRotationX( alpha );
 * m2.makeRotationY( beta );
 * m3.makeRotationZ( gamma );
 * m.multiplyMatrices( m1, m2 );
 * m.multiply( m3 );
 */
export class Matrix4 {
    readonly isMatrix4: true;

    /**
     * Array with matrix values.
     * @default [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
     */
    elements: Matrix4Tuple;

    /**
     * Creates an identity matrix.
     */
    constructor();
    /**
     * Creates a 4x4 matrix with the given arguments in row-major order.
     */
    constructor(
        n11: number,
        n12: number,
        n13: number,
        n14: number,
        n21: number,
        n22: number,
        n23: number,
        n24: number,
        n31: number,
        n32: number,
        n33: number,
        n34: number,
        n41: number,
        n42: number,
        n43: number,
        n44: number,
    );

    /**
     * Sets all fields of this matrix.
     */
    set(
        n11: number,
        n12: number,
        n13: number,
        n14: number,
        n21: number,
        n22: number,
        n23: number,
        n24: number,
        n31: number,
        n32: number,
        n33: number,
        n34: number,
        n41: number,
        n42: number,
        n43: number,
        n44: number,
    ): this;

    /**
     * Resets this matrix to identity.
     */
    identity(): this;

    clone(): Matrix4;

    copy(m: Matrix4): this;

    copyPosition(m: Matrix4): this;

    /**
     * Set the upper 3x3 elements of this matrix to the values of the Matrix3 m.
     */
    setFromMatrix3(m: Matrix3): this;

    extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this;

    makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this;

    /**
     * Copies the rotation component of the supplied matrix m into this matrix rotation component.
     */
    extractRotation(m: Matrix4): this;

    makeRotationFromEuler(euler: Euler): this;

    makeRotationFromQuaternion(q: Quaternion): this;

    /**
     * Constructs a rotation matrix, looking from eye towards center with defined up vector.
     */
    lookAt(eye: Vector3, target: Vector3, up: Vector3): this;

    /**
     * Multiplies this matrix by m.
     */
    multiply(m: Matrix4): this;

    premultiply(m: Matrix4): this;

    /**
     * Sets this matrix to a x b.
     */
    multiplyMatrices(a: Matrix4, b: Matrix4): this;

    /**
     * Multiplies this matrix by s.
     */
    multiplyScalar(s: number): this;

    /**
     * Computes determinant of this matrix.
     * Based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
     */
    determinant(): number;

    /**
     * Transposes this matrix.
     */
    transpose(): this;

    /**
     * Sets the position component for this matrix from vector v.
     */
    setPosition(v: Vector3): this;
    setPosition(x: number, y: number, z: number): this;

    /**
     * Inverts this matrix.
     */
    invert(): this;

    /**
     * Multiplies the columns of this matrix by vector v.
     */
    scale(v: Vector3): this;

    getMaxScaleOnAxis(): number;

    /**
     * Sets this matrix as translation transform.
     */
    makeTranslation(v: Vector3): this;
    makeTranslation(x: number, y: number, z: number): this;

    /**
     * Sets this matrix as rotation transform around x axis by theta radians.
     *
     * @param theta Rotation angle in radians.
     */
    makeRotationX(theta: number): this;

    /**
     * Sets this matrix as rotation transform around y axis by theta radians.
     *
     * @param theta Rotation angle in radians.
     */
    makeRotationY(theta: number): this;

    /**
     * Sets this matrix as rotation transform around z axis by theta radians.
     *
     * @param theta Rotation angle in radians.
     */
    makeRotationZ(theta: number): this;

    /**
     * Sets this matrix as rotation transform around axis by angle radians.
     * Based on http://www.gamedev.net/reference/articles/article1199.asp.
     *
     * @param axis Rotation axis.
     * @param angle Rotation angle in radians.
     */
    makeRotationAxis(axis: Vector3, angle: number): this;

    /**
     * Sets this matrix as scale transform.
     */
    makeScale(x: number, y: number, z: number): this;

    /**
     * Sets this matrix as shear transform.
     */
    makeShear(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): this;

    /**
     * Sets this matrix to the transformation composed of translation, rotation and scale.
     */
    compose(position: Vector3, quaternion: Quaternion, scale: Vector3): this;

    /**
     * Decomposes this matrix into it's position, quaternion and scale components.
     */
    decompose(position: Vector3, quaternion: Quaternion, scale: Vector3): this;

    /**
     * Creates a perspective projection matrix.
     */
    makePerspective(
        left: number,
        right: number,
        top: number,
        bottom: number,
        near: number,
        far: number,
        coordinateSystem?: CoordinateSystem,
    ): this;

    /**
     * Creates an orthographic projection matrix.
     */
    makeOrthographic(
        left: number,
        right: number,
        top: number,
        bottom: number,
        near: number,
        far: number,
        coordinateSystem?: CoordinateSystem,
    ): this;

    equals(matrix: Matrix4): boolean;

    /**
     * Sets the values of this matrix from the provided array or array-like.
     * @param array the source array or array-like.
     * @param offset (optional) offset into the array-like. Default is 0.
     */
    fromArray(array: number[] | ArrayLike<number>, offset?: number): this;

    /**
     * Returns an array with the values of this matrix, or copies them into the provided array.
     * @param array (optional) array to store the matrix to. If this is not provided, a new array will be created.
     * @param offset (optional) optional offset into the array.
     * @return The created or provided array.
     */
    toArray(array?: number[], offset?: number): number[];
    toArray(array?: Matrix4Tuple, offset?: 0): Matrix4Tuple;

    /**
     * Copies he values of this matrix into the provided array-like.
     * @param array array-like to store the matrix to.
     * @param offset (optional) optional offset into the array-like.
     * @return The provided array-like.
     */
    toArray(array?: ArrayLike<number>, offset?: number): ArrayLike<number>;
}
