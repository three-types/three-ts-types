/**
 * A capsule is essentially a cylinder with hemispherical caps at both ends.
 * It can be thought of as a swept sphere, where a sphere is moved along a line segment.
 *
 * Capsules are often used as bounding volumes (next to AABBs and bounding spheres).
 *
 * @three_import import { Capsule } from 'three/addons/math/Capsule.js';
 */
export class Capsule {
    /**
     * Constructs a new capsule.
     *
     * @param {Vector3} [start] - The start vector.
     * @param {Vector3} [end] - The end vector.
     * @param {number} [radius=1] - The capsule's radius.
     */
    constructor(start?: Vector3, end?: Vector3, radius?: number);
    /**
     * The start vector.
     *
     * @type {Vector3}
     */
    start: Vector3;
    /**
     * The end vector.
     *
     * @type {Vector3}
     */
    end: Vector3;
    /**
     * The capsule's radius.
     *
     * @type {number}
     * @default 1
     */
    radius: number;
    /**
     * Returns a new capsule with copied values from this instance.
     *
     * @return {Capsule} A clone of this instance.
     */
    clone(): Capsule;
    /**
     * Sets the capsule components to the given values.
     * Please note that this method only copies the values from the given objects.
     *
     * @param {Vector3} start - The start vector.
     * @param {Vector3} end - The end vector
     * @param {number} radius - The capsule's radius.
     * @return {Capsule} A reference to this capsule.
     */
    set(start: Vector3, end: Vector3, radius: number): Capsule;
    /**
     * Copies the values of the given capsule to this instance.
     *
     * @param {Capsule} capsule - The capsule to copy.
     * @return {Capsule} A reference to this capsule.
     */
    copy(capsule: Capsule): Capsule;
    /**
     * Returns the center point of this capsule.
     *
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The center point.
     */
    getCenter(target: Vector3): Vector3;
    /**
     * Adds the given offset to this capsule, effectively moving it in 3D space.
     *
     * @param {Vector3} v - The offset that should be used to translate the capsule.
     * @return {Capsule} A reference to this capsule.
     */
    translate(v: Vector3): Capsule;
    /**
     * Returns `true` if the given bounding box intersects with this capsule.
     *
     * @param {Box3} box - The bounding box to test.
     * @return {boolean} Whether the given bounding box intersects with this capsule.
     */
    intersectsBox(box: Box3): boolean;
}
import { Vector3 } from 'three';
