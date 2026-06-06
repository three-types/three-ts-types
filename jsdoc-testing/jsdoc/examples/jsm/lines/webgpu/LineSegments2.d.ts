/**
 * A series of lines drawn between pairs of vertices.
 *
 * This adds functionality beyond {@link LineSegments}, like arbitrary line width and changing width
 * to be in world units. {@link Line2} extends this object, forming a polyline instead of individual
 * segments.
 *
 * This module can only be used with {@link WebGPURenderer}. When using {@link WebGLRenderer},
 * import the class from `lines/LineSegments2.js`.
 *
 * @augments Mesh
 * @three_import import { LineSegments2 } from 'three/addons/lines/webgpu/LineSegments2.js';
 */
export class LineSegments2 extends Mesh {
    /**
     * Constructs a new wide line.
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
    readonly isLineSegments2: boolean;
    _resolution: Vector2;
    /**
     * Computes an array of distance values which are necessary for rendering dashed lines.
     * For each vertex in the geometry, the method calculates the cumulative length from the
     * current point to the very beginning of the line.
     *
     * @return {LineSegments2} A reference to this instance.
     */
    computeLineDistances(): LineSegments2;
    onBeforeRender(renderer: any): void;
    /**
     * Computes intersection points between a casted ray and this instance.
     *
     * @param {Raycaster} raycaster - The raycaster.
     * @param {Array<Object>} intersects - The target array that holds the intersection points.
     */
    raycast(raycaster: Raycaster, intersects: Array<Object>): void;
}
import { Mesh } from 'three/webgpu';
import { Vector2 } from 'three/webgpu';
import { LineSegmentsGeometry } from '../LineSegmentsGeometry.js';
import { Line2NodeMaterial } from 'three/webgpu';
