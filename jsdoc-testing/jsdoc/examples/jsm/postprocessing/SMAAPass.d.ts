/**
 * A pass for applying SMAA. Unlike {@link FXAAPass}, `SMAAPass` operates in
 * `linear-srgb` so this pass must be executed before {@link OutputPass}.
 *
 * ```js
 * const smaaPass = new SMAAPass();
 * composer.addPass( smaaPass );
 * ```
 *
 * @augments Pass
 * @three_import import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
 */
export class SMAAPass extends Pass {
    _edgesRT: WebGLRenderTarget;
    _weightsRT: WebGLRenderTarget;
    _areaTexture: Texture;
    _searchTexture: Texture;
    _uniformsEdges: Object;
    _materialEdges: ShaderMaterial;
    _uniformsWeights: Object;
    _materialWeights: ShaderMaterial;
    _uniformsBlend: Object;
    _materialBlend: ShaderMaterial;
    _fsQuad: FullScreenQuad;
    /**
     * Performs the SMAA pass.
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
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
    _getAreaTexture(): string;
    _getSearchTexture(): string;
}
import { Pass } from './Pass.js';
import { WebGLRenderTarget } from 'three';
import { Texture } from 'three';
import { ShaderMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
