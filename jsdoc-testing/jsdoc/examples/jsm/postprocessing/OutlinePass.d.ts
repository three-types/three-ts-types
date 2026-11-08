/**
 * A pass for rendering outlines around selected objects.
 *
 * ```js
 * const resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );
 * const outlinePass = new OutlinePass( resolution, scene, camera );
 * composer.addPass( outlinePass );
 * ```
 *
 * @augments Pass
 * @three_import import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
 */
export class OutlinePass extends Pass {
    /**
     * Constructs a new outline pass.
     *
     * @param {Vector2} [resolution] - The effect's resolution.
     * @param {Scene} scene - The scene to render.
     * @param {Camera} camera - The camera.
     * @param {Array<Object3D>} [selectedObjects] - The selected 3D objects that should receive an outline.
     *
     */
    constructor(resolution?: Vector2, scene: Scene, camera: Camera, selectedObjects?: Array<Object3D>);
    /**
     * The scene to render.
     *
     * @type {Object}
     */
    renderScene: Object;
    /**
     * The camera.
     *
     * @type {Object}
     */
    renderCamera: Object;
    /**
     * The selected 3D objects that should receive an outline.
     *
     * @type {Array<Object3D>}
     */
    selectedObjects: Array<Object3D>;
    /**
     * The visible edge color.
     *
     * @type {Color}
     * @default (1,1,1)
     */
    visibleEdgeColor: Color;
    /**
     * The hidden edge color.
     *
     * @type {Color}
     * @default (0.1,0.04,0.02)
     */
    hiddenEdgeColor: Color;
    /**
     * Can be used for an animated glow/pulse effect.
     *
     * @type {number}
     * @default 0
     */
    edgeGlow: number;
    /**
     * Whether to use a pattern texture for to highlight selected
     * 3D objects or not.
     *
     * @type {boolean}
     * @default false
     */
    usePatternTexture: boolean;
    /**
     * Can be used to highlight selected 3D objects. Requires to set
     * {@link OutlinePass#usePatternTexture} to `true`.
     *
     * @type {?Texture}
     * @default null
     */
    patternTexture: Texture | null;
    /**
     * The edge thickness.
     *
     * @type {number}
     * @default 1
     */
    edgeThickness: number;
    /**
     * The edge strength.
     *
     * @type {number}
     * @default 3
     */
    edgeStrength: number;
    /**
     * The downsample ratio. The effect can be rendered in a much
     * lower resolution than the beauty pass.
     *
     * @type {number}
     * @default 2
     */
    downSampleRatio: number;
    /**
     * The pulse period.
     *
     * @type {number}
     * @default 0
     */
    pulsePeriod: number;
    _visibilityCache: Map<any, any>;
    _selectionCache: Set<any>;
    /**
     * The effect's resolution.
     *
     * @type {Vector2}
     * @default (256,256)
     */
    resolution: Vector2;
    renderTargetMaskBuffer: WebGLRenderTarget;
    depthMaterial: MeshDepthMaterial;
    prepareMaskMaterial: ShaderMaterial;
    renderTargetDepthBuffer: WebGLRenderTarget;
    renderTargetMaskDownSampleBuffer: WebGLRenderTarget;
    renderTargetBlurBuffer1: WebGLRenderTarget;
    renderTargetBlurBuffer2: WebGLRenderTarget;
    edgeDetectionMaterial: ShaderMaterial;
    renderTargetEdgeBuffer1: WebGLRenderTarget;
    renderTargetEdgeBuffer2: WebGLRenderTarget;
    separableBlurMaterial1: ShaderMaterial;
    separableBlurMaterial2: ShaderMaterial;
    overlayMaterial: ShaderMaterial;
    copyUniforms: Object;
    materialCopy: ShaderMaterial;
    _oldClearColor: Color;
    oldClearAlpha: number;
    _fsQuad: FullScreenQuad;
    tempPulseColor1: Color;
    tempPulseColor2: Color;
    textureMatrix: Matrix4;
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
    /**
     * Performs the Outline pass.
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
    _updateSelectionCache(): void;
    _changeVisibilityOfSelectedObjects(bVisible: any): void;
    _changeVisibilityOfNonSelectedObjects(bVisible: any): void;
    _updateTextureMatrix(): void;
    _getPrepareMaskMaterial(): ShaderMaterial;
    _getEdgeDetectionMaterial(): ShaderMaterial;
    _getSeparableBlurMaterial(maxRadius: any): ShaderMaterial;
    _getOverlayMaterial(): ShaderMaterial;
}
export namespace OutlinePass {
    let BlurDirectionX: Vector2;
    let BlurDirectionY: Vector2;
}
import { Pass } from './Pass.js';
import { Color } from 'three';
import { Vector2 } from 'three';
import { WebGLRenderTarget } from 'three';
import { MeshDepthMaterial } from 'three';
import { ShaderMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
import { Matrix4 } from 'three';
