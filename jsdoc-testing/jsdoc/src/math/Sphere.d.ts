/**
 * An analytical 3D sphere defined by a center and radius. This class is mainly
 * used as a Bounding Sphere for 3D objects.
 */
export class Sphere {
    /**
     * Constructs a new sphere.
     *
     * @param {Vector3} [center=(0,0,0)] - The center of the sphere
     * @param {number} [radius=-1] - The radius of the sphere.
     */
    constructor(center?: Vector3, radius?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSphere: boolean;
    /**
     * The center of the sphere
     *
     * @type {Vector3}
     */
    center: Vector3;
    /**
     * The radius of the sphere.
     *
     * @type {number}
     */
    radius: number;
    /**
     * Sets the sphere's components by copying the given values.
     *
     * @param {Vector3} center - The center.
     * @param {number} radius - The radius.
     * @return {Sphere} A reference to this sphere.
     */
    set(center: Vector3, radius: number): Sphere;
    /**
     * Computes the minimum bounding sphere for list of points.
     * If the optional center point is given, it is used as the sphere's
     * center. Otherwise, the center of the axis-aligned bounding box
     * encompassing the points is calculated.
     *
     * @param {Array<Vector3>} points - A list of points in 3D space.
     * @param {Vector3} [optionalCenter] - The center of the sphere.
     * @return {Sphere} A reference to this sphere.
     */
    setFromPoints(points: Array<Vector3>, optionalCenter?: Vector3): Sphere;
    /**
     * Copies the values of the given sphere to this instance.
     *
     * @param {Sphere} sphere - The sphere to copy.
     * @return {Sphere} A reference to this sphere.
     */
    copy(sphere: Sphere): Sphere;
    /**
     * Returns `true` if the sphere is empty (the radius set to a negative number).
     *
     * Spheres with a radius of `0` contain only their center point and are not
     * considered to be empty.
     *
     * @return {boolean} Whether this sphere is empty or not.
     */
    isEmpty(): boolean;
    /**
     * Makes this sphere empty which means in encloses a zero space in 3D.
     *
     * @return {Sphere} A reference to this sphere.
     */
    makeEmpty(): Sphere;
    /**
     * Returns `true` if this sphere contains the given point inclusive of
     * the surface of the sphere.
     *
     * @param {Vector3} point - The point to check.
     * @return {boolean} Whether this sphere contains the given point or not.
     */
    containsPoint(point: Vector3): boolean;
    /**
     * Returns the closest distance from the boundary of the sphere to the
     * given point. If the sphere contains the point, the distance will
     * be negative.
     *
     * @param {Vector3} point - The point to compute the distance to.
     * @return {number} The distance to the point.
     */
    distanceToPoint(point: Vector3): number;
    /**
     * Returns `true` if this sphere intersects with the given one.
     *
     * @param {Sphere} sphere - The sphere to test.
     * @return {boolean} Whether this sphere intersects with the given one or not.
     */
    intersectsSphere(sphere: Sphere): boolean;
    /**
     * Returns `true` if this sphere intersects with the given box.
     *
     * @param {Box3} box - The box to test.
     * @return {boolean} Whether this sphere intersects with the given box or not.
     */
    intersectsBox(box: Box3): boolean;
    /**
     * Returns `true` if this sphere intersects with the given plane.
     *
     * @param {Plane} plane - The plane to test.
     * @return {boolean} Whether this sphere intersects with the given plane or not.
     */
    intersectsPlane(plane: Plane): boolean;
    /**
     * Clamps a point within the sphere. If the point is outside the sphere, it
     * will clamp it to the closest point on the edge of the sphere. Points
     * already inside the sphere will not be affected.
     *
     * @param {Vector3} point - The plane to clamp.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The clamped point.
     */
    clampPoint(point: Vector3, target: Vector3): Vector3;
    /**
     * Returns a bounding box that encloses this sphere.
     *
     * @param {Box3} target - The target box that is used to store the method's result.
     * @return {Box3} The bounding box that encloses this sphere.
     */
    getBoundingBox(target: Box3): Box3;
    /**
     * Transforms this sphere with the given 4x4 transformation matrix.
     *
     * @param {Matrix4} matrix - The transformation matrix.
     * @return {Sphere} A reference to this sphere.
     */
    applyMatrix4(matrix: Matrix4): Sphere;
    /**
     * Translates the sphere's center by the given offset.
     *
     * @param {Vector3} offset - The offset.
     * @return {Sphere} A reference to this sphere.
     */
    translate(offset: Vector3): Sphere;
    /**
     * Expands the boundaries of this sphere to include the given point.
     *
     * @param {Vector3} point - The point to include.
     * @return {Sphere} A reference to this sphere.
     */
    expandByPoint(point: Vector3): Sphere;
    /**
     * Expands this sphere to enclose both the original sphere and the given sphere.
     *
     * @param {Sphere} sphere - The sphere to include.
     * @return {Sphere} A reference to this sphere.
     */
    union(sphere: Sphere): Sphere;
    /**
     * Returns `true` if this sphere is equal with the given one.
     *
     * @param {Sphere} sphere - The sphere to test for equality.
     * @return {boolean} Whether this bounding sphere is equal with the given one.
     */
    equals(sphere: Sphere): boolean;
    /**
     * Returns a new sphere with copied values from this instance.
     *
     * @return {Sphere} A clone of this instance.
     */
    clone(): Sphere;
    /**
     * Returns a serialized structure of the bounding sphere.
     *
     * @return {Object} Serialized structure with fields representing the object state.
     */
    toJSON(): Object;
    /**
     * Returns a serialized structure of the bounding sphere.
     *
     * @param {Object} json - The serialized json to set the sphere from.
     * @return {Sphere} A reference to this bounding sphere.
     */
    fromJSON(json: Object): Sphere;
}
import { Vector3 } from './Vector3.js';
import { Box3 } from './Box3.js';
