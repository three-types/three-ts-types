/**
 * ~Options
 */
export type SSRPass = {
    /**
     * - The renderer.
     */
    renderer: WebGLRenderer;
    /**
     * - The scene to render.
     */
    scene: Scene;
    /**
     * - The camera.
     */
    camera: Camera;
    /**
     * - The width of the effect.
     */
    width?: number | undefined;
    /**
     * - The width of the effect.
     */
    height?: number | undefined;
    /**
     * - Which 3D objects should be affected by SSR. If not set, the entire scene is affected.
     */
    selects?: Object3D[] | null | undefined;
    /**
     * - Whether bouncing is enabled or not.
     */
    bouncing?: boolean | undefined;
    /**
     * - A ground reflector.
     */
    groundReflector?: ReflectorForSSRPass | null;
};
/**
 * A pass for a basic SSR effect.
 *
 * ```js
 * const ssrPass = new SSRPass( {
 * 	renderer,
 * 	scene,
 * 	camera,
 * 	width: innerWidth,
 * 	height: innerHeight
 * } );
 * composer.addPass( ssrPass );
 * ```
 *
 * @augments Pass
 * @three_import import { SSRPass } from 'three/addons/postprocessing/SSRPass.js';
 */
export class SSRPass extends Pass {
    /**
     * Constructs a new SSR pass.
     *
     * @param {SSRPass~Options} options - The pass options.
     */
    constructor({ renderer, scene, camera, width, height, selects, bouncing, groundReflector }: SSRPass);
    /**
     * The width of the effect.
     *
     * @type {number}
     * @default 512
     */
    width: number;
    /**
     * The height of the effect.
     *
     * @type {number}
     * @default 512
     */
    height: number;
    /**
     * The renderer.
     *
     * @type {WebGLRenderer}
     */
    renderer: WebGLRenderer;
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
     * The ground reflector.
     *
     * @type {?ReflectorForSSRPass}
     * @default 0
     */
    groundReflector: ReflectorForSSRPass | null;
    /**
     * The opacity.
     *
     * @type {number}
     * @default 0.5
     */
    opacity: number;
    /**
     * The output configuration.
     *
     * @type {number}
     * @default 0
     */
    output: number;
    /**
     * Controls how far a fragment can reflect.
     *
     * @type {number}
     * @default 180
     */
    maxDistance: number;
    /**
     * Controls the cutoff between what counts as a
     * possible reflection hit and what does not.
     *
     * @type {number}
     * @default .018
     */
    thickness: number;
    tempColor: Color;
    _selects: any;
    _resolutionScale: number;
    /**
     * Whether the pass is selective or not.
     *
     * @type {boolean}
     * @default false
     */
    selective: boolean;
    _bouncing: any;
    /**
     * Whether to blur reflections or not.
     *
     * @type {boolean}
     * @default true
     */
    blur: boolean;
    _distanceAttenuation: any;
    _fresnel: any;
    _infiniteThick: any;
    beautyRenderTarget: WebGLRenderTarget;
    prevRenderTarget: WebGLRenderTarget;
    normalRenderTarget: WebGLRenderTarget;
    metalnessRenderTarget: WebGLRenderTarget;
    ssrRenderTarget: WebGLRenderTarget;
    blurRenderTarget: import("three").RenderTarget;
    blurRenderTarget2: import("three").RenderTarget;
    ssrMaterial: ShaderMaterial;
    normalMaterial: MeshNormalMaterial;
    metalnessOnMaterial: MeshBasicMaterial;
    metalnessOffMaterial: MeshBasicMaterial;
    blurMaterial: ShaderMaterial;
    blurMaterial2: ShaderMaterial;
    depthRenderMaterial: ShaderMaterial;
    copyMaterial: ShaderMaterial;
    fsQuad: FullScreenQuad;
    originalClearColor: Color;
    set resolutionScale(value: number);
    /**
     * The resolution scale. Valid values are in the range
     * `[0,1]`. `1` means best quality but also results in
     * more computational overhead. Setting to `0.5` means
     * the effect is computed in half-resolution.
     *
     * @type {number}
     * @default 1
     */
    get resolutionScale(): number;
    /**
     * Performs the SSR pass.
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
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
    _renderPass(renderer: any, passMaterial: any, renderTarget: any, clearColor: any, clearAlpha: any): void;
    _renderOverride(renderer: any, overrideMaterial: any, renderTarget: any, clearColor: any, clearAlpha: any): void;
    _renderMetalness(renderer: any, overrideMaterial: any, renderTarget: any, clearColor: any, clearAlpha: any): void;
}
export namespace SSRPass {
    namespace OUTPUT {
        let Default: number;
        let SSR: number;
        let Beauty: number;
        let Depth: number;
        let Normal: number;
        let Metalness: number;
    }
}
import { Pass } from './Pass.js';
import { Color } from 'three';
import { WebGLRenderTarget } from 'three';
import { ShaderMaterial } from 'three';
import { MeshNormalMaterial } from 'three';
import { MeshBasicMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
