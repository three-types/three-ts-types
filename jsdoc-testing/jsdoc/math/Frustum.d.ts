/**
 * Frustums are used to determine what is inside the camera's field of view.
 * They help speed up the rendering process - objects which lie outside a camera's
 * frustum can safely be excluded from rendering.
 *
 * This class is mainly intended for use internally by a renderer.
 */
export class Frustum {
    /**
     * Constructs a new frustum.
     *
     * @param {Plane} [p0] - The first plane that encloses the frustum.
     * @param {Plane} [p1] - The second plane that encloses the frustum.
     * @param {Plane} [p2] - The third plane that encloses the frustum.
     * @param {Plane} [p3] - The fourth plane that encloses the frustum.
     * @param {Plane} [p4] - The fifth plane that encloses the frustum.
     * @param {Plane} [p5] - The sixth plane that encloses the frustum.
     */
    constructor(p0?: Plane, p1?: Plane, p2?: Plane, p3?: Plane, p4?: Plane, p5?: Plane);
    /**
     * This array holds the planes that enclose the frustum.
     *
     * @type {Array<Plane>}
     */
    planes: Array<Plane>;
    /**
     * Sets the frustum planes by copying the given planes.
     *
     * @param {Plane} [p0] - The first plane that encloses the frustum.
     * @param {Plane} [p1] - The second plane that encloses the frustum.
     * @param {Plane} [p2] - The third plane that encloses the frustum.
     * @param {Plane} [p3] - The fourth plane that encloses the frustum.
     * @param {Plane} [p4] - The fifth plane that encloses the frustum.
     * @param {Plane} [p5] - The sixth plane that encloses the frustum.
     * @return {Frustum} A reference to this frustum.
     */
    set(p0?: Plane, p1?: Plane, p2?: Plane, p3?: Plane, p4?: Plane, p5?: Plane): Frustum;
    /**
     * Copies the values of the given frustum to this instance.
     *
     * @param {Frustum} frustum - The frustum to copy.
     * @return {Frustum} A reference to this frustum.
     */
    copy(frustum: Frustum): Frustum;
    /**
     * Sets the frustum planes from the given projection matrix.
     *
     * @param {Matrix4} m - The projection matrix.
     * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} coordinateSystem - The coordinate system.
     * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
     * @return {Frustum} A reference to this frustum.
     */
    setFromProjectionMatrix(m: Matrix4, coordinateSystem?: (number | number), reversedDepth?: boolean): Frustum;
    /**
     * Returns `true` if the 3D object's bounding sphere is intersecting this frustum.
     *
     * Note that the 3D object must have a geometry so that the bounding sphere can be calculated.
     *
     * @param {Object3D} object - The 3D object to test.
     * @return {boolean} Whether the 3D object's bounding sphere is intersecting this frustum or not.
     */
    intersectsObject(object: Object3D): boolean;
    /**
     * Returns `true` if the given sprite is intersecting this frustum.
     *
     * @param {Sprite} sprite - The sprite to test.
     * @return {boolean} Whether the sprite is intersecting this frustum or not.
     */
    intersectsSprite(sprite: Sprite): boolean;
    /**
     * Returns `true` if the given bounding sphere is intersecting this frustum.
     *
     * @param {Sphere} sphere - The bounding sphere to test.
     * @return {boolean} Whether the bounding sphere is intersecting this frustum or not.
     */
    intersectsSphere(sphere: Sphere): boolean;
    /**
     * Returns `true` if the given bounding box is intersecting this frustum.
     *
     * @param {Box3} box - The bounding box to test.
     * @return {boolean} Whether the bounding box is intersecting this frustum or not.
     */
    intersectsBox(box: Box3): boolean;
    /**
     * Returns `true` if the given point lies within the frustum.
     *
     * @param {Vector3} point - The point to test.
     * @return {boolean} Whether the point lies within this frustum or not.
     */
    containsPoint(point: Vector3): boolean;
    /**
     * Returns a new frustum with copied values from this instance.
     *
     * @return {Frustum} A clone of this instance.
     */
    clone(): Frustum;
}
import { Plane } from './Plane.js';
import { Sphere } from './Sphere.js';
import { Vector3 } from './Vector3.js';
