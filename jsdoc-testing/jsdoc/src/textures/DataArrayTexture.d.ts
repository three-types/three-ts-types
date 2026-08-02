/**
 * Creates an array of textures directly from raw buffer data.
 *
 * @augments Texture
 */
export class DataArrayTexture extends Texture {
    /**
     * Constructs a new data array texture.
     *
     * @param {?TypedArray} [data=null] - The buffer data.
     * @param {number} [width=1] - The width of the texture.
     * @param {number} [height=1] - The height of the texture.
     * @param {number} [depth=1] - The depth of the texture.
     */
    constructor(data?: TypedArray | null, width?: number, height?: number, depth?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isDataArrayTexture: boolean;
    /**
     * This defines how the texture is wrapped in the depth and corresponds to
     * *W* in UVW mapping.
     *
     * @type {(RepeatWrapping|ClampToEdgeWrapping|MirroredRepeatWrapping)}
     * @default ClampToEdgeWrapping
     */
    wrapR: (RepeatWrapping | number | MirroredRepeatWrapping);
    /**
     * A set of all layers which need to be updated in the texture.
     *
     * @type {Set<number>}
     */
    layerUpdates: Set<number>;
    /**
     * Describes that a specific layer of the texture needs to be updated.
     * Normally when {@link Texture#needsUpdate} is set to `true`, the
     * entire data texture array is sent to the GPU. Marking specific
     * layers will only transmit subsets of all mipmaps associated with a
     * specific depth in the array which is often much more performant.
     *
     * @param {number} layerIndex - The layer index that should be updated.
     */
    addLayerUpdate(layerIndex: number): void;
    /**
     * Resets the layer updates registry.
     */
    clearLayerUpdates(): void;
}
import { Texture } from './Texture.js';
