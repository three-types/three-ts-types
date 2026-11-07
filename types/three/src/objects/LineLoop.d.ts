import { BufferGeometry } from "../core/BufferGeometry.js";
import { Object3DEventMap } from "../core/Object3D.js";
import { Material } from "../materials/Material.js";
import { Line } from "./Line.js";

/**
 * A continuous line. This is nearly the same as {@link Line} the only difference
 * is that the last vertex is connected with the first vertex in order to close
 * the line to form a loop.
 *
 * @augments Line
 */
export class LineLoop<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
    TEventMap extends Object3DEventMap = Object3DEventMap,
> extends Line<TGeometry, TMaterial, TEventMap> {
    /**
     * Constructs a new line loop.
     *
     * @param {BufferGeometry} [geometry] - The line geometry.
     * @param {Material|Array<Material>} [material] - The line material.
     */
    constructor(geometry?: TGeometry, material?: TMaterial);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLineLoop: true;
}
