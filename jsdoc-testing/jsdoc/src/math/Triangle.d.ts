/**
 * A geometric triangle as defined by three vectors representing its three corners.
 */
export class Triangle {
    /**
     * Computes the normal vector of a triangle.
     *
     * @param {Vector3} a - The first corner of the triangle.
     * @param {Vector3} b - The second corner of the triangle.
     * @param {Vector3} c - The third corner of the triangle.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The triangle's normal.
     */
    static getNormal(a: Vector3, b: Vector3, c: Vector3, target: Vector3): Vector3;
    /**
     * Computes a barycentric coordinates from the given vector.
     * Returns `null` if the triangle is degenerate.
     *
     * @param {Vector3} point - A point in 3D space.
     * @param {Vector3} a - The first corner of the triangle.
     * @param {Vector3} b - The second corner of the triangle.
     * @param {Vector3} c - The third corner of the triangle.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {?Vector3} The barycentric coordinates for the given point
     */
    static getBarycoord(point: Vector3, a: Vector3, b: Vector3, c: Vector3, target: Vector3): Vector3 | null;
    /**
     * Returns `true` if the given point, when projected onto the plane of the
     * triangle, lies within the triangle.
     *
     * @param {Vector3} point - The point in 3D space to test.
     * @param {Vector3} a - The first corner of the triangle.
     * @param {Vector3} b - The second corner of the triangle.
     * @param {Vector3} c - The third corner of the triangle.
     * @return {boolean} Whether the given point, when projected onto the plane of the
     * triangle, lies within the triangle or not.
     */
    static containsPoint(point: Vector3, a: Vector3, b: Vector3, c: Vector3): boolean;
    /**
     * Computes the value barycentrically interpolated for the given point on the
     * triangle. Returns `null` if the triangle is degenerate.
     *
     * @param {Vector3} point - Position of interpolated point.
     * @param {Vector3} p1 - The first corner of the triangle.
     * @param {Vector3} p2 - The second corner of the triangle.
     * @param {Vector3} p3 - The third corner of the triangle.
     * @param {Vector3} v1 - Value to interpolate of first vertex.
     * @param {Vector3} v2 - Value to interpolate of second vertex.
     * @param {Vector3} v3 - Value to interpolate of third vertex.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {?Vector3} The interpolated value.
     */
    static getInterpolation(point: Vector3, p1: Vector3, p2: Vector3, p3: Vector3, v1: Vector3, v2: Vector3, v3: Vector3, target: Vector3): Vector3 | null;
    /**
     * Computes the value barycentrically interpolated for the given attribute and indices.
     *
     * @param {BufferAttribute} attr - The attribute to interpolate.
     * @param {number} i1 - Index of first vertex.
     * @param {number} i2 - Index of second vertex.
     * @param {number} i3 - Index of third vertex.
     * @param {Vector3} barycoord - The barycoordinate value to use to interpolate.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The interpolated attribute value.
     */
    static getInterpolatedAttribute(attr: BufferAttribute, i1: number, i2: number, i3: number, barycoord: Vector3, target: Vector3): Vector3;
    /**
     * Returns `true` if the triangle is oriented towards the given direction.
     *
     * @param {Vector3} a - The first corner of the triangle.
     * @param {Vector3} b - The second corner of the triangle.
     * @param {Vector3} c - The third corner of the triangle.
     * @param {Vector3} direction - The (normalized) direction vector.
     * @return {boolean} Whether the triangle is oriented towards the given direction or not.
     */
    static isFrontFacing(a: Vector3, b: Vector3, c: Vector3, direction: Vector3): boolean;
    /**
     * Constructs a new triangle.
     *
     * @param {Vector3} [a=(0,0,0)] - The first corner of the triangle.
     * @param {Vector3} [b=(0,0,0)] - The second corner of the triangle.
     * @param {Vector3} [c=(0,0,0)] - The third corner of the triangle.
     */
    constructor(a?: Vector3, b?: Vector3, c?: Vector3);
    /**
     * The first corner of the triangle.
     *
     * @type {Vector3}
     */
    a: Vector3;
    /**
     * The second corner of the triangle.
     *
     * @type {Vector3}
     */
    b: Vector3;
    /**
     * The third corner of the triangle.
     *
     * @type {Vector3}
     */
    c: Vector3;
    /**
     * Sets the triangle's vertices by copying the given values.
     *
     * @param {Vector3} a - The first corner of the triangle.
     * @param {Vector3} b - The second corner of the triangle.
     * @param {Vector3} c - The third corner of the triangle.
     * @return {Triangle} A reference to this triangle.
     */
    set(a: Vector3, b: Vector3, c: Vector3): Triangle;
    /**
     * Sets the triangle's vertices by copying the given array values.
     *
     * @param {Array<Vector3>} points - An array with 3D points.
     * @param {number} i0 - The array index representing the first corner of the triangle.
     * @param {number} i1 - The array index representing the second corner of the triangle.
     * @param {number} i2 - The array index representing the third corner of the triangle.
     * @return {Triangle} A reference to this triangle.
     */
    setFromPointsAndIndices(points: Array<Vector3>, i0: number, i1: number, i2: number): Triangle;
    /**
     * Sets the triangle's vertices by copying the given attribute values.
     *
     * @param {BufferAttribute} attribute - A buffer attribute with 3D points data.
     * @param {number} i0 - The attribute index representing the first corner of the triangle.
     * @param {number} i1 - The attribute index representing the second corner of the triangle.
     * @param {number} i2 - The attribute index representing the third corner of the triangle.
     * @return {Triangle} A reference to this triangle.
     */
    setFromAttributeAndIndices(attribute: BufferAttribute, i0: number, i1: number, i2: number): Triangle;
    /**
     * Returns a new triangle with copied values from this instance.
     *
     * @return {Triangle} A clone of this instance.
     */
    clone(): Triangle;
    /**
     * Copies the values of the given triangle to this instance.
     *
     * @param {Triangle} triangle - The triangle to copy.
     * @return {Triangle} A reference to this triangle.
     */
    copy(triangle: Triangle): Triangle;
    /**
     * Computes the area of the triangle.
     *
     * @return {number} The triangle's area.
     */
    getArea(): number;
    /**
     * Computes the midpoint of the triangle.
     *
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The triangle's midpoint.
     */
    getMidpoint(target: Vector3): Vector3;
    /**
     * Computes the normal of the triangle.
     *
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The triangle's normal.
     */
    getNormal(target: Vector3): Vector3;
    /**
     * Computes a plane the triangle lies within.
     *
     * @param {Plane} target - The target vector that is used to store the method's result.
     * @return {Plane} The plane the triangle lies within.
     */
    getPlane(target: Plane): Plane;
    /**
     * Computes a barycentric coordinates from the given vector.
     * Returns `null` if the triangle is degenerate.
     *
     * @param {Vector3} point - A point in 3D space.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {?Vector3} The barycentric coordinates for the given point
     */
    getBarycoord(point: Vector3, target: Vector3): Vector3 | null;
    /**
     * Computes the value barycentrically interpolated for the given point on the
     * triangle. Returns `null` if the triangle is degenerate.
     *
     * @param {Vector3} point - Position of interpolated point.
     * @param {Vector3} v1 - Value to interpolate of first vertex.
     * @param {Vector3} v2 - Value to interpolate of second vertex.
     * @param {Vector3} v3 - Value to interpolate of third vertex.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {?Vector3} The interpolated value.
     */
    getInterpolation(point: Vector3, v1: Vector3, v2: Vector3, v3: Vector3, target: Vector3): Vector3 | null;
    /**
     * Returns `true` if the given point, when projected onto the plane of the
     * triangle, lies within the triangle.
     *
     * @param {Vector3} point - The point in 3D space to test.
     * @return {boolean} Whether the given point, when projected onto the plane of the
     * triangle, lies within the triangle or not.
     */
    containsPoint(point: Vector3): boolean;
    /**
     * Returns `true` if the triangle is oriented towards the given direction.
     *
     * @param {Vector3} direction - The (normalized) direction vector.
     * @return {boolean} Whether the triangle is oriented towards the given direction or not.
     */
    isFrontFacing(direction: Vector3): boolean;
    /**
     * Returns `true` if this triangle intersects with the given box.
     *
     * @param {Box3} box - The box to intersect.
     * @return {boolean} Whether this triangle intersects with the given box or not.
     */
    intersectsBox(box: Box3): boolean;
    /**
     * Returns the closest point on the triangle to the given point.
     *
     * @param {Vector3} p - The point to compute the closest point for.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The closest point on the triangle.
     */
    closestPointToPoint(p: Vector3, target: Vector3): Vector3;
    /**
     * Returns `true` if this triangle is equal with the given one.
     *
     * @param {Triangle} triangle - The triangle to test for equality.
     * @return {boolean} Whether this triangle is equal with the given one.
     */
    equals(triangle: Triangle): boolean;
}
import { Vector3 } from './Vector3.js';
