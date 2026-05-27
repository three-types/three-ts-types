export default Sampler;
/**
 * Represents a sampler binding type.
 *
 * @private
 * @augments Binding
 */
declare class Sampler extends Binding {
    /**
     * Constructs a new sampler.
     *
     * @param {string} name - The samplers's name.
     * @param {?Texture} texture - The texture this binding is referring to.
     */
    constructor(name: string, texture: Texture | null);
    /**
     * The texture the sampler is referring to.
     *
     * @private
     * @type {?Texture}
     */
    private _texture;
    /**
     * An event listener which is added to {@link texture}'s dispose event.
     *
     * @private
     * @type {Function}
     */
    private _onTextureDispose;
    generation: number | null;
    version: number;
    /**
     * Sets the texture of this sampler.
     *
     * @param {Texture} value - The texture to set.
     */
    set texture(value: Texture);
    /**
     * Gets the texture of this sampler.
     * @return {?Texture} The texture.
     */
    get texture(): Texture | null;
    /**
     * The binding's sampler key.
     *
     * @type {string}
     * @default ''
     */
    samplerKey: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSampler: boolean;
    /**
     * Updates the binding.
     *
     * @return {boolean} Whether the texture has been updated and must be
     * uploaded to the GPU.
     */
    update(): boolean;
}
import Binding from './Binding.js';
