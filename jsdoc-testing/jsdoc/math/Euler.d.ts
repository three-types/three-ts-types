/**
 * A class representing Euler angles.
 *
 * Euler angles describe a rotational transformation by rotating an object on
 * its various axes in specified amounts per axis, and a specified axis
 * order.
 *
 * Iterating through an instance will yield its components (x, y, z,
 * order) in the corresponding order.
 *
 * ```js
 * const a = new THREE.Euler( 0, 1, 1.57, 'XYZ' );
 * const b = new THREE.Vector3( 1, 0, 1 );
 * b.applyEuler(a);
 * ```
 */
export class Euler {
    /**
     * Constructs a new euler instance.
     *
     * @param {number} [x=0] - The angle of the x axis in radians.
     * @param {number} [y=0] - The angle of the y axis in radians.
     * @param {number} [z=0] - The angle of the z axis in radians.
     * @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
     */
    constructor(x?: number, y?: number, z?: number, order?: string);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isEuler: boolean;
    _x: number;
    _y: number;
    _z: number;
    _order: string;
    set x(value: number);
    /**
     * The angle of the x axis in radians.
     *
     * @type {number}
     * @default 0
     */
    get x(): number;
    set y(value: number);
    /**
     * The angle of the y axis in radians.
     *
     * @type {number}
     * @default 0
     */
    get y(): number;
    set z(value: number);
    /**
     * The angle of the z axis in radians.
     *
     * @type {number}
     * @default 0
     */
    get z(): number;
    set order(value: string);
    /**
     * A string representing the order that the rotations are applied.
     *
     * @type {string}
     * @default 'XYZ'
     */
    get order(): string;
    /**
     * Sets the Euler components.
     *
     * @param {number} x - The angle of the x axis in radians.
     * @param {number} y - The angle of the y axis in radians.
     * @param {number} z - The angle of the z axis in radians.
     * @param {string} [order] - A string representing the order that the rotations are applied.
     * @return {Euler} A reference to this Euler instance.
     */
    set(x: number, y: number, z: number, order?: string): Euler;
    /**
     * Returns a new Euler instance with copied values from this instance.
     *
     * @return {Euler} A clone of this instance.
     */
    clone(): Euler;
    /**
     * Copies the values of the given Euler instance to this instance.
     *
     * @param {Euler} euler - The Euler instance to copy.
     * @return {Euler} A reference to this Euler instance.
     */
    copy(euler: Euler): Euler;
    /**
     * Sets the angles of this Euler instance from a pure rotation matrix.
     *
     * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
     * @param {string} [order] - A string representing the order that the rotations are applied.
     * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
     * @return {Euler} A reference to this Euler instance.
     */
    setFromRotationMatrix(m: Matrix4, order?: string, update?: boolean): Euler;
    /**
     * Sets the angles of this Euler instance from a normalized quaternion.
     *
     * @param {Quaternion} q - A normalized Quaternion.
     * @param {string} [order] - A string representing the order that the rotations are applied.
     * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
     * @return {Euler} A reference to this Euler instance.
     */
    setFromQuaternion(q: Quaternion, order?: string, update?: boolean): Euler;
    /**
     * Sets the angles of this Euler instance from the given vector.
     *
     * @param {Vector3} v - The vector.
     * @param {string} [order] - A string representing the order that the rotations are applied.
     * @return {Euler} A reference to this Euler instance.
     */
    setFromVector3(v: Vector3, order?: string): Euler;
    /**
     * Resets the euler angle with a new order by creating a quaternion from this
     * euler angle and then setting this euler angle with the quaternion and the
     * new order.
     *
     * Warning: This discards revolution information.
     *
     * @param {string} [newOrder] - A string representing the new order that the rotations are applied.
     * @return {Euler} A reference to this Euler instance.
     */
    reorder(newOrder?: string): Euler;
    /**
     * Returns `true` if this Euler instance is equal with the given one.
     *
     * @param {Euler} euler - The Euler instance to test for equality.
     * @return {boolean} Whether this Euler instance is equal with the given one.
     */
    equals(euler: Euler): boolean;
    /**
     * Sets this Euler instance's components to values from the given array. The first three
     * entries of the array are assign to the x,y and z components. An optional fourth entry
     * defines the Euler order.
     *
     * @param {Array<number,number,number,?string>} array - An array holding the Euler component values.
     * @return {Euler} A reference to this Euler instance.
     */
    fromArray(array: Array<number, number, number, string | null>): Euler;
    /**
     * Writes the components of this Euler instance to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number,number,number,string>} The Euler components.
     */
    toArray(array?: Array<number, number, number, string>, offset?: number): Array<number, number, number, string>;
    _onChange(callback: any): this;
    _onChangeCallback(): void;
    [Symbol.iterator](): Generator<string | number, void, unknown>;
}
export namespace Euler {
    let DEFAULT_ORDER: string;
}
import { Matrix4 } from './Matrix4.js';
import { Quaternion } from './Quaternion.js';
