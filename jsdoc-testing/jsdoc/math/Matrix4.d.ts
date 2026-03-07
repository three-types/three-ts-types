/**
 * Represents a 4x4 matrix.
 *
 * The most common use of a 4x4 matrix in 3D computer graphics is as a transformation matrix.
 * For an introduction to transformation matrices as used in WebGL, check out [this tutorial](https://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices)
 *
 * This allows a 3D vector representing a point in 3D space to undergo
 * transformations such as translation, rotation, shear, scale, reflection,
 * orthogonal or perspective projection and so on, by being multiplied by the
 * matrix. This is known as `applying` the matrix to the vector.
 *
 * A Note on Row-Major and Column-Major Ordering:
 *
 * The constructor and {@link Matrix3#set} method take arguments in
 * [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)
 * order, while internally they are stored in the {@link Matrix3#elements} array in column-major order.
 * This means that calling:
 * ```js
 * const m = new THREE.Matrix4();
 * m.set( 11, 12, 13, 14,
 *        21, 22, 23, 24,
 *        31, 32, 33, 34,
 *        41, 42, 43, 44 );
 * ```
 * will result in the elements array containing:
 * ```js
 * m.elements = [ 11, 21, 31, 41,
 *                12, 22, 32, 42,
 *                13, 23, 33, 43,
 *                14, 24, 34, 44 ];
 * ```
 * and internally all calculations are performed using column-major ordering.
 * However, as the actual ordering makes no difference mathematically and
 * most people are used to thinking about matrices in row-major order, the
 * three.js documentation shows matrices in row-major order. Just bear in
 * mind that if you are reading the source code, you'll have to take the
 * transpose of any matrices outlined here to make sense of the calculations.
 */
