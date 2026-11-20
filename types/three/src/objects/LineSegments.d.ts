import { BufferGeometry } from "../core/BufferGeometry.js";
import { Object3DEventMap } from "../core/Object3D.js";
import { Material } from "../materials/Material.js";
import { Line } from "./Line.js";

/**
 * A series of lines drawn between pairs of vertices.
 *
 * @augments Line
 */
export class LineSegments<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
    TEventMap extends Object3DEventMap = Object3DEventMap,
> extends Line<TGeometry, TMaterial, TEventMap> {
    /**
     * Constructs a new line segments.
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
    readonly isLineSegments: true;
    computeLineDistances(): this;
}
