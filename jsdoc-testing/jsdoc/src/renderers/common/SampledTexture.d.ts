/**
 * Represents a sampled texture binding type.
 *
 * @private
 * @augments Sampler
 */
export class SampledTexture extends Sampler {
    /**
     * This identifier.
     *
     * @type {number}
     */
    id: number;
    /**
     * Whether the texture is a storage texture or not.
     *
     * @type {boolean}
     * @default false
     */
    store: boolean;
    /**
     * The mip level to bind for storage textures.
     *
     * @type {number}
     * @default 0
     */
    mipLevel: number;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSampledTexture: boolean;
}
/**
 * Represents a sampled array texture binding type.
 *
 * @private
 * @augments SampledTexture
 */
export class SampledArrayTexture extends SampledTexture {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSampledArrayTexture: boolean;
}
/**
 * Represents a sampled 3D texture binding type.
 *
 * @private
 * @augments SampledTexture
 */
export class Sampled3DTexture extends SampledTexture {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSampled3DTexture: boolean;
}
/**
 * Represents a sampled cube texture binding type.
 *
 * @private
 * @augments SampledTexture
 */
export class SampledCubeTexture extends SampledTexture {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSampledCubeTexture: boolean;
}
import Sampler from './Sampler.js';
