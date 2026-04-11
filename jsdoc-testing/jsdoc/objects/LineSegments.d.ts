/**
 * A series of lines drawn between pairs of vertices.
 *
 * @augments Line
 */
export class LineSegments extends Line {
    /**
     * Constructs a new line segments.
     *
     * @param {BufferGeometry} [geometry] - The line geometry.
     * @param {Material|Array<Material>} [material] - The line material.
     */
    constructor(geometry?: BufferGeometry, material?: Material | Array<Material>);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLineSegments: boolean;
    computeLineDistances(): this;
}
import { Line } from './Line.js';
