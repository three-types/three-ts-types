/**
 * A class for creating wireframes based on wide lines.
 *
 * This module can only be used with {@link WebGLRenderer}. When using {@link WebGPURenderer},
 * import the class from `lines/webgpu/Wireframe.js`.
 *
 * ```js
 * const geometry = new THREE.IcosahedronGeometry();
 * const wireframeGeometry = new WireframeGeometry2( geo );
 *
 * const wireframe = new Wireframe( wireframeGeometry, material );
 * scene.add( wireframe );
 * ```
 *
 * @augments Mesh
 * @three_import import { Wireframe } from 'three/addons/lines/Wireframe.js';
 */
export class Wireframe extends Mesh {
    /**
     * Constructs a new wireframe.
     *
     * @param {LineSegmentsGeometry} [geometry] - The line geometry.
     * @param {LineMaterial} [material] - The line material.
     */
    constructor(geometry?: LineSegmentsGeometry, material?: LineMaterial);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWireframe: boolean;
    /**
     * Computes an array of distance values which are necessary for rendering dashed lines.
     * For each vertex in the geometry, the method calculates the cumulative length from the
     * current point to the very beginning of the line.
     *
     * @return {Wireframe} A reference to this instance.
     */
    computeLineDistances(): Wireframe;
    onBeforeRender(renderer: any): void;
}
import { Mesh } from 'three';
import { LineSegmentsGeometry } from './LineSegmentsGeometry.js';
import { LineMaterial } from './LineMaterial.js';
