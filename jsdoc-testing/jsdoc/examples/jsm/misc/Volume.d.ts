/**
 * This class had been written to handle the output of the {@link NRRDLoader}.
 * It contains a volume of data and information about it. For now it only handles 3 dimensional data.
 *
 * @three_import import { Volume } from 'three/addons/misc/Volume.js';
 */
export class Volume {
    /**
     * Constructs a new volume.
     *
     * @param {number} [xLength] - Width of the volume.
     * @param {number} [yLength] - Length of the volume.
     * @param {number} [zLength] - Depth of the volume.
     * @param {string} [type] - The type of data (uint8, uint16, ...).
     * @param {ArrayBuffer} [arrayBuffer] - The buffer with volume data.
     */
    constructor(xLength?: number, yLength?: number, zLength?: number, type?: string, arrayBuffer?: ArrayBuffer);
    /**
     * Width of the volume in the IJK coordinate system.
     *
     * @type {number}
     * @default 1
     */
    xLength: number;
    /**
     * Height of the volume in the IJK coordinate system.
     *
     * @type {number}
     * @default 1
     */
    yLength: number;
    /**
     * Depth of the volume in the IJK coordinate system.
     *
     * @type {number}
     * @default 1
     */
    zLength: number;
    /**
     * The order of the Axis dictated by the NRRD header
     *
     * @type {Array<string>}
     */
    axisOrder: Array<string>;
    /**
     * The data of the volume.
     *
     * @type {TypedArray}
     */
    data: TypedArray;
    /**
     * Spacing to apply to the volume from IJK to RAS coordinate system
     *
     * @type {Array<number>}
     */
    spacing: Array<number>;
    /**
     * Offset of the volume in the RAS coordinate system
     *
     * @type {Array<number>}
     */
    offset: Array<number>;
    /**
     * The IJK to RAS matrix.
     *
     * @type {Martrix3}
     */
    matrix: Martrix3;
    /**
     * The RAS to IJK matrix.
     *
     * @type {Martrix3}
     */
    inverseMatrix: Martrix3;
    /**
     * The list of all the slices associated to this volume
     *
     * @type {Array<VolumeSlice>}
     */
    sliceList: Array<VolumeSlice>;
    /**
     * Whether to use segmentation mode or not.
     * It can load 16-bits nrrds correctly.
     *
     * @type {boolean}
     * @default false
     */
    segmentation: boolean;
    /**
     * This array holds the dimensions of the volume in the RAS space
     *
     * @type {Array<number>}
     */
    RASDimensions: Array<number>;
    /**
     * Shortcut for data[access(i,j,k)].
     *
     * @param {number} i - First coordinate.
     * @param {number} j - Second coordinate.
     * @param {number} k - Third coordinate.
     * @returns {number} The value in the data array.
     */
    getData(i: number, j: number, k: number): number;
    /**
     * Compute the index in the data array corresponding to the given coordinates in IJK system.
     *
     * @param {number} i - First coordinate.
     * @param {number} j - Second coordinate.
     * @param {number} k - Third coordinate.
     * @returns {number} The index.
     */
    access(i: number, j: number, k: number): number;
    /**
     * Retrieve the IJK coordinates of the voxel corresponding of the given index in the data.
     *
     * @param {number} index - Index of the voxel.
     * @returns {Array<number>} The IJK coordinates as `[x,y,z]`.
     */
    reverseAccess(index: number): Array<number>;
    /**
     * Apply a function to all the voxels, be careful, the value will be replaced.
     *
     * @param {Function} functionToMap A function to apply to every voxel, will be called with the following parameters:
     * value of the voxel, index of the voxel, the data (TypedArray).
     * @param {Object} context - You can specify a context in which call the function, default if this Volume.
     * @returns {Volume} A reference to this instance.
     */
    map(functionToMap: Function, context: Object): Volume;
    /**
     * Compute the orientation of the slice and returns all the information relative to the geometry such as sliceAccess,
     * the plane matrix (orientation and position in RAS coordinate) and the dimensions of the plane in both coordinate system.
     *
     * @param {('x'|'y'|'z')} axis - The normal axis to the slice.
     * @param {number} RASIndex - The index of the slice.
     * @returns {Object} An object containing all the useful information on the geometry of the slice.
     */
    extractPerpendicularPlane(axis: ("x" | "y" | "z"), RASIndex: number): Object;
    /**
     * Returns a slice corresponding to the given axis and index.
     * The coordinate are given in the Right Anterior Superior coordinate format.
     *
     * @param {('x'|'y'|'z')} axis - The normal axis to the slice.
     * @param {number} index - The index of the slice.
     * @returns {VolumeSlice} The extracted slice.
     */
    extractSlice(axis: ("x" | "y" | "z"), index: number): VolumeSlice;
    /**
     * Call repaint on all the slices extracted from this volume.
     *
     * @see {@link VolumeSlice#repaint}
     * @returns {Volume} A reference to this volume.
     */
    repaintAllSlices(): Volume;
    /**
     * Compute the minimum and the maximum of the data in the volume.
     *
     * @returns {Array<number>} The min/max data as `[min,max]`.
     */
    computeMinMax(): Array<number>;
    min: number | undefined;
    max: number | undefined;
}
import { VolumeSlice } from '../misc/VolumeSlice.js';
