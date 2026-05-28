/**
 * Represents a texture created externally with the same renderer context.
 *
 * This may be a texture from a protected media stream, device camera feed,
 * or other data feeds like a depth sensor.
 *
 * Note that this class is only supported in {@link WebGLRenderer}, and in
 * the {@link WebGPURenderer} WebGPU backend.
 *
 * @augments Texture
 */
export class ExternalTexture extends Texture {
    /**
     * Creates a new raw texture.
     *
     * @param {?(WebGLTexture|GPUTexture)} [sourceTexture=null] - The external texture.
     */
    constructor(sourceTexture?: (WebGLTexture | GPUTexture) | null);
    /**
     * The external source texture.
     *
     * @type {?(WebGLTexture|GPUTexture)}
     * @default null
     */
    sourceTexture: (WebGLTexture | GPUTexture) | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isExternalTexture: boolean;
    copy(source: any): this;
}
import { Texture } from './Texture.js';
