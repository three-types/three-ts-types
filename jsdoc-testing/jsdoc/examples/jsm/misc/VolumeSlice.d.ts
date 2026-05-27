/**
 * This class has been made to hold a slice of a volume data.
 *
 * @see {@link Volume}
 * @three_import import { VolumeSlice } from 'three/addons/misc/VolumeSlice.js';
 */
export class VolumeSlice {
    /**
     * Constructs a new volume slice.
     *
     * @param {Volume} volume - The associated volume.
     * @param {number} [index=0] - The index of the slice.
     * @param {('x'|'y'|'z')} [axis='z'] - For now only 'x', 'y' or 'z' but later it will change to a normal vector.
     */
    constructor(volume: Volume, index?: number, axis?: ("x" | "y" | "z"));
    /**
     * The associated volume.
     *
     * @type {Volume}
     */
    volume: Volume;
    /**
     * The normal axis.
     *
     * @type {('x'|'y'|'z')}
     */
    axis: ("x" | "y" | "z");
    /**
     * The final canvas used for the texture.
     *
     * @type {HTMLCanvasElement}
     */
    canvas: HTMLCanvasElement;
    /**
     * The rendering context of the canvas.
     *
     * @type {CanvasRenderingContext2D}
     */
    ctx: CanvasRenderingContext2D;
    /**
     * The intermediary canvas used to paint the data.
     *
     * @type {HTMLCanvasElement}
     */
    canvasBuffer: HTMLCanvasElement;
    /**
     * The rendering context of the canvas buffer,
     *
     * @type {CanvasRenderingContext2D}
     */
    ctxBuffer: CanvasRenderingContext2D;
    /**
     * The mesh ready to get used in the scene.
     *
     * @type {Mesh}
     */
    mesh: Mesh;
    /**
     * If set to `true`, `updateGeometry()` will be triggered at the next repaint.
     *
     * @type {boolean}
     * @default true
     */
    geometryNeedsUpdate: boolean;
    /**
     * Width of slice in the original coordinate system, corresponds to the width of the buffer canvas.
     *
     * @type {number}
     * @default 0
     */
    iLength: number;
    /**
     * Height of slice in the original coordinate system, corresponds to the height of the buffer canvas.
     *
     * @type {number}
     * @default 0
     */
    jLength: number;
    /**
     * Function that allow the slice to access right data.
     *
     * @type {?Function}
     * @see {@link Volume#extractPerpendicularPlane}
     */
    sliceAccess: Function | null;
    /**
     * Refresh the texture and the geometry if geometryNeedsUpdate is set to `true`.
     */
    repaint(): void;
    /**
     * Refresh the geometry according to axis and index.
     * @see {@link Volume#extractPerpendicularPlane}
     */
    updateGeometry(): void;
    matrix: any;
    geometry: PlaneGeometry | undefined;
}
import { Mesh } from 'three';
import { PlaneGeometry } from 'three';
