/**
 * A SAO implementation inspired from @bhouston previous SAO work.
 *
 * `SAOPass` provides better quality than {@link SSAOPass} but is also more expensive.
 *
 * ```js
 * const saoPass = new SAOPass( scene, camera );
 * composer.addPass( saoPass );
 * ```
 *
 * @augments Pass
 * @three_import import { SAOPass } from 'three/addons/postprocessing/SAOPass.js';
 */
export class SAOPass extends Pass {
    /**
     * Constructs a new SAO pass.
     *
     * @param {Scene} scene - The scene to compute the AO for.
     * @param {Camera} camera - The camera.
     * @param {Vector2} [resolution] - The effect's resolution.
     */
    constructor(scene: Scene, camera: Camera, resolution?: Vector2);
    /**
     * The scene to render the AO for.
     *
     * @type {Scene}
     */
    scene: Scene;
    /**
     * The camera.
     *
     * @type {Camera}
     */
    camera: Camera;
    _originalClearColor: Color;
    _oldClearColor: Color;
    _oldClearAlpha: number;
    /**
     * The SAO parameter.
     *
     * @type {Object}
     */
    params: Object;
    /**
     * The effect's resolution.
     *
     * @type {Vector2}
     * @default (256,256)
     */
    resolution: Vector2;
    saoRenderTarget: WebGLRenderTarget;
    blurIntermediateRenderTarget: import("three").RenderTarget;
    normalRenderTarget: WebGLRenderTarget;
    normalMaterial: MeshNormalMaterial;
    saoMaterial: ShaderMaterial;
    vBlurMaterial: ShaderMaterial;
    hBlurMaterial: ShaderMaterial;
    materialCopy: ShaderMaterial;
    fsQuad: FullScreenQuad;
    /**
     * Performs the SAO pass.
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
    prevStdDev: any;
    prevNumSamples: any;
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
    _renderPass(renderer: any, passMaterial: any, renderTarget: any, clearColor: any, clearAlpha: any): void;
    _renderOverride(renderer: any, overrideMaterial: any, renderTarget: any, clearColor: any, clearAlpha: any): void;
}
export namespace SAOPass {
    namespace OUTPUT {
        let Default: number;
        let SAO: number;
        let Normal: number;
    }
}
import { Pass } from './Pass.js';
import { Color } from 'three';
import { Vector2 } from 'three';
import { WebGLRenderTarget } from 'three';
import { MeshNormalMaterial } from 'three';
import { ShaderMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
