/**
 * A curve representing a 2D spline curve.
 *
 * ```js
 * // Create a sine-like wave
 * const curve = new THREE.SplineCurve( [
 * 	new THREE.Vector2( -10, 0 ),
 * 	new THREE.Vector2( -5, 5 ),
 * 	new THREE.Vector2( 0, 0 ),
 * 	new THREE.Vector2( 5, -5 ),
 * 	new THREE.Vector2( 10, 0 )
 * ] );
 *
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 *
 * const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
 *
 * // Create the final object to add to the scene
 * const splineObject = new THREE.Line( geometry, material );
 * ```
 *
 * @augments Curve
 */
export class SplineCurve extends Curve {
    /**
     * Constructs a new 2D spline curve.
     *
     * @param {Array<Vector2>} [points] -  An array of 2D points defining the curve.
     */
    constructor(points?: Array<Vector2>);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSplineCurve: boolean;
    type: string;
    /**
     * An array of 2D points defining the curve.
     *
     * @type {Array<Vector2>}
     */
    points: Array<Vector2>;
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
