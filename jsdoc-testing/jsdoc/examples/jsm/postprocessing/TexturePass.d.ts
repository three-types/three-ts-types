/**
 * This pass can be used to render a texture over the entire screen.
 *
 * ```js
 * const texture = new THREE.TextureLoader().load( 'textures/2294472375_24a3b8ef46_o.jpg' );
 * texture.colorSpace = THREE.SRGBColorSpace;
 *
 * const texturePass = new TexturePass( texture );
 * composer.addPass( texturePass );
 * ```
 *
 * @augments Pass
 * @three_import import { TexturePass } from 'three/addons/postprocessing/TexturePass.js';
 */
export class TexturePass extends Pass {
    /**
     * Constructs a new texture pass.
     *
     * @param {Texture} map - The texture to render.
     * @param {number} [opacity=1] - The opacity.
     */
    constructor(map: Texture, opacity?: number);
    /**
     * The texture to render.
     *
     * @type {Texture}
     */
    map: Texture;
    /**
     * The opacity.
     *
     * @type {number}
     * @default 1
     */
    opacity: number;
    /**
     * The pass uniforms.
     *
     * @type {Object}
     */
    uniforms: Object;
    /**
     * The pass material.
     *
     * @type {ShaderMaterial}
     */
    material: ShaderMaterial;
    _fsQuad: FullScreenQuad;
    /**
     * Performs the texture pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget): void;
}
import { Pass } from './Pass.js';
import { ShaderMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
