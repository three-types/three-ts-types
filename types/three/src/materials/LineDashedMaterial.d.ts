import { LineBasicMaterial, LineBasicMaterialProperties } from "./LineBasicMaterial.js";
import { MapColorPropertiesToColorRepresentations } from "./Material.js";

export interface LineDashedMaterialProperties extends LineBasicMaterialProperties {
    /**
     * Scales the line distances before dashing. Values greater than `1`
     * make dashes and gaps shorter.
     *
     * @default 1
     */
    scale: number;
    /**
     * The length of each dash.
     *
     * @default 3
     */
    dashSize: number;
    /**
     * The size of the gap.
     *
     * @default 1
     */
    gapSize: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LineDashedMaterialParameters
    extends Partial<MapColorPropertiesToColorRepresentations<LineDashedMaterialProperties>>
{}

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
 */
export class LineDashedMaterial extends LineBasicMaterial {
    constructor(parameters?: LineDashedMaterialParameters);
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isLineDashedMaterial: boolean;
    setValues(values?: LineDashedMaterialParameters): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LineDashedMaterial extends LineDashedMaterialProperties {}
