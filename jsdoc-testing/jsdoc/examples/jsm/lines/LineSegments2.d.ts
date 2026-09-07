/**
 * A series of lines drawn between pairs of vertices.
 *
 * This adds functionality beyond {@link LineSegments}, like arbitrary line width and changing width
 * to be in world units. {@link Line2} extends this object, forming a polyline instead of individual
 * segments.
 *
 * This module can only be used with {@link WebGLRenderer}. When using {@link WebGPURenderer},
 * import the class from `lines/webgpu/LineSegments2.js`.
 *
 *  ```js
 * const geometry = new LineSegmentsGeometry();
 * geometry.setPositions( positions );
 * geometry.setColors( colors );
 *
 * const material = new LineMaterial( { linewidth: 5, vertexColors: true } };
 *
 * const lineSegments = new LineSegments2( geometry, material );
 * scene.add( lineSegments );
 * ```
 *
 * @augments Mesh
 * @three_import import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
 */
export class LineSegments2 extends Mesh {
    /**
     * Constructs a new wide line.
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
    readonly isLineSegments2: boolean;
    /**
     * Computes an array of distance values which are necessary for rendering dashed lines.
     * For each vertex in the geometry, the method calculates the cumulative length from the
     * current point to the very beginning of the line.
     *
     * @return {LineSegments2} A reference to this instance.
     */
    computeLineDistances(): LineSegments2;
    /**
     * Computes intersection points between a casted ray and this instance.
     *
     * @param {Raycaster} raycaster - The raycaster.
     * @param {Array<Object>} intersects - The target array that holds the intersection points.
     */
    raycast(raycaster: Raycaster, intersects: Array<Object>): void;
    onBeforeRender(renderer: any): void;
}
import { Mesh } from 'three';
import { LineSegmentsGeometry } from './LineSegmentsGeometry.js';
import { LineMaterial } from './LineMaterial.js';
