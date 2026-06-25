/**
 * Visualizes an object's vertex tangents.
 *
 * Requires that tangents have been specified in the geometry as a buffer attribute or
 * have been calculated using {@link BufferGeometry#computeTangents}.
 * ```js
 * const helper = new VertexTangentsHelper( mesh, 1, 0xff0000 );
 * scene.add( helper );
 * ```
 *
 * @augments LineSegments
 * @three_import import { VertexTangentsHelper } from 'three/addons/helpers/VertexTangentsHelper.js';
 */
export class VertexTangentsHelper extends LineSegments {
    /**
     * Constructs a new vertex tangents helper.
     *
     * @param {Object3D} object - The object for which to visualize vertex tangents.
     * @param {number} [size=1] - The helper's size.
     * @param {number|Color|string} [color=0xff0000] - The helper's color.
     */
    constructor(object: Object3D, size?: number, color?: number | Color | string);
    /**
     * The object for which to visualize vertex tangents.
     *
     * @type {Object3D}
     */
    object: Object3D;
    /**
     * The helper's size.
     *
     * @type {number}
     * @default 1
     */
    size: number;
    /**
     * Updates the vertex normals preview based on the object's world transform.
     */
    update(): void;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { LineSegments } from 'three';
