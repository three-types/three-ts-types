/**
 * A helper that can be used to display any type of texture for
 * debugging purposes. Depending on the type of texture (2D, 3D, Array),
 * the helper becomes a plane or box mesh.
 *
 * This helper can only be used with {@link WebGPURenderer}.
 * When using {@link WebGLRenderer}, import from `TextureHelper.js`.
 *
 * @private
 * @augments Mesh
 * @three_import import { TextureHelper } from 'three/addons/helpers/TextureHelperGPU.js';
 */
export class TextureHelper extends Mesh {
    /**
     * Constructs a new texture helper.
     *
     * @param {Texture} texture - The texture to visualize.
     * @param {number} [width=1] - The helper's width.
     * @param {number} [height=1] - The helper's height.
     * @param {number} [depth=1] - The helper's depth.
     */
    constructor(texture: Texture, width?: number, height?: number, depth?: number);
    /**
     * The texture to visualize.
     *
     * @type {Texture}
     */
    texture: Texture;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { Mesh } from 'three/webgpu';
