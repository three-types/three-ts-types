/**
 * A class for creating wireframes based on wide lines.
 *
 * This module can only be used with {@link WebGPURenderer}. When using {@link WebGLRenderer},
 * import the class from `lines/Wireframe.js`.
 *
 * @augments Mesh
 * @three_import import { Wireframe } from 'three/addons/lines/webgpu/Wireframe.js';
 */
export class Wireframe extends Mesh {
    /**
     * Constructs a new wireframe.
     *
     * @param {LineSegmentsGeometry} [geometry] - The line geometry.
     * @param {Line2NodeMaterial} [material] - The line material.
     */
    constructor(geometry?: LineSegmentsGeometry, material?: Line2NodeMaterial);
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
}
import { Mesh } from 'three/webgpu';
import { LineSegmentsGeometry } from '../LineSegmentsGeometry.js';
import { Line2NodeMaterial } from 'three/webgpu';
