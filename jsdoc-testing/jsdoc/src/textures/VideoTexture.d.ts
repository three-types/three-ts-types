/**
 * A texture for use with a video.
 *
 * ```js
 * // assuming you have created a HTML video element with id="video"
 * const video = document.getElementById( 'video' );
 * const texture = new THREE.VideoTexture( video );
 * ```
 *
 * Note: When using video textures with {@link WebGPURenderer}, {@link Texture#colorSpace} must be
 * set to THREE.SRGBColorSpace.
 *
 * Note: After the initial use of a texture, its dimensions, format, and type
 * cannot be changed. Instead, call {@link Texture#dispose} on the texture and instantiate a new one.
 *
 * @augments Texture
 */
export class VideoTexture extends Texture {
    /**
     * Constructs a new video texture.
     *
     * @param {HTMLVideoElement} video - The video element to use as a data source for the texture.
     * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
     * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
     * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
     * @param {number} [magFilter=LinearFilter] - The mag filter value.
     * @param {number} [minFilter=LinearFilter] - The min filter value.
     * @param {number} [format=RGBAFormat] - The texture format.
     * @param {number} [type=UnsignedByteType] - The texture type.
     * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
     */
    constructor(video: HTMLVideoElement, mapping?: number, wrapS?: number, wrapT?: number, magFilter?: number, minFilter?: number, format?: number, type?: number, anisotropy?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVideoTexture: boolean;
    /**
     * The video frame request callback identifier, which is a positive integer.
     *
     * Value of 0 represents no scheduled rVFC.
     *
     * @private
     * @type {number}
     */
    private _requestVideoFrameCallbackId;
    clone(): any;
    /**
     * This method is called automatically by the renderer and sets {@link Texture#needsUpdate}
     * to `true` every time a new frame is available.
     *
     * Only relevant if `requestVideoFrameCallback` is not supported in the browser.
     */
    update(): void;
}
import { Texture } from './Texture.js';
