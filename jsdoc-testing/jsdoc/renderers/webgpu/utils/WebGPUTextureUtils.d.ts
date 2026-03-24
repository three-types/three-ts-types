/**
 * Returns the GPU format for the given texture.
 *
 * @param {Texture} texture - The texture.
 * @param {?GPUDevice} [device=null] - The GPU device which is used for feature detection.
 * It is not necessary to apply the device for most formats.
 * @return {string} The GPU format.
 */
export function getFormat(texture: Texture, device?: GPUDevice | null): string;
export default WebGPUTextureUtils;
import { Texture } from '../../../textures/Texture.js';
/**
 * A WebGPU backend utility module for managing textures.
 *
 * @private
 */
declare class WebGPUTextureUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGPUBackend} backend - The WebGPU backend.
     */
    constructor(backend: WebGPUBackend);
    /**
     * A reference to the WebGPU backend.
     *
     * @type {WebGPUBackend}
     */
    backend: WebGPUBackend;
    /**
     * A reference to the pass utils.
     *
     * @type {?WebGPUTexturePassUtils}
     * @default null
     */
    _passUtils: WebGPUTexturePassUtils | null;
    /**
     * A dictionary for managing default textures. The key
     * is the texture format, the value the texture object.
     *
     * @type {Object<string,Texture>}
     */
    defaultTexture: {
        [x: string]: Texture;
    };
    /**
     * A dictionary for managing default cube textures. The key
     * is the texture format, the value the texture object.
     *
     * @type {Object<string,CubeTexture>}
     */
    defaultCubeTexture: {
        [x: string]: CubeTexture;
    };
    /**
     * A default video frame.
     *
     * @type {?VideoFrame}
     * @default null
     */
    defaultVideoFrame: VideoFrame | null;
    /**
     * A cache of shared texture samplers.
     *
     * @type {Map<string, Object>}
     */
    _samplerCache: Map<string, Object>;
    /**
     * Creates a GPU sampler for the given texture.
     *
     * @param {Texture} texture - The texture to create the sampler for.
     * @return {string} The current sampler key.
     */
    updateSampler(texture: Texture): string;
    /**
     * Creates a default texture for the given texture that can be used
     * as a placeholder until the actual texture is ready for usage.
     *
     * @param {Texture} texture - The texture to create a default texture for.
     */
    createDefaultTexture(texture: Texture): void;
    /**
     * Defines a texture on the GPU for the given texture object.
     *
     * @param {Texture} texture - The texture.
     * @param {Object} [options={}] - Optional configuration parameter.
     */
    createTexture(texture: Texture, options?: Object): void;
    /**
     * Destroys the GPU data for the given texture object.
     *
     * @param {Texture} texture - The texture.
     * @param {boolean} [isDefaultTexture=false] - Whether the texture uses a default GPU texture or not.
     */
    destroyTexture(texture: Texture, isDefaultTexture?: boolean): void;
    /**
     * Generates mipmaps for the given texture.
     *
     * @param {Texture} texture - The texture.
     * @param {?GPUCommandEncoder} [encoder=null] - An optional command encoder used to generate mipmaps.
     */
    generateMipmaps(texture: Texture, encoder?: GPUCommandEncoder | null): void;
    /**
     * Returns the color buffer representing the color
     * attachment of the default framebuffer.
     *
     * @return {GPUTexture} The color buffer.
     */
    getColorBuffer(): GPUTexture;
    /**
     * Returns the depth buffer representing the depth
     * attachment of the default framebuffer.
     *
     * @param {boolean} [depth=true] - Whether depth is enabled or not.
     * @param {boolean} [stencil=false] -  Whether stencil is enabled or not.
     * @return {GPUTexture} The depth buffer.
     */
    getDepthBuffer(depth?: boolean, stencil?: boolean): GPUTexture;
    /**
     * Uploads the updated texture data to the GPU.
     *
     * @param {Texture} texture - The texture.
     * @param {Object} [options={}] - Optional configuration parameter.
     */
    updateTexture(texture: Texture, options?: Object): void;
    /**
     * Returns texture data as a typed array.
     *
     * @async
     * @param {Texture} texture - The texture to copy.
     * @param {number} x - The x coordinate of the copy origin.
     * @param {number} y - The y coordinate of the copy origin.
     * @param {number} width - The width of the copy.
     * @param {number} height - The height of the copy.
     * @param {number} faceIndex - The face index.
     * @return {Promise<TypedArray>} A Promise that resolves with a typed array when the copy operation has finished.
     */
    copyTextureToBuffer(texture: Texture, x: number, y: number, width: number, height: number, faceIndex: number): Promise<TypedArray>;
    /**
     * Frees all internal resources.
     */
    dispose(): void;
    /**
     * Returns the default GPU texture for the given format.
     *
     * @private
     * @param {string} format - The GPU format.
     * @return {GPUTexture} The GPU texture.
     */
    private _getDefaultTextureGPU;
    /**
     * Returns the default GPU cube texture for the given format.
     *
     * @private
     * @param {string} format - The GPU format.
     * @return {GPUTexture} The GPU texture.
     */
    private _getDefaultCubeTextureGPU;
    /**
     * Uploads cube texture image data to the GPU memory.
     *
     * @private
     * @param {CubeTexture} texture - The cube texture.
     * @param {GPUTexture} textureGPU - The GPU texture.
     * @param {Object} textureDescriptorGPU - The GPU texture descriptor.
     */
    private _copyCubeMapToTexture;
    /**
     * Uploads texture image data to the GPU memory.
     *
     * @private
     * @param {HTMLImageElement|ImageBitmap|HTMLCanvasElement} image - The image data.
     * @param {GPUTexture} textureGPU - The GPU texture.
     * @param {Object} textureDescriptorGPU - The GPU texture descriptor.
     * @param {number} originDepth - The origin depth.
     * @param {boolean} flipY - Whether to flip texture data along their vertical axis or not.
     * @param {boolean} premultiplyAlpha - Whether the texture should have its RGB channels premultiplied by the alpha channel or not.
     * @param {number} [mipLevel=0] - The mip level where the data should be copied to.
     */
    private _copyImageToTexture;
    /**
     * Returns the pass utils singleton.
     *
     * @private
     * @return {WebGPUTexturePassUtils} The utils instance.
     */
    private _getPassUtils;
    /**
     * Generates mipmaps for the given GPU texture.
     *
     * @private
     * @param {GPUTexture} textureGPU - The GPU texture object.
     * @param {?GPUCommandEncoder} [encoder=null] - An optional command encoder used to generate mipmaps.
     */
    private _generateMipmaps;
    /**
     * Flip the contents of the given GPU texture along its vertical axis.
     *
     * @private
     * @param {GPUTexture} textureGPU - The GPU texture object.
     * @param {Object} textureDescriptorGPU - The texture descriptor.
     * @param {number} [originDepth=0] - The origin depth.
     */
    private _flipY;
    /**
     * Uploads texture buffer data to the GPU memory.
     *
     * @private
     * @param {Object} image - An object defining the image buffer data.
     * @param {GPUTexture} textureGPU - The GPU texture.
     * @param {Object} textureDescriptorGPU - The GPU texture descriptor.
     * @param {number} originDepth - The origin depth.
     * @param {boolean} flipY - Whether to flip texture data along their vertical axis or not.
     * @param {number} [depth=0] - The depth offset when copying array or 3D texture data.
     * @param {number} [mipLevel=0] - The mip level where the data should be copied to.
     */
    private _copyBufferToTexture;
    /**
     * Uploads compressed texture data to the GPU memory.
     *
     * @private
     * @param {Array<Object>} mipmaps - An array with mipmap data.
     * @param {GPUTexture} textureGPU - The GPU texture.
     * @param {Object} textureDescriptorGPU - The GPU texture descriptor.
     */
    private _copyCompressedBufferToTexture;
    /**
     * This method is only relevant for compressed texture formats. It returns a block
     * data descriptor for the given GPU compressed texture format.
     *
     * @private
     * @param {string} format - The GPU compressed texture format.
     * @return {Object} The block data descriptor.
     */
    private _getBlockData;
    /**
     * Converts the three.js uv wrapping constants to GPU address mode constants.
     *
     * @private
     * @param {number} value - The three.js constant defining a uv wrapping mode.
     * @return {string} The GPU address mode.
     */
    private _convertAddressMode;
    /**
     * Converts the three.js filter constants to GPU filter constants.
     *
     * @private
     * @param {number} value - The three.js constant defining a filter mode.
     * @return {string} The GPU filter mode.
     */
    private _convertFilterMode;
    /**
     * Returns the bytes-per-texel value for the given GPU texture format.
     *
     * @private
     * @param {string} format - The GPU texture format.
     * @return {number} The bytes-per-texel.
     */
    private _getBytesPerTexel;
    /**
     * Returns the corresponding typed array type for the given GPU texture format.
     *
     * @private
     * @param {string} format - The GPU texture format.
     * @return {TypedArray.constructor} The typed array type.
     */
    private _getTypedArrayType;
    /**
     * Returns the GPU dimensions for the given texture.
     *
     * @private
     * @param {Texture} texture - The texture.
     * @return {string} The GPU dimension.
     */
    private _getDimension;
}
import WebGPUTexturePassUtils from './WebGPUTexturePassUtils.js';
import { CubeTexture } from '../../../textures/CubeTexture.js';
