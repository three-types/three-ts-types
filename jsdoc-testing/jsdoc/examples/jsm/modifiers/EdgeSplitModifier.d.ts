/**
 * The modifier can be used to split faces at sharp edges. This allows to compute
 * normals without smoothing the edges which can lead to an improved visual result.
 *
 * ```js
 * const modifier = new EdgeSplitModifier();
 * geometry = modifier.modify( geometry, Math.PI * 0.4 );
 * ```
 *
 * @three_import import { EdgeSplitModifier } from 'three/addons/modifiers/EdgeSplitModifier.js';
 */
export class EdgeSplitModifier {
    /**
     * Returns a new, modified version of the given geometry by applying an edge-split operation.
     * Please note that the resulting geometry is always indexed.
     *
     * @param {BufferGeometry} geometry - The geometry to modify.
     * @param {number} cutOffAngle - The cut off angle in radians.
     * @param {boolean} [tryKeepNormals=true] - Whether to try to keep normals or not.
     * @return {BufferGeometry} A new, modified geometry.
     */
    modify(geometry: BufferGeometry, cutOffAngle: number, tryKeepNormals?: boolean): BufferGeometry;
}
import { BufferGeometry } from 'three';
