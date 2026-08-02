/**
 * A curve representing an ellipse.
 *
 * ```js
 * const curve = new THREE.EllipseCurve(
 * 	0, 0,
 * 	10, 10,
 * 	0, 2 * Math.PI,
 * 	false,
 * 	0
 * );
 *
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 *
 * const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
 *
 * // Create the final object to add to the scene
 * const ellipse = new THREE.Line( geometry, material );
 * ```
 *
 * @augments Curve
 */
export class EllipseCurve extends Curve {
    /**
     * Constructs a new ellipse curve.
     *
     * @param {number} [aX=0] - The X center of the ellipse.
     * @param {number} [aY=0] - The Y center of the ellipse.
     * @param {number} [xRadius=1] - The radius of the ellipse in the x direction.
     * @param {number} [yRadius=1] - The radius of the ellipse in the y direction.
     * @param {number} [aStartAngle=0] - The start angle of the curve in radians starting from the positive X axis.
     * @param {number} [aEndAngle=Math.PI*2] - The end angle of the curve in radians starting from the positive X axis.
     * @param {boolean} [aClockwise=false] - Whether the ellipse is drawn clockwise or not.
     * @param {number} [aRotation=0] - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis.
     */
    constructor(aX?: number, aY?: number, xRadius?: number, yRadius?: number, aStartAngle?: number, aEndAngle?: number, aClockwise?: boolean, aRotation?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isEllipseCurve: boolean;
    type: string;
    /**
     * The X center of the ellipse.
     *
     * @type {number}
     * @default 0
     */
    aX: number;
    /**
     * The Y center of the ellipse.
     *
     * @type {number}
     * @default 0
     */
    aY: number;
    /**
     * The radius of the ellipse in the x direction.
     * Setting the this value equal to the {@link EllipseCurve#yRadius} will result in a circle.
     *
     * @type {number}
     * @default 1
     */
    xRadius: number;
    /**
     * The radius of the ellipse in the y direction.
     * Setting the this value equal to the {@link EllipseCurve#xRadius} will result in a circle.
     *
     * @type {number}
     * @default 1
     */
    yRadius: number;
    /**
     * The start angle of the curve in radians starting from the positive X axis.
     *
     * @type {number}
     * @default 0
     */
    aStartAngle: number;
    /**
     * The end angle of the curve in radians starting from the positive X axis.
     *
     * @type {number}
     * @default Math.PI*2
     */
    aEndAngle: number;
    /**
     * Whether the ellipse is drawn clockwise or not.
     *
     * @type {boolean}
     * @default false
     */
    aClockwise: boolean;
    /**
     * The rotation angle of the ellipse in radians, counterclockwise from the positive X axis.
     *
     * @type {number}
     * @default 0
     */
    aRotation: number;
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
