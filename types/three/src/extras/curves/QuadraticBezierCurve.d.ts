import { Vector2 } from "../../math/Vector2.js";
import { Curve } from "../core/Curve.js";

/**
 * A curve representing a 2D Quadratic Bezier curve.
 *
 * ```js
 * const curve = new THREE.QuadraticBezierCurve(
 * 	new THREE.Vector2( - 10, 0 ),
 * 	new THREE.Vector2( 20, 15 ),
 * 	new THREE.Vector2( 10, 0 )
 * )
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
export class QuadraticBezierCurve extends Curve<Vector2> {
    /**
     * Constructs a new Quadratic Bezier curve.
     *
     * @param {Vector2} [v0] - The start point.
     * @param {Vector2} [v1] - The control point.
     * @param {Vector2} [v2] - The end point.
     */
    constructor(v0?: Vector2, v1?: Vector2, v2?: Vector2);
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isQuadraticBezierCurve: true;
    /**
     * The start point.
     */
    v0: Vector2;
    /**
     * The control point.
     */
    v1: Vector2;
    /**
     * The end point.
     */
    v2: Vector2;
    /**
     * Returns a point on the curve.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector2} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector2} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector2): Vector2;
    copy(source: QuadraticBezierCurve): this;
}
