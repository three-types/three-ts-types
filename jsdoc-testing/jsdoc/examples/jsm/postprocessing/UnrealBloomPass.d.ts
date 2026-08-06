/**
 * This pass is inspired by the bloom pass of Unreal Engine. It creates a
 * mip map chain of bloom textures and blurs them with different radii. Because
 * of the weighted combination of mips, and because larger blurs are done on
 * higher mips, this effect provides good quality and performance.
 *
 * When using this pass, tone mapping must be enabled in the renderer settings.
 *
 * Reference:
 * - [Bloom in Unreal Engine](https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/Bloom/)
 *
 * ```js
 * const resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );
 * const bloomPass = new UnrealBloomPass( resolution, 1.5, 0.4, 0.85 );
 * composer.addPass( bloomPass );
 * ```
 *
 * @augments Pass
 * @three_import import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
 */
export class UnrealBloomPass extends Pass {
    /**
     * Constructs a new Unreal Bloom pass.
     *
     * @param {Vector2} [resolution] - The effect's resolution.
     * @param {number} [strength=1] - The Bloom strength.
     * @param {number} radius - The Bloom radius.
     * @param {number} threshold - The luminance threshold limits which bright areas contribute to the Bloom effect.
     */
    constructor(resolution?: Vector2, strength?: number, radius: number, threshold: number);
    /**
     * The Bloom strength.
     *
     * @type {number}
     * @default 1
     */
    strength: number;
    /**
     * The Bloom radius. Must be in the range `[0,1]`.
     *
     * @type {number}
     */
    radius: number;
    /**
     * The luminance threshold limits which bright areas contribute to the Bloom effect.
     *
     * @type {number}
     */
    threshold: number;
    /**
     * The effect's resolution.
     *
     * @type {Vector2}
     * @default (256,256)
     */
    resolution: Vector2;
    /**
     * The effect's clear color
     *
     * @type {Color}
     * @default (0,0,0)
     */
    clearColor: Color;
    renderTargetsHorizontal: WebGLRenderTarget[];
    renderTargetsVertical: WebGLRenderTarget[];
    nMips: number;
    renderTargetBright: WebGLRenderTarget;
    highPassUniforms: Object;
    materialHighPassFilter: ShaderMaterial;
    separableBlurMaterials: ShaderMaterial[];
    compositeMaterial: ShaderMaterial;
    bloomTintColors: Vector3[];
    copyUniforms: Object;
    blendMaterial: ShaderMaterial;
    _oldClearColor: Color;
    _oldClearAlpha: number;
    _basic: MeshBasicMaterial;
    _fsQuad: FullScreenQuad;
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
    /**
     * Performs the Bloom pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
    _getSeparableBlurMaterial(kernelRadius: any): ShaderMaterial;
    _getCompositeMaterial(nMips: any): ShaderMaterial;
}
export namespace UnrealBloomPass {
    let BlurDirectionX: Vector2;
    let BlurDirectionY: Vector2;
}
import { Pass } from './Pass.js';
import { Vector2 } from 'three';
import { Color } from 'three';
import { WebGLRenderTarget } from 'three';
import { ShaderMaterial } from 'three';
import { Vector3 } from 'three';
import { MeshBasicMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
