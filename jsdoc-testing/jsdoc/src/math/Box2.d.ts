/**
 * Represents an axis-aligned bounding box (AABB) in 2D space.
 */
export class Box2 {
    /**
     * Constructs a new bounding box.
     *
     * @param {Vector2} [min=(Infinity,Infinity)] - A vector representing the lower boundary of the box.
     * @param {Vector2} [max=(-Infinity,-Infinity)] - A vector representing the upper boundary of the box.
     */
    constructor(min?: Vector2, max?: Vector2);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBox2: boolean;
    /**
     * The lower boundary of the box.
     *
     * @type {Vector2}
     */
    min: Vector2;
    /**
     * The upper boundary of the box.
     *
     * @type {Vector2}
     */
    max: Vector2;
    /**
     * Sets the lower and upper boundaries of this box.
     * Please note that this method only copies the values from the given objects.
     *
     * @param {Vector2} min - The lower boundary of the box.
     * @param {Vector2} max - The upper boundary of the box.
     * @return {Box2} A reference to this bounding box.
     */
    set(min: Vector2, max: Vector2): Box2;
    /**
     * Sets the upper and lower bounds of this box so it encloses the position data
     * in the given array.
     *
     * @param {Array<Vector2>} points - An array holding 2D position data as instances of {@link Vector2}.
     * @return {Box2} A reference to this bounding box.
     */
    setFromPoints(points: Array<Vector2>): Box2;
    /**
     * Centers this box on the given center vector and sets this box's width, height and
     * depth to the given size values.
     *
     * @param {Vector2} center - The center of the box.
     * @param {Vector2} size - The x and y dimensions of the box.
     * @return {Box2} A reference to this bounding box.
     */
    setFromCenterAndSize(center: Vector2, size: Vector2): Box2;
    /**
     * Returns a new box with copied values from this instance.
     *
     * @return {Box2} A clone of this instance.
     */
    clone(): Box2;
    /**
     * Copies the values of the given box to this instance.
     *
     * @param {Box2} box - The box to copy.
     * @return {Box2} A reference to this bounding box.
     */
    copy(box: Box2): Box2;
    /**
     * Makes this box empty which means in encloses a zero space in 2D.
     *
     * @return {Box2} A reference to this bounding box.
     */
    makeEmpty(): Box2;
    /**
     * Returns true if this box includes zero points within its bounds.
     * Note that a box with equal lower and upper bounds still includes one
     * point, the one both bounds share.
     *
     * @return {boolean} Whether this box is empty or not.
     */
    isEmpty(): boolean;
    /**
     * Returns the center point of this box.
     *
     * @param {Vector2} target - The target vector that is used to store the method's result.
     * @return {Vector2} The center point.
     */
    getCenter(target: Vector2): Vector2;
    /**
     * Returns the dimensions of this box.
     *
     * @param {Vector2} target - The target vector that is used to store the method's result.
     * @return {Vector2} The size.
     */
    getSize(target: Vector2): Vector2;
    /**
     * Expands the boundaries of this box to include the given point.
     *
     * @param {Vector2} point - The point that should be included by the bounding box.
     * @return {Box2} A reference to this bounding box.
     */
    expandByPoint(point: Vector2): Box2;
    /**
     * Expands this box equilaterally by the given vector. The width of this
     * box will be expanded by the x component of the vector in both
     * directions. The height of this box will be expanded by the y component of
     * the vector in both directions.
     *
     * @param {Vector2} vector - The vector that should expand the bounding box.
     * @return {Box2} A reference to this bounding box.
     */
    expandByVector(vector: Vector2): Box2;
    /**
     * Expands each dimension of the box by the given scalar. If negative, the
     * dimensions of the box will be contracted.
     *
     * @param {number} scalar - The scalar value that should expand the bounding box.
     * @return {Box2} A reference to this bounding box.
     */
    expandByScalar(scalar: number): Box2;
    /**
     * Returns `true` if the given point lies within or on the boundaries of this box.
     *
     * @param {Vector2} point - The point to test.
     * @return {boolean} Whether the bounding box contains the given point or not.
     */
    containsPoint(point: Vector2): boolean;
    /**
     * Returns `true` if this bounding box includes the entirety of the given bounding box.
     * If this box and the given one are identical, this function also returns `true`.
     *
     * @param {Box2} box - The bounding box to test.
     * @return {boolean} Whether the bounding box contains the given bounding box or not.
     */
    containsBox(box: Box2): boolean;
    /**
     * Returns a point as a proportion of this box's width and height.
     *
     * @param {Vector2} point - A point in 2D space.
     * @param {Vector2} target - The target vector that is used to store the method's result.
     * @return {Vector2} A point as a proportion of this box's width and height.
     */
    getParameter(point: Vector2, target: Vector2): Vector2;
    /**
     * Returns `true` if the given bounding box intersects with this bounding box.
     *
     * @param {Box2} box - The bounding box to test.
     * @return {boolean} Whether the given bounding box intersects with this bounding box.
     */
    intersectsBox(box: Box2): boolean;
    /**
     * Clamps the given point within the bounds of this box.
     *
     * @param {Vector2} point - The point to clamp.
     * @param {Vector2} target - The target vector that is used to store the method's result.
     * @return {Vector2} The clamped point.
     */
    clampPoint(point: Vector2, target: Vector2): Vector2;
    /**
     * Returns the euclidean distance from any edge of this box to the specified point. If
     * the given point lies inside of this box, the distance will be `0`.
     *
     * @param {Vector2} point - The point to compute the distance to.
     * @return {number} The euclidean distance.
     */
    distanceToPoint(point: Vector2): number;
    /**
     * Computes the intersection of this bounding box and the given one, setting the upper
     * bound of this box to the lesser of the two boxes' upper bounds and the
     * lower bound of this box to the greater of the two boxes' lower bounds. If
     * there's no overlap, makes this box empty.
     *
     * @param {Box2} box - The bounding box to intersect with.
     * @return {Box2} A reference to this bounding box.
     */
    intersect(box: Box2): Box2;
    /**
     * Computes the union of this box and another and the given one, setting the upper
     * bound of this box to the greater of the two boxes' upper bounds and the
     * lower bound of this box to the lesser of the two boxes' lower bounds.
     *
     * @param {Box2} box - The bounding box that will be unioned with this instance.
     * @return {Box2} A reference to this bounding box.
     */
    union(box: Box2): Box2;
    /**
     * Adds the given offset to both the upper and lower bounds of this bounding box,
     * effectively moving it in 2D space.
     *
     * @param {Vector2} offset - The offset that should be used to translate the bounding box.
     * @return {Box2} A reference to this bounding box.
     */
    translate(offset: Vector2): Box2;
    /**
     * Returns `true` if this bounding box is equal with the given one.
     *
     * @param {Box2} box - The box to test for equality.
     * @return {boolean} Whether this bounding box is equal with the given one.
     */
    equals(box: Box2): boolean;
}
import { Vector2 } from './Vector2.js';
