/**
 * A continuous line. This is nearly the same as {@link Line} the only difference
 * is that the last vertex is connected with the first vertex in order to close
 * the line to form a loop.
 *
 * @augments Line
 */
export class LineLoop extends Line {
    /**
     * Constructs a new line loop.
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
    readonly isLineLoop: boolean;
}
import { Line } from './Line.js';
