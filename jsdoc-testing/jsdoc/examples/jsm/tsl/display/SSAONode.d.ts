export default SSAONode;
export function ssao(depthNode: Node<any>, normalNode: Node<vec3>, camera: Camera): SSAONode;
/**
 * Post processing node for a fast, screen-space ambient occlusion (SSAO).
 *
 * It point-samples a per-pixel rotated Vogel disk and estimates obscurance with a single depth tap
 * per sample, trading the ground-truth accuracy of {@link GTAONode}'s horizon ray-marching for
 * lower cost. A built-in separable, depth-aware blur denoises the result so it can be used without
 * temporal accumulation.
 * ```js
 * const scenePass = pass( scene, camera );
 * scenePass.setMRT( mrt( { output, normal: normalView } ) );
 * const scenePassColor = scenePass.getTextureNode( 'output' );
 * const scenePassDepth = scenePass.getTextureNode( 'depth' );
 * const scenePassNormal = scenePass.getTextureNode( 'normal' );
 *
 * const aoPass = ssao( scenePassDepth, scenePassNormal, camera );
 *
 * renderPipeline.outputNode = scenePassColor.mul( aoPass.r );
 * ```
 *
 * @augments TempNode
 * @three_import import { ssao } from 'three/addons/tsl/display/SSAONode.js';
 */
declare class SSAONode extends TempNode {
    /**
     * Constructs a new SSAO node.
     *
     * @param {Node<float>} depthNode - A node that represents the scene's depth.
     * @param {Node<vec3>} normalNode - A node that represents the scene's normals.
     * @param {Camera} camera - The camera the scene is rendered with.
     */
    constructor(depthNode: Node<any>, normalNode: Node<vec3>, camera: Camera);
    /**
     * A node that represents the scene's depth.
     *
     * @type {Node<float>}
     */
    depthNode: Node<any>;
    /**
     * A node that represents the scene's normals.
     *
     * @type {Node<vec3>}
     */
    normalNode: Node<vec3>;
    /**
     * The resolution scale. The effect renders at a fraction of the drawing buffer
     * for extra speed; `0.5` is a good default for a low-frequency signal like AO.
     *
     * @type {number}
     * @default 0.5
     */
    resolutionScale: number;
    /**
     * The world-space radius the occlusion is gathered within.
     *
     * @type {UniformNode<float>}
     */
    radius: UniformNode<any>;
    /**
     * The strength of the occlusion.
     *
     * @type {UniformNode<float>}
     */
    intensity: UniformNode<any>;
    /**
     * An angle bias that suppresses self-occlusion on near-flat surfaces.
     *
     * @type {UniformNode<float>}
     */
    bias: UniformNode<any>;
    /**
     * How many samples are used to estimate the occlusion. A higher value
     * results in a smoother result at a higher runtime cost.
     *
     * @type {UniformNode<float>}
     */
    samples: UniformNode<any>;
    /**
     * Whether the depth-aware blur that denoises the raw AO is applied or not.
     *
     * @type {boolean}
     * @default true
     */
    blurEnabled: boolean;
    /**
     * How strongly the blur rejects samples across depth discontinuities,
     * relative to the AO radius. A higher value keeps edges crisper.
     *
     * @type {UniformNode<float>}
     */
    blurSharpness: UniformNode<any>;
    /**
     * The resolution of the effect. Set from the drawing buffer size and `resolutionScale`.
     *
     * @type {Vector2}
     */
    resolution: Vector2;
    /**
     * The render target the raw ambient occlusion is rendered into. Also holds the
     * final result after the separable blur has ping-ponged back into it.
     *
     * @private
     * @type {RenderTarget}
     */
    private _aoRenderTarget;
    /**
     * The render target the intermediate (horizontally blurred) result is rendered into.
     *
     * @private
     * @type {RenderTarget}
     */
    private _blurRenderTarget;
    /**
     * Represents the projection matrix of the scene's camera.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _cameraProjectionMatrix;
    /**
     * Represents the inverse projection matrix of the scene's camera.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _cameraProjectionMatrixInverse;
    /**
     * Represents the near value of the scene's camera.
     *
     * @private
     * @type {ReferenceNode<float>}
     */
    private _cameraNear;
    /**
     * Represents the far value of the scene's camera.
     *
     * @private
     * @type {ReferenceNode<float>}
     */
    private _cameraFar;
    /**
     * The camera the scene is rendered with.
     *
     * @private
     * @type {Camera}
     */
    private _camera;
    /**
     * The input texture the blur material reads from. Swapped between the two render
     * targets to run the horizontal and vertical passes with a single material.
     *
     * @private
     * @type {TextureNode}
     */
    private _blurInput;
    /**
     * The blur direction (one texel along x or y).
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _blurDirection;
    /**
     * The material that computes the raw ambient occlusion.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _aoMaterial;
    /**
     * The material that applies the separable, depth-aware blur.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _blurMaterial;
    /**
     * The result of the effect is represented as a separate texture node.
     *
     * @private
     * @type {PassTextureNode}
     */
    private _textureNode;
    /**
     * Returns the result of the effect as a texture node.
     *
     * @return {PassTextureNode} A texture node that represents the result of the effect.
     */
    getTextureNode(): PassTextureNode;
    /**
     * Sets the size of the effect.
     *
     * @param {number} width - The width of the effect.
     * @param {number} height - The height of the effect.
     */
    setSize(width: number, height: number): void;
    /**
     * This method is used to render the effect once per frame.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    updateBefore(frame: NodeFrame): void;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {PassTextureNode}
     */
    setup(builder: NodeBuilder): PassTextureNode;
}
import { TempNode } from 'three/webgpu';
import { Vector2 } from 'three/webgpu';
