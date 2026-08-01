/**
 * This class can be used to represent points in 3D space as
 * [Spherical coordinates](https://en.wikipedia.org/wiki/Spherical_coordinate_system).
 */
export class Spherical {
    /**
     * Constructs a new spherical.
     *
     * @param {number} [radius=1] - The radius, or the Euclidean distance (straight-line distance) from the point to the origin.
     * @param {number} [phi=0] - The polar angle in radians from the y (up) axis.
     * @param {number} [theta=0] - The equator/azimuthal angle in radians around the y (up) axis.
     */
    constructor(radius?: number, phi?: number, theta?: number);
    /**
     * The radius, or the Euclidean distance (straight-line distance) from the point to the origin.
     *
     * @type {number}
     * @default 1
     */
    radius: number;
    /**
     * The polar angle in radians from the y (up) axis.
     *
     * @type {number}
     * @default 0
     */
    phi: number;
    /**
     * The equator/azimuthal angle in radians around the y (up) axis.
     *
     * @type {number}
     * @default 0
     */
    theta: number;
    /**
     * Sets the spherical components by copying the given values.
     *
     * @param {number} radius - The radius.
     * @param {number} phi - The polar angle.
     * @param {number} theta - The azimuthal angle.
     * @return {Spherical} A reference to this spherical.
     */
    set(radius: number, phi: number, theta: number): Spherical;
    /**
     * Copies the values of the given spherical to this instance.
     *
     * @param {Spherical} other - The spherical to copy.
     * @return {Spherical} A reference to this spherical.
     */
    copy(other: Spherical): Spherical;
    /**
     * Restricts the polar angle [page:.phi phi] to be between `0.000001` and pi -
     * `0.000001`.
     *
     * @return {Spherical} A reference to this spherical.
     */
    makeSafe(): Spherical;
    /**
     * Sets the spherical components from the given vector which is assumed to hold
     * Cartesian coordinates.
     *
     * @param {Vector3} v - The vector to set.
     * @return {Spherical} A reference to this spherical.
     */
    setFromVector3(v: Vector3): Spherical;
    /**
     * Sets the spherical components from the given Cartesian coordinates.
     *
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} z - The z value.
     * @return {Spherical} A reference to this spherical.
     */
    setFromCartesianCoords(x: number, y: number, z: number): Spherical;
    /**
     * Returns a new spherical with copied values from this instance.
     *
     * @return {Spherical} A clone of this instance.
     */
    clone(): Spherical;
}