export class Matrix4 {
    /**
     * Constructs a new 4x4 matrix. The arguments are supposed to be
     * in row-major order. If no arguments are provided, the constructor
     * initializes the matrix as an identity matrix.
     *
     * @param {number} [n11] - 1-1 matrix element.
     * @param {number} [n12] - 1-2 matrix element.
     * @param {number} [n13] - 1-3 matrix element.
     * @param {number} [n14] - 1-4 matrix element.
     * @param {number} [n21] - 2-1 matrix element.
     * @param {number} [n22] - 2-2 matrix element.
     * @param {number} [n23] - 2-3 matrix element.
     * @param {number} [n24] - 2-4 matrix element.
     * @param {number} [n31] - 3-1 matrix element.
     * @param {number} [n32] - 3-2 matrix element.
     * @param {number} [n33] - 3-3 matrix element.
     * @param {number} [n34] - 3-4 matrix element.
     * @param {number} [n41] - 4-1 matrix element.
     * @param {number} [n42] - 4-2 matrix element.
     * @param {number} [n43] - 4-3 matrix element.
     * @param {number} [n44] - 4-4 matrix element.
     */
    constructor(n11?: number, n12?: number, n13?: number, n14?: number, n21?: number, n22?: number, n23?: number, n24?: number, n31?: number, n32?: number, n33?: number, n34?: number, n41?: number, n42?: number, n43?: number, n44?: number);
    /**
     * A column-major list of matrix values.
     *
     * @type {Array<number>}
     */
    elements: Array<number>;
    /**
     * Sets the elements of the matrix.The arguments are supposed to be
     * in row-major order.
     *
     * @param {number} [n11] - 1-1 matrix element.
     * @param {number} [n12] - 1-2 matrix element.
     * @param {number} [n13] - 1-3 matrix element.
     * @param {number} [n14] - 1-4 matrix element.
     * @param {number} [n21] - 2-1 matrix element.
     * @param {number} [n22] - 2-2 matrix element.
     * @param {number} [n23] - 2-3 matrix element.
     * @param {number} [n24] - 2-4 matrix element.
     * @param {number} [n31] - 3-1 matrix element.
     * @param {number} [n32] - 3-2 matrix element.
     * @param {number} [n33] - 3-3 matrix element.
     * @param {number} [n34] - 3-4 matrix element.
     * @param {number} [n41] - 4-1 matrix element.
     * @param {number} [n42] - 4-2 matrix element.
     * @param {number} [n43] - 4-3 matrix element.
     * @param {number} [n44] - 4-4 matrix element.
     * @return {Matrix4} A reference to this matrix.
     */
    set(n11?: number, n12?: number, n13?: number, n14?: number, n21?: number, n22?: number, n23?: number, n24?: number, n31?: number, n32?: number, n33?: number, n34?: number, n41?: number, n42?: number, n43?: number, n44?: number): Matrix4;
    /**
     * Sets this matrix to the 4x4 identity matrix.
     *
     * @return {Matrix4} A reference to this matrix.
     */
    identity(): Matrix4;
    /**
     * Returns a matrix with copied values from this instance.
     *
     * @return {Matrix4} A clone of this instance.
     */
    clone(): Matrix4;
    /**
     * Copies the values of the given matrix to this instance.
     *
     * @param {Matrix4} m - The matrix to copy.
     * @return {Matrix4} A reference to this matrix.
     */
    copy(m: Matrix4): Matrix4;
    /**
     * Copies the translation component of the given matrix
     * into this matrix's translation component.
     *
     * @param {Matrix4} m - The matrix to copy the translation component.
     * @return {Matrix4} A reference to this matrix.
     */
    copyPosition(m: Matrix4): Matrix4;
    /**
     * Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
     *
     * @param {Matrix3} m - The 3x3 matrix.
     * @return {Matrix4} A reference to this matrix.
     */
    setFromMatrix3(m: Matrix3): Matrix4;
    /**
     * Extracts the basis of this matrix into the three axis vectors provided.
     *
     * @param {Vector3} xAxis - The basis's x axis.
     * @param {Vector3} yAxis - The basis's y axis.
     * @param {Vector3} zAxis - The basis's z axis.
     * @return {Matrix4} A reference to this matrix.
     */
    extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): Matrix4;
    /**
     * Sets the given basis vectors to this matrix.
     *
     * @param {Vector3} xAxis - The basis's x axis.
     * @param {Vector3} yAxis - The basis's y axis.
     * @param {Vector3} zAxis - The basis's z axis.
     * @return {Matrix4} A reference to this matrix.
     */
    makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): Matrix4;
    /**
     * Extracts the rotation component of the given matrix
     * into this matrix's rotation component.
     *
     * Note: This method does not support reflection matrices.
     *
     * @param {Matrix4} m - The matrix.
     * @return {Matrix4} A reference to this matrix.
     */
    extractRotation(m: Matrix4): Matrix4;
    /**
     * Sets the rotation component (the upper left 3x3 matrix) of this matrix to
     * the rotation specified by the given Euler angles. The rest of
     * the matrix is set to the identity. Depending on the {@link Euler#order},
     * there are six possible outcomes. See [this page](https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix)
     * for a complete list.
     *
     * @param {Euler} euler - The Euler angles.
     * @return {Matrix4} A reference to this matrix.
     */
    makeRotationFromEuler(euler: Euler): Matrix4;
    /**
     * Sets the rotation component of this matrix to the rotation specified by
     * the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
     * The rest of the matrix is set to the identity.
     *
     * @param {Quaternion} q - The Quaternion.
     * @return {Matrix4} A reference to this matrix.
     */
    makeRotationFromQuaternion(q: Quaternion): Matrix4;
    /**
     * Sets the rotation component of the transformation matrix, looking from `eye` towards
     * `target`, and oriented by the up-direction.
     *
     * @param {Vector3} eye - The eye vector.
     * @param {Vector3} target - The target vector.
     * @param {Vector3} up - The up vector.
     * @return {Matrix4} A reference to this matrix.
     */
    lookAt(eye: Vector3, target: Vector3, up: Vector3): Matrix4;
    /**
     * Post-multiplies this matrix by the given 4x4 matrix.
     *
     * @param {Matrix4} m - The matrix to multiply with.
     * @return {Matrix4} A reference to this matrix.
     */
    multiply(m: Matrix4): Matrix4;
    /**
     * Pre-multiplies this matrix by the given 4x4 matrix.
     *
     * @param {Matrix4} m - The matrix to multiply with.
     * @return {Matrix4} A reference to this matrix.
     */
    premultiply(m: Matrix4): Matrix4;
    /**
     * Multiples the given 4x4 matrices and stores the result
     * in this matrix.
     *
     * @param {Matrix4} a - The first matrix.
     * @param {Matrix4} b - The second matrix.
     * @return {Matrix4} A reference to this matrix.
     */
    multiplyMatrices(a: Matrix4, b: Matrix4): Matrix4;
    /**
     * Multiplies every component of the matrix by the given scalar.
     *
     * @param {number} s - The scalar.
     * @return {Matrix4} A reference to this matrix.
     */
    multiplyScalar(s: number): Matrix4;
    /**
     * Computes and returns the determinant of this matrix.
     *
     * Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html).
     *
     * @return {number} The determinant.
     */
    determinant(): number;
    /**
     * Transposes this matrix in place.
     *
     * @return {Matrix4} A reference to this matrix.
     */
    transpose(): Matrix4;
    /**
     * Sets the position component for this matrix from the given vector,
     * without affecting the rest of the matrix.
     *
     * @param {number|Vector3} x - The x component of the vector or alternatively the vector object.
     * @param {number} y - The y component of the vector.
     * @param {number} z - The z component of the vector.
     * @return {Matrix4} A reference to this matrix.
     */
    setPosition(x: number | Vector3, y: number, z: number): Matrix4;
    /**
     * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
     * You can not invert with a determinant of zero. If you attempt this, the method produces
     * a zero matrix instead.
     *
     * @return {Matrix4} A reference to this matrix.
     */
    invert(): Matrix4;
    /**
     * Multiplies the columns of this matrix by the given vector.
     *
     * @param {Vector3} v - The scale vector.
     * @return {Matrix4} A reference to this matrix.
     */
    scale(v: Vector3): Matrix4;
    /**
     * Gets the maximum scale value of the three axes.
     *
     * @return {number} The maximum scale.
     */
    getMaxScaleOnAxis(): number;
    /**
     * Sets this matrix as a translation transform from the given vector.
     *
     * @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
     * @param {number} y - The amount to translate in the Y axis.
     * @param {number} z - The amount to translate in the z axis.
     * @return {Matrix4} A reference to this matrix.
     */
    makeTranslation(x: number | Vector3, y: number, z: number): Matrix4;
    /**
     * Sets this matrix as a rotational transformation around the X axis by
     * the given angle.
     *
     * @param {number} theta - The rotation in radians.
     * @return {Matrix4} A reference to this matrix.
     */
    makeRotationX(theta: number): Matrix4;
    /**
     * Sets this matrix as a rotational transformation around the Y axis by
     * the given angle.
     *
     * @param {number} theta - The rotation in radians.
     * @return {Matrix4} A reference to this matrix.
     */
    makeRotationY(theta: number): Matrix4;
    /**
     * Sets this matrix as a rotational transformation around the Z axis by
     * the given angle.
     *
     * @param {number} theta - The rotation in radians.
     * @return {Matrix4} A reference to this matrix.
     */
    makeRotationZ(theta: number): Matrix4;
    /**
     * Sets this matrix as a rotational transformation around the given axis by
     * the given angle.
     *
     * This is a somewhat controversial but mathematically sound alternative to
     * rotating via Quaternions. See the discussion [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199).
     *
     * @param {Vector3} axis - The normalized rotation axis.
     * @param {number} angle - The rotation in radians.
     * @return {Matrix4} A reference to this matrix.
     */
    makeRotationAxis(axis: Vector3, angle: number): Matrix4;
    /**
     * Sets this matrix as a scale transformation.
     *
     * @param {number} x - The amount to scale in the X axis.
     * @param {number} y - The amount to scale in the Y axis.
     * @param {number} z - The amount to scale in the Z axis.
     * @return {Matrix4} A reference to this matrix.
     */
    makeScale(x: number, y: number, z: number): Matrix4;
    /**
     * Sets this matrix as a shear transformation.
     *
     * @param {number} xy - The amount to shear X by Y.
     * @param {number} xz - The amount to shear X by Z.
     * @param {number} yx - The amount to shear Y by X.
     * @param {number} yz - The amount to shear Y by Z.
     * @param {number} zx - The amount to shear Z by X.
     * @param {number} zy - The amount to shear Z by Y.
     * @return {Matrix4} A reference to this matrix.
     */
    makeShear(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): Matrix4;
    /**
     * Sets this matrix to the transformation composed of the given position,
     * rotation (Quaternion) and scale.
     *
     * @param {Vector3} position - The position vector.
     * @param {Quaternion} quaternion - The rotation as a Quaternion.
     * @param {Vector3} scale - The scale vector.
     * @return {Matrix4} A reference to this matrix.
     */
    compose(position: Vector3, quaternion: Quaternion, scale: Vector3): Matrix4;
    /**
     * Decomposes this matrix into its position, rotation and scale components
     * and provides the result in the given objects.
     *
     * Note: Not all matrices are decomposable in this way. For example, if an
     * object has a non-uniformly scaled parent, then the object's world matrix
     * may not be decomposable, and this method may not be appropriate.
     *
     * @param {Vector3} position - The position vector.
     * @param {Quaternion} quaternion - The rotation as a Quaternion.
     * @param {Vector3} scale - The scale vector.
     * @return {Matrix4} A reference to this matrix.
     */
    decompose(position: Vector3, quaternion: Quaternion, scale: Vector3): Matrix4;
    /**
     * Creates a perspective projection matrix. This is used internally by
     * {@link PerspectiveCamera#updateProjectionMatrix}.

     * @param {number} left - Left boundary of the viewing frustum at the near plane.
     * @param {number} right - Right boundary of the viewing frustum at the near plane.
     * @param {number} top - Top boundary of the viewing frustum at the near plane.
     * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
     * @param {number} near - The distance from the camera to the near plane.
     * @param {number} far - The distance from the camera to the far plane.
     * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
     * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
     * @return {Matrix4} A reference to this matrix.
     */
    makePerspective(left: number, right: number, top: number, bottom: number, near: number, far: number, coordinateSystem?: (number | number), reversedDepth?: boolean): Matrix4;
    /**
     * Creates a orthographic projection matrix. This is used internally by
     * {@link OrthographicCamera#updateProjectionMatrix}.

     * @param {number} left - Left boundary of the viewing frustum at the near plane.
     * @param {number} right - Right boundary of the viewing frustum at the near plane.
     * @param {number} top - Top boundary of the viewing frustum at the near plane.
     * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
     * @param {number} near - The distance from the camera to the near plane.
     * @param {number} far - The distance from the camera to the far plane.
     * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
     * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
     * @return {Matrix4} A reference to this matrix.
     */
    makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number, coordinateSystem?: (number | number), reversedDepth?: boolean): Matrix4;
    /**
     * Returns `true` if this matrix is equal with the given one.
     *
     * @param {Matrix4} matrix - The matrix to test for equality.
     * @return {boolean} Whether this matrix is equal with the given one.
     */
    equals(matrix: Matrix4): boolean;
    /**
     * Sets the elements of the matrix from the given array.
     *
     * @param {Array<number>} array - The matrix elements in column-major order.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Matrix4} A reference to this matrix.
     */
    fromArray(array: Array<number>, offset?: number): Matrix4;
    /**
     * Writes the elements of this matrix to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The matrix elements in column-major order.
     */
    toArray(array?: Array<number>, offset?: number): Array<number>;
}
import { Vector3 } from './Vector3.js';
