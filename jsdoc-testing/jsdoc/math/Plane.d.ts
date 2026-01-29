/**
 * A two dimensional surface that extends infinitely in 3D space, represented
 * in [Hessian normal form](http://mathworld.wolfram.com/HessianNormalForm.html)
 * by a unit length normal vector and a constant.
 */
export class Plane {
    /**
     * Constructs a new plane.
     *
     * @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane.
     * @param {number} [constant=0] - The signed distance from the origin to the plane.
     */
    constructor(normal?: Vector3, constant?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPlane: boolean;
    /**
     * A unit length vector defining the normal of the plane.
     *
     * @type {Vector3}
     */
    normal: Vector3;
    /**
     * The signed distance from the origin to the plane.
     *
     * @type {number}
     * @default 0
     */
    constant: number;
    /**
     * Sets the plane components by copying the given values.
     *
     * @param {Vector3} normal - The normal.
     * @param {number} constant - The constant.
     * @return {Plane} A reference to this plane.
     */
    set(normal: Vector3, constant: number): Plane;
    /**
     * Sets the plane components by defining `x`, `y`, `z` as the
     * plane normal and `w` as the constant.
     *
     * @param {number} x - The value for the normal's x component.
     * @param {number} y - The value for the normal's y component.
     * @param {number} z - The value for the normal's z component.
     * @param {number} w - The constant value.
     * @return {Plane} A reference to this plane.
     */
    setComponents(x: number, y: number, z: number, w: number): Plane;
    /**
     * Sets the plane from the given normal and coplanar point (that is a point
     * that lies onto the plane).
     *
     * @param {Vector3} normal - The normal.
     * @param {Vector3} point - A coplanar point.
     * @return {Plane} A reference to this plane.
     */
    setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3): Plane;
    /**
     * Sets the plane from three coplanar points. The winding order is
     * assumed to be counter-clockwise, and determines the direction of
     * the plane normal.
     *
     * @param {Vector3} a - The first coplanar point.
     * @param {Vector3} b - The second coplanar point.
     * @param {Vector3} c - The third coplanar point.
     * @return {Plane} A reference to this plane.
     */
    setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3): Plane;
    /**
     * Copies the values of the given plane to this instance.
     *
     * @param {Plane} plane - The plane to copy.
     * @return {Plane} A reference to this plane.
     */
    copy(plane: Plane): Plane;
    /**
     * Normalizes the plane normal and adjusts the constant accordingly.
     *
     * @return {Plane} A reference to this plane.
     */
    normalize(): Plane;
    /**
     * Negates both the plane normal and the constant.
     *
     * @return {Plane} A reference to this plane.
     */
    negate(): Plane;
    /**
     * Returns the signed distance from the given point to this plane.
     *
     * @param {Vector3} point - The point to compute the distance for.
     * @return {number} The signed distance.
     */
    distanceToPoint(point: Vector3): number;
    /**
     * Returns the signed distance from the given sphere to this plane.
     *
     * @param {Sphere} sphere - The sphere to compute the distance for.
     * @return {number} The signed distance.
     */
    distanceToSphere(sphere: Sphere): number;
    /**
     * Projects a the given point onto the plane.
     *
     * @param {Vector3} point - The point to project.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The projected point on the plane.
     */
    projectPoint(point: Vector3, target: Vector3): Vector3;
    /**
     * Returns the intersection point of the passed line and the plane. Returns
     * `null` if the line does not intersect. Returns the line's starting point if
     * the line is coplanar with the plane.
     *
     * @param {Line3} line - The line to compute the intersection for.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {?Vector3} The intersection point.
     */
    intersectLine(line: Line3, target: Vector3): Vector3 | null;
    /**
     * Returns `true` if the given line segment intersects with (passes through) the plane.
     *
     * @param {Line3} line - The line to test.
     * @return {boolean} Whether the given line segment intersects with the plane or not.
     */
    intersectsLine(line: Line3): boolean;
    /**
     * Returns `true` if the given bounding box intersects with the plane.
     *
     * @param {Box3} box - The bounding box to test.
     * @return {boolean} Whether the given bounding box intersects with the plane or not.
     */
    intersectsBox(box: Box3): boolean;
    /**
     * Returns `true` if the given bounding sphere intersects with the plane.
     *
     * @param {Sphere} sphere - The bounding sphere to test.
     * @return {boolean} Whether the given bounding sphere intersects with the plane or not.
     */
    intersectsSphere(sphere: Sphere): boolean;
    /**
     * Returns a coplanar vector to the plane, by calculating the
     * projection of the normal at the origin onto the plane.
     *
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The coplanar point.
     */
    coplanarPoint(target: Vector3): Vector3;
    /**
     * Apply a 4x4 matrix to the plane. The matrix must be an affine, homogeneous transform.
     *
     * The optional normal matrix can be pre-computed like so:
     * ```js
     * const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
     * ```
     *
     * @param {Matrix4} matrix - The transformation matrix.
     * @param {Matrix4} [optionalNormalMatrix] - A pre-computed normal matrix.
     * @return {Plane} A reference to this plane.
     */
    applyMatrix4(matrix: Matrix4, optionalNormalMatrix?: Matrix4): Plane;
    /**
     * Translates the plane by the distance defined by the given offset vector.
     * Note that this only affects the plane constant and will not affect the normal vector.
     *
     * @param {Vector3} offset - The offset vector.
     * @return {Plane} A reference to this plane.
     */
    translate(offset: Vector3): Plane;
    /**
     * Returns `true` if this plane is equal with the given one.
     *
     * @param {Plane} plane - The plane to test for equality.
     * @return {boolean} Whether this plane is equal with the given one.
     */
    equals(plane: Plane): boolean;
    /**
     * Returns a new plane with copied values from this instance.
     *
     * @return {Plane} A clone of this instance.
     */
    clone(): Plane;
}
import { Vector3 } from './Vector3.js';
