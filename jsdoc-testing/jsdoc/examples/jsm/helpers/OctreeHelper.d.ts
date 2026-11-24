/**
 * A helper for visualizing an Octree.
 *
 * ```js
 * const helper = new OctreeHelper( octree );
 * scene.add( helper );
 * ```
 *
 * @augments LineSegments
 * @three_import import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js';
 */
export class OctreeHelper extends LineSegments {
    /**
     * Constructs a new Octree helper.
     *
     * @param {Octree} octree - The octree to visualize.
     * @param {number|Color|string} [color=0xffff00] - The helper's color.
     */
    constructor(octree: Octree, color?: number | Color | string);
    /**
     * The octree to visualize.
     *
     * @type {Octree}
     */
    octree: Octree;
    /**
     * The helper's color.
     *
     * @type {number|Color|string}
     */
    color: number | Color | string;
    /**
     * Updates the helper. This method must be called whenever the Octree's
     * structure is changed.
     */
    update(): void;
}
import { LineSegments } from 'three';
