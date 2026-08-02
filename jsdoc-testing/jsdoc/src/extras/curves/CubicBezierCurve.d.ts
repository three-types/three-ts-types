/**
 * A curve representing a 2D Cubic Bezier curve.
 *
 * ```js
 * const curve = new THREE.CubicBezierCurve(
 * 	new THREE.Vector2( - 0, 0 ),
 * 	new THREE.Vector2( - 5, 15 ),
 * 	new THREE.Vector2( 20, 15 ),
 * 	new THREE.Vector2( 10, 0 )
 * );
 *
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 *
 * const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
 *
 * // Create the final object to add to the scene
 * const curveObject = new THREE.Line( geometry, material );
 * ```
 *
 * @augments Curve
 */
export class CubicBezierCurve extends Curve {
    /**
     * Constructs a new Cubic Bezier curve.
     *
     * @param {Vector2} [v0] - The start point.
     * @param {Vector2} [v1] - The first control point.
     * @param {Vector2} [v2] - The second control point.
     * @param {Vector2} [v3] - The end point.
     */
    constructor(v0?: Vector2, v1?: Vector2, v2?: Vector2, v3?: Vector2);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCubicBezierCurve: boolean;
    type: string;
    /**
     * The start point.
     *
     * @type {Vector2}
     */
    v0: Vector2;
    /**
     * The first control point.
     *
     * @type {Vector2}
     */
    v1: Vector2;
    /**
     * The second control point.
     *
     * @type {Vector2}
     */
    v2: Vector2;
    /**
     * The end point.
     *
     * @type {Vector2}
     */
    v3: Vector2;
    /**
     * Returns a point on the curve.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector2} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector2} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector2): Vector2;
    copy(source: any): this;
    fromJSON(json: any): this;
}
import { Curve } from '../core/Curve.js';
import { Vector2 } from '../../math/Vector2.js';
