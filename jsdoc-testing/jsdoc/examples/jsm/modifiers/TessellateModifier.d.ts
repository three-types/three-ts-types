/**
 * This class can be used to modify a geometry by breaking its edges if they
 * are longer than maximum length.
 *
 * ```js
 * const modifier = new TessellateModifier( 8, 6 );
 * geometry = modifier.modify( geometry );
 * ```
 *
 * @three_import import { TessellateModifier } from 'three/addons/modifiers/TessellateModifier.js';
 */
export class TessellateModifier {
    /**
     * Constructs a new Tessellate modifier.
     *
     * @param {number} [maxEdgeLength=0.1] - The maximum edge length.
     * @param {number} [maxIterations=6] - The number of iterations.
     */
    constructor(maxEdgeLength?: number, maxIterations?: number);
    /**
     * The maximum edge length.
     *
     * @type {number}
     * @default 0.1
     */
    maxEdgeLength: number;
    /**
     * The maximum edge length.
     *
     * @type {number}
     * @default 0.1
     */
    maxIterations: number;
    /**
     * Returns a new, modified version of the given geometry by applying a tessellation.
     * Please note that the resulting geometry is always non-indexed.
     *
     * @param {BufferGeometry} geometry - The geometry to modify.
     * @return {BufferGeometry} A new, modified geometry.
     */
    modify(geometry: BufferGeometry): BufferGeometry;
}
import { BufferGeometry } from 'three';
