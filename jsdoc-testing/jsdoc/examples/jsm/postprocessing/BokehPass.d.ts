/**
 * ~Options
 */
export type BokehPass = {
    /**
     * - Defines the effect's focus which is the distance along the camera's look direction in world units.
     */
    focus?: number | undefined;
    /**
     * - Defines the effect's aperture.
     */
    aperture?: number | undefined;
    /**
     * - Defines the effect's maximum blur.
     */
    maxblur?: number | undefined;
};
/**
 * Pass for creating depth of field (DOF) effect.
 *
 * ```js
 * const bokehPass = new BokehPass( scene, camera, {
 * 	focus: 500
 * 	aperture: 5,
 * 	maxblur: 0.01
 * } );
 * composer.addPass( bokehPass );
 * ```
 *
 * @augments Pass
 * @three_import import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
 */
export class BokehPass extends Pass {
    /**
     * Constructs a new Bokeh pass.
     *
     * @param {Scene} scene - The scene to render the DOF for.
     * @param {Camera} camera - The camera.
     * @param {BokehPass~Options} params - The pass options.
     */
    constructor(scene: Scene, camera: Camera, params: any);
    /**
     * The scene to render the DOF for.
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
    _renderTargetDepth: WebGLRenderTarget;
    _materialDepth: MeshDepthMaterial;
    /**
     * The pass bokeh material.
     *
     * @type {ShaderMaterial}
     */
    materialBokeh: ShaderMaterial;
    /**
     * The pass uniforms.  Use this object if you want to update the
     * `focus`, `aperture` or `maxblur` values at runtime.
     *
     * ```js
     * pass.uniforms.focus.value = focus;
     * pass.uniforms.aperture.value = aperture;
     * pass.uniforms.maxblur.value = maxblur;
     * ```
     *
     * @type {Object}
     */
    uniforms: Object;
    _fsQuad: FullScreenQuad;
    _oldClearColor: Color;
    /**
     * Performs the Bokeh pass.
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
}
import { Pass } from './Pass.js';
import { WebGLRenderTarget } from 'three';
import { MeshDepthMaterial } from 'three';
import { ShaderMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
import { Color } from 'three';
