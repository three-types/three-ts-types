/**
 * A material for rendering line primitives.
 *
 * Materials define the appearance of renderable 3D objects.
 *
 * ```js
 * const material = new THREE.LineDashedMaterial( {
 * 	color: 0xffffff,
 * 	scale: 1,
 * 	dashSize: 3,
 * 	gapSize: 1,
 * } );
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
     * The scale of the dashed part of a line.
     *
     * @type {number}
     * @default 1
     */
    scale: number;
    /**
     * The size of the dash. This is both the gap with the stroke.
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
