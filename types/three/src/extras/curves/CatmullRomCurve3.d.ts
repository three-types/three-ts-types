import { Vector3 } from "../../math/Vector3.js";
import { Curve } from "../core/Curve.js";

export type CurveType = "centripetal" | "chordal" | "catmullrom";

/**
 * A curve representing a Catmull-Rom spline.
 *
 * ```js
 * //Create a closed wavey loop
 * const curve = new THREE.CatmullRomCurve3( [
 * 	new THREE.Vector3( -10, 0, 10 ),
 * 	new THREE.Vector3( -5, 5, 5 ),
 * 	new THREE.Vector3( 0, 0, 0 ),
 * 	new THREE.Vector3( 5, -5, 5 ),
 * 	new THREE.Vector3( 10, 0, 10 )
 * ] );
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
export class CatmullRomCurve3 extends Curve<Vector3> {
    /**
     * Constructs a new Catmull-Rom curve.
     *
     * @param {Array<Vector3>} [points] - An array of 3D points defining the curve.
     * @param {boolean} [closed=false] - Whether the curve is closed or not.
     * @param {('centripetal'|'chordal'|'catmullrom')} [curveType='centripetal'] - The curve type.
     * @param {number} [tension=0.5] - Tension of the curve.
     */
    constructor(points?: Array<Vector3>, closed?: boolean, curveType?: CurveType, tension?: number);
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isCatmullRomCurve3: true;
    /**
     * An array of 3D points defining the curve.
     */
    points: Array<Vector3>;
    /**
     * Whether the curve is closed or not.
     *
     * @default false
     */
    closed: boolean;
    /**
     * The curve type.
     *
     * @default 'centripetal'
     */
    curveType: CurveType;
    /**
     * Tension of the curve.
     *
     * @default 0.5
     */
    tension: number;
    /**
     * Returns a point on the curve.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
    copy(source: CatmullRomCurve3): this;
}
