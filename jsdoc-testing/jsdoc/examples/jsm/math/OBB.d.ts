/**
 * Represents an oriented bounding box (OBB) in 3D space.
 *
 * @three_import import { OBB } from 'three/addons/math/OBB.js';
 */
export class OBB {
    /**
     * Constructs a new OBB.
     *
     * @param {Vector3} [center] - The center of the OBB.
     * @param {Vector3} [halfSize] - Positive halfwidth extents of the OBB along each axis.
     * @param {Matrix3} [rotation] - The rotation of the OBB.
     */
    constructor(center?: Vector3, halfSize?: Vector3, rotation?: Matrix3);
    /**
     * The center of the OBB.
     *
     * @type {Vector3}
     */
    center: Vector3;
    /**
     * Positive halfwidth extents of the OBB along each axis.
     *
     * @type {Vector3}
     */
    halfSize: Vector3;
    /**
     * The rotation of the OBB.
     *
     * @type {Matrix3}
     */
    rotation: Matrix3;
    /**
     * Sets the OBBs components to the given values.
     *
     * @param {Vector3} [center] - The center of the OBB.
     * @param {Vector3} [halfSize] - Positive halfwidth extents of the OBB along each axis.
     * @param {Matrix3} [rotation] - The rotation of the OBB.
     * @return {OBB} A reference to this OBB.
     */
    set(center?: Vector3, halfSize?: Vector3, rotation?: Matrix3): OBB;
    /**
     * Copies the values of the given OBB to this instance.
     *
     * @param {OBB} obb - The OBB to copy.
     * @return {OBB} A reference to this OBB.
     */
    copy(obb: OBB): OBB;
    /**
     * Returns a new OBB with copied values from this instance.
     *
     * @return {OBB} A clone of this instance.
     */
    clone(): OBB;
    /**
     * Returns the size of this OBB.
     *
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The size.
     */
    getSize(target: Vector3): Vector3;
    /**
     * Clamps the given point within the bounds of this OBB.
     *
     * @param {Vector3} point - The point that should be clamped within the bounds of this OBB.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @returns {Vector3} - The clamped point.
     */
    clampPoint(point: Vector3, target: Vector3): Vector3;
    /**
     * Returns `true` if the given point lies within this OBB.
     *
     * @param {Vector3} point - The point to test.
     * @returns {boolean} - Whether the given point lies within this OBB or not.
     */
    containsPoint(point: Vector3): boolean;
    /**
     * Returns `true` if the given AABB intersects this OBB.
     *
     * @param {Box3} box3 - The AABB to test.
     * @returns {boolean} - Whether the given AABB intersects this OBB or not.
     */
    intersectsBox3(box3: Box3): boolean;
    /**
     * Returns `true` if the given bounding sphere intersects this OBB.
     *
     * @param {Sphere} sphere - The bounding sphere to test.
     * @returns {boolean} - Whether the given bounding sphere intersects this OBB or not.
     */
    intersectsSphere(sphere: Sphere): boolean;
    /**
     * Returns `true` if the given OBB intersects this OBB.
     *
     * @param {OBB} obb - The OBB to test.
     * @param {number} [epsilon=Number.EPSILON] - A small value to prevent arithmetic errors.
     * @returns {boolean} - Whether the given OBB intersects this OBB or not.
     */
    intersectsOBB(obb: OBB, epsilon?: number): boolean;
    /**
     * Returns `true` if the given plane intersects this OBB.
     *
     * @param {Plane} plane - The plane to test.
     * @returns {boolean} Whether the given plane intersects this OBB or not.
     */
    intersectsPlane(plane: Plane): boolean;
    /**
     * Performs a ray/OBB intersection test and stores the intersection point
     * in the given 3D vector.
     *
     * @param {Ray} ray - The ray to test.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {?Vector3} The intersection point. If no intersection is detected, `null` is returned.
     */
    intersectRay(ray: Ray, target: Vector3): Vector3 | null;
    /**
     * Returns `true` if the given ray intersects this OBB.
     *
     * @param {Ray} ray - The ray to test.
     * @returns {boolean} Whether the given ray intersects this OBB or not.
     */
    intersectsRay(ray: Ray): boolean;
    /**
     * Defines an OBB based on the given AABB.
     *
     * @param {Box3} box3 - The AABB to setup the OBB from.
     * @return {OBB} A reference of this OBB.
     */
    fromBox3(box3: Box3): OBB;
    /**
     * Returns `true` if the given OBB is equal to this OBB.
     *
     * @param {OBB} obb - The OBB to test.
     * @returns {boolean} Whether the given OBB is equal to this OBB or not.
     */
    equals(obb: OBB): boolean;
    /**
     * Applies the given transformation matrix to this OBB. This method can be
     * used to transform the bounding volume with the world matrix of a 3D object
     * in order to keep both entities in sync.
     *
     * @param {Matrix4} matrix - The matrix to apply.
     * @return {OBB} A reference of this OBB.
     */
    applyMatrix4(matrix: Matrix4): OBB;
}
import { Vector3 } from 'three';
import { Matrix3 } from 'three';
import { Box3 } from 'three';
import { Ray } from 'three';
import { Matrix4 } from 'three';
