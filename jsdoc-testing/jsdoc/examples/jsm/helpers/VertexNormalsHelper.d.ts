/**
 * Visualizes an object's vertex normals.
 *
 * Requires that normals have been specified in the geometry as a buffer attribute or
 * have been calculated using {@link BufferGeometry#computeVertexNormals}.
 * ```js
 * const geometry = new THREE.BoxGeometry( 10, 10, 10, 2, 2, 2 );
 * const material = new THREE.MeshStandardMaterial();
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 *
 * const helper = new VertexNormalsHelper( mesh, 1, 0xff0000 );
 * scene.add( helper );
 * ```
 *
 * @augments LineSegments
 * @three_import import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
 */
export class VertexNormalsHelper extends LineSegments {
    /**
     * Constructs a new vertex normals helper.
     *
     * @param {Object3D} object - The object for which to visualize vertex normals.
     * @param {number} [size=1] - The helper's size.
     * @param {number|Color|string} [color=0xff0000] - The helper's color.
     */
    constructor(object: Object3D, size?: number, color?: number | Color | string);
    /**
     * The object for which to visualize vertex normals.
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
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVertexNormalsHelper: boolean;
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
