/**
 * Pass for creating a glitch effect.
 *
 * ```js
 * const glitchPass = new GlitchPass();
 * composer.addPass( glitchPass );
 * ```
 *
 * @augments Pass
 * @three_import import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
 */
export class GlitchPass extends Pass {
    /**
     * Constructs a new glitch pass.
     *
     * @param {number} [dt_size=64] - The size of the displacement texture
     * for digital glitch squares.
     */
    constructor(dt_size?: number);
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
    /**
     * Whether to noticeably increase the effect intensity or not.
     *
     * @type {boolean}
     * @default false
     */
    goWild: boolean;
    _heightMap: DataTexture;
    _fsQuad: FullScreenQuad;
    _curF: number;
    _randX: number;
    /**
     * Performs the glitch pass.
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
    _generateTrigger(): void;
    _generateHeightmap(dt_size: any): DataTexture;
}
import { Pass } from './Pass.js';
import { ShaderMaterial } from 'three';
import { DataTexture } from 'three';
import { FullScreenQuad } from './Pass.js';
