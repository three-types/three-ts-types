/**
 * A special type of render pass that produces a pixelated beauty pass.
 *
 * ```js
 * const renderPixelatedPass = new RenderPixelatedPass( 6, scene, camera );
 * composer.addPass( renderPixelatedPass );
 * ```
 *
 * @augments Pass
 * @three_import import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
 */
export class RenderPixelatedPass extends Pass {
    /**
     * Constructs a new render pixelated pass.
     *
     * @param {number} pixelSize - The effect's pixel size.
     * @param {Scene} scene - The scene to render.
     * @param {Camera} camera - The camera.
     * @param {{normalEdgeStrength:number,depthEdgeStrength:number}} options - The pass options.
     */
    constructor(pixelSize: number, scene: Scene, camera: Camera, options?: {
        normalEdgeStrength: number;
        depthEdgeStrength: number;
    });
    /**
     * The effect's pixel size.
     *
     * @type {number}
     */
    pixelSize: number;
    /**
     * The scene to render.
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
    /**
     * The normal edge strength.
     *
     * @type {number}
     * @default 0.3
     */
    normalEdgeStrength: number;
    /**
     * The normal edge strength.
     *
     * @type {number}
     * @default 0.4
     */
    depthEdgeStrength: number;
    /**
     * The pixelated material.
     *
     * @type {ShaderMaterial}
     */
    pixelatedMaterial: ShaderMaterial;
    _resolution: Vector2;
    _renderResolution: Vector2;
    _normalMaterial: MeshNormalMaterial;
    _beautyRenderTarget: WebGLRenderTarget;
    _normalRenderTarget: WebGLRenderTarget;
    _fsQuad: FullScreenQuad;
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
    /**
     * Sets the effect's pixel size.
     *
     * @param {number} pixelSize - The pixel size to set.
     */
    setPixelSize(pixelSize: number): void;
    /**
     * Performs the pixelation pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget): void;
    _createPixelatedMaterial(): ShaderMaterial;
}
import { Pass } from './Pass.js';
import { ShaderMaterial } from 'three';
import { Vector2 } from 'three';
import { MeshNormalMaterial } from 'three';
import { WebGLRenderTarget } from 'three';
import { FullScreenQuad } from './Pass.js';
