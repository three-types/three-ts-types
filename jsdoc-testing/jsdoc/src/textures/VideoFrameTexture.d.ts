/**
 * This class can be used as an alternative way to define video data. Instead of using
 * an instance of `HTMLVideoElement` like with `VideoTexture`, `VideoFrameTexture` expects each frame is
 * defined manually via {@link VideoFrameTexture#setFrame}. A typical use case for this module is when
 * video frames are decoded with the WebCodecs API.
 *
 * ```js
 * const texture = new THREE.VideoFrameTexture();
 * texture.setFrame( frame );
 * ```
 *
 * @augments VideoTexture
 */
export class VideoFrameTexture extends VideoTexture {
    /**
     * Constructs a new video frame texture.
     *
     * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
     * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
     * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
     * @param {number} [magFilter=LinearFilter] - The mag filter value.
     * @param {number} [minFilter=LinearFilter] - The min filter value.
     * @param {number} [format=RGBAFormat] - The texture format.
     * @param {number} [type=UnsignedByteType] - The texture type.
     * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
     */
    constructor(mapping?: number, wrapS?: number, wrapT?: number, magFilter?: number, minFilter?: number, format?: number, type?: number, anisotropy?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVideoFrameTexture: boolean;
    /**
     * Sets the current frame of the video. This will automatically update the texture
     * so the data can be used for rendering.
     *
     * @param {VideoFrame} frame - The video frame.
     */
    setFrame(frame: VideoFrame): void;
}
import { VideoTexture } from './VideoTexture.js';
