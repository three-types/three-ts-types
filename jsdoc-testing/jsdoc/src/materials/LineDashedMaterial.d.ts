/**
 * A material for rendering dashed line primitives.
 *
 * Materials define the appearance of renderable 3D objects.
 *
 * The material requires the `lineDistance` attribute, so call
 * {@link Line#computeLineDistances} on the line. Otherwise, it renders solid.
 *
 * ```js
 * const material = new THREE.LineDashedMaterial( {
 * 	color: 0xffffff,
 * 	scale: 1,
 * 	dashSize: 3,
 * 	gapSize: 1,
 * } );
 *
 * const line = new THREE.Line( geometry, material );
 * line.computeLineDistances();
 * ```
 *
 * @augments LineBasicMaterial
 */
export class LineDashedMaterial extends LineBasicMaterial {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLineDashedMaterial: boolean;
    /**
     * Scales the line distances before dashing. Values greater than `1`
     * make dashes and gaps shorter.
     *
     * @type {number}
     * @default 1
     */
    scale: number;
    /**
     * The length of each dash.
     *
     * @type {number}
     * @default 3
     */
    dashSize: number;
    /**
     * The size of the gap.
     *
     * @type {number}
     * @default 1
     */
    gapSize: number;
    copy(source: any): this;
}
import { LineBasicMaterial } from './LineBasicMaterial.js';
