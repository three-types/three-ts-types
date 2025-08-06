/**
 * Represents a 2x2 matrix.
 *
 * A Note on Row-Major and Column-Major Ordering:
 *
 * The constructor and {@link Matrix2#set} method take arguments in
 * [row-major]{@link https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order}
 * order, while internally they are stored in the {@link Matrix2#elements} array in column-major order.
 * This means that calling:
 * ```js
 * const m = new THREE.Matrix2();
 * m.set( 11, 12,
 *        21, 22 );
 * ```
 * will result in the elements array containing:
 * ```js
 * m.elements = [ 11, 21,
 *                12, 22 ];
 * ```
 * and internally all calculations are performed using column-major ordering.
 * However, as the actual ordering makes no difference mathematically and
 * most people are used to thinking about matrices in row-major order, the
 * three.js documentation shows matrices in row-major order. Just bear in
 * mind that if you are reading the source code, you'll have to take the
 * transpose of any matrices outlined here to make sense of the calculations.
 */
export class Matrix2 {
    /**
     * Constructs a new 2x2 matrix. The arguments are supposed to be
     * in row-major order. If no arguments are provided, the constructor
     * initializes the matrix as an identity matrix.
     *
     * @param {number} [n11] - 1-1 matrix element.
     * @param {number} [n12] - 1-2 matrix element.
     * @param {number} [n21] - 2-1 matrix element.
     * @param {number} [n22] - 2-2 matrix element.
     */
    constructor(n11?: number, n12?: number, n21?: number, n22?: number);
    /**
     * A column-major list of matrix values.
     *
     * @type {Array<number>}
     */
    elements: Array<number>;
    /**
     * Sets this matrix to the 2x2 identity matrix.
     *
     * @return {Matrix2} A reference to this matrix.
     */
    identity(): Matrix2;
    /**
     * Sets the elements of the matrix from the given array.
     *
     * @param {Array<number>} array - The matrix elements in column-major order.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Matrix2} A reference to this matrix.
     */
    fromArray(array: Array<number>, offset?: number): Matrix2;
    /**
     * Sets the elements of the matrix.The arguments are supposed to be
     * in row-major order.
     *
     * @param {number} n11 - 1-1 matrix element.
     * @param {number} n12 - 1-2 matrix element.
     * @param {number} n21 - 2-1 matrix element.
     * @param {number} n22 - 2-2 matrix element.
     * @return {Matrix2} A reference to this matrix.
     */
    set(n11: number, n12: number, n21: number, n22: number): Matrix2;
}
