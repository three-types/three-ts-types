/**
 * This class can be used to modify a geometry by simplifying it. A typical use
 * case for such a modifier is automatic LOD generation.
 *
 * The implementation is based on [meshoptimizer]{@link https://github.com/zeux/meshoptimizer}.
 * If you only need a simplified index buffer, use {@link MeshoptSimplifier} directly.
 *
 * ```js
 * const modifier = new SimplifyModifier();
 * geometry = await modifier.modify( geometry, count );
 * ```
 *
 * @three_import import { SimplifyModifier } from 'three/addons/modifiers/SimplifyModifier.js';
 */
export class SimplifyModifier {
    /**
     * Returns a new, simplified version of the given geometry. The vertex buffers
     * of the result only contain vertices referenced by the simplified index.
     *
     * @async
     * @param {BufferGeometry} geometry - The geometry to modify.
     * @param {number} count - The approximate number of vertices to remove.
     * @return {Promise<BufferGeometry>} A promise that resolves with the new, modified geometry.
     */
    modify(geometry: BufferGeometry, count: number): Promise<BufferGeometry>;
}
import { BufferGeometry } from 'three';
