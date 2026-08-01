/**
 * This class can be used to modify a geometry by simplifying it. A typical use
 * case for such a modifier is automatic LOD generation.
 *
 * The implementation is based on [Progressive Mesh type Polygon Reduction Algorithm](https://web.archive.org/web/20230610044040/http://www.melax.com/polychop/)
 * by Stan Melax in 1998.
 *
 * ```js
 * const modifier = new SimplifyModifier();
 * geometry = modifier.modify( geometry );
 * ```
 *
 * @three_import import { SimplifyModifier } from 'three/addons/modifiers/SimplifyModifier.js';
 */
export class SimplifyModifier {
    /**
     * Returns a new, modified version of the given geometry by applying a simplification.
     * Please note that the resulting geometry is always non-indexed.
     *
     * @param {BufferGeometry} geometry - The geometry to modify.
     * @param {number} count - The number of vertices to remove.
     * @return {BufferGeometry} A new, modified geometry.
     */
    modify(geometry: BufferGeometry, count: number): BufferGeometry;
}
import { BufferGeometry } from 'three';
