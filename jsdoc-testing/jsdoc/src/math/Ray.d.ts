/**
 * A ray that emits from an origin in a certain direction. The class is used by
 * {@link Raycaster} to assist with raycasting. Raycasting is used for
 * mouse picking (working out what objects in the 3D space the mouse is over)
 * amongst other things.
 */
export class Ray {
    /**
     * Constructs a new ray.
     *
     * @param {Vector3} [origin=(0,0,0)] - The origin of the ray.
     * @param {Vector3} [direction=(0,0,-1)] - The (normalized) direction of the ray.
     */
    constructor(origin?: Vector3, direction?: Vector3);
    /**
     * The origin of the ray.
     *
     * @type {Vector3}
     */
    origin: Vector3;
    /**
     * The (normalized) direction of the ray.
     *
     * @type {Vector3}
     */
    direction: Vector3;
    /**
     * Sets the ray's components by copying the given values.
     *
     * @param {Vector3} origin - The origin.
     * @param {Vector3} direction - The direction.
     * @return {Ray} A reference to this ray.
     */
    set(origin: Vector3, direction: Vector3): Ray;
    /**
     * Copies the values of the given ray to this instance.
     *
     * @param {Ray} ray - The ray to copy.
     * @return {Ray} A reference to this ray.
     */
    copy(ray: Ray): Ray;
    /**
     * Returns a vector that is located at a given distance along this ray.
     *
     * @param {number} t - The distance along the ray to retrieve a position for.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} A position on the ray.
     */
    at(t: number, target: Vector3): Vector3;
    /**
     * Adjusts the direction of the ray to point at the given vector in world space.
     *
     * @param {Vector3} v - The target position.
     * @return {Ray} A reference to this ray.
     */
    lookAt(v: Vector3): Ray;
    /**
     * Shift the origin of this ray along its direction by the given distance.
     *
     * @param {number} t - The distance along the ray to interpolate.
     * @return {Ray} A reference to this ray.
     */
    recast(t: number): Ray;
    /**
     * Returns the point along this ray that is closest to the given point.
     *
     * @param {Vector3} point - A point in 3D space to get the closet location on the ray for.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The closest point on this ray.
     */
    closestPointToPoint(point: Vector3, target: Vector3): Vector3;
    /**
     * Returns the distance of the closest approach between this ray and the given point.
     *
     * @param {Vector3} point - A point in 3D space to compute the distance to.
     * @return {number} The distance.
     */
    distanceToPoint(point: Vector3): number;
    /**
     * Returns the squared distance of the closest approach between this ray and the given point.
     *
     * @param {Vector3} point - A point in 3D space to compute the distance to.
     * @return {number} The squared distance.
     */
    distanceSqToPoint(point: Vector3): number;
    /**
     * Returns the squared distance between this ray and the given line segment.
     *
     * @param {Vector3} v0 - The start point of the line segment.
     * @param {Vector3} v1 - The end point of the line segment.
     * @param {Vector3} [optionalPointOnRay] - When provided, it receives the point on this ray that is closest to the segment.
     * @param {Vector3} [optionalPointOnSegment] - When provided, it receives the point on the line segment that is closest to this ray.
     * @return {number} The squared distance.
     */
    distanceSqToSegment(v0: Vector3, v1: Vector3, optionalPointOnRay?: Vector3, optionalPointOnSegment?: Vector3): number;
    /**
     * Intersects this ray with the given sphere, returning the intersection
     * point or `null` if there is no intersection.
     *
     * @param {Sphere} sphere - The sphere to intersect.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {?Vector3} The intersection point.
     */
    intersectSphere(sphere: Sphere, target: Vector3): Vector3 | null;
    /**
     * Returns `true` if this ray intersects with the given sphere.
     *
     * @param {Sphere} sphere - The sphere to intersect.
     * @return {boolean} Whether this ray intersects with the given sphere or not.
     */
    intersectsSphere(sphere: Sphere): boolean;
    /**
     * Computes the distance from the ray's origin to the given plane. Returns `null` if the ray
     * does not intersect with the plane.
     *
     * @param {Plane} plane - The plane to compute the distance to.
     * @return {?number} Whether this ray intersects with the given sphere or not.
     */
    distanceToPlane(plane: Plane): number | null;
    /**
     * Intersects this ray with the given plane, returning the intersection
     * point or `null` if there is no intersection.
     *
     * @param {Plane} plane - The plane to intersect.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {?Vector3} The intersection point.
     */
    intersectPlane(plane: Plane, target: Vector3): Vector3 | null;
    /**
     * Returns `true` if this ray intersects with the given plane.
     *
     * @param {Plane} plane - The plane to intersect.
     * @return {boolean} Whether this ray intersects with the given plane or not.
     */
    intersectsPlane(plane: Plane): boolean;
    /**
     * Intersects this ray with the given bounding box, returning the intersection
     * point or `null` if there is no intersection.
     *
     * @param {Box3} box - The box to intersect.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {?Vector3} The intersection point.
     */
    intersectBox(box: Box3, target: Vector3): Vector3 | null;
    /**
     * Returns `true` if this ray intersects with the given box.
     *
     * @param {Box3} box - The box to intersect.
     * @return {boolean} Whether this ray intersects with the given box or not.
     */
    intersectsBox(box: Box3): boolean;
    /**
     * Intersects this ray with the given triangle, returning the intersection
     * point or `null` if there is no intersection.
     *
     * @param {Vector3} a - The first vertex of the triangle.
     * @param {Vector3} b - The second vertex of the triangle.
     * @param {Vector3} c - The third vertex of the triangle.
     * @param {boolean} backfaceCulling - Whether to use backface culling or not.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {?Vector3} The intersection point.
     */
    intersectTriangle(a: Vector3, b: Vector3, c: Vector3, backfaceCulling: boolean, target: Vector3): Vector3 | null;
    /**
     * Transforms this ray with the given 4x4 transformation matrix.
     *
     * @param {Matrix4} matrix4 - The transformation matrix.
     * @return {Ray} A reference to this ray.
     */
    applyMatrix4(matrix4: Matrix4): Ray;
    /**
     * Returns `true` if this ray is equal with the given one.
     *
     * @param {Ray} ray - The ray to test for equality.
     * @return {boolean} Whether this ray is equal with the given one.
     */
    equals(ray: Ray): boolean;
    /**
     * Returns a new ray with copied values from this instance.
     *
     * @return {Ray} A clone of this instance.
     */
    clone(): Ray;
}
import { Vector3 } from './Vector3.js';
