export default GTAONode;
export function ao(depthNode: Node<any>, normalNode: Node<any> | null, camera: Camera): GTAONode;
/**
 * Post processing node for applying Ground Truth Ambient Occlusion (GTAO) to a scene.
 * ```js
 * const renderPipeline = new THREE.RenderPipeline( renderer );
 *
 * // pre-pass for normals and depth
 *
 * const prePass = pass( scene, camera );
 * prePass.setMRT( mrt( {
 * 	output: normalView
 * } ) );
 *
 * const prePassNormal = prePass.getTextureNode();
 * const prePassDepth = prePass.getTextureNode( 'depth' );
 *
 * // scene pass
 *
 * const scenePass = pass( scene, camera );
 *
 * // ao
 *
 * const aoPass = ao( prePassDepth, prePassNormal, camera );
 * const aoPassOutput = aoPass.getTextureNode();
 *
 * // apply the ambient occlusion to the scene
 *
 * scenePass.contextNode = builtinAOContext( aoPassOutput.sample( screenUV ).r );
 *
 * renderPipeline.outputNode = scenePass;
 * ```
 *
 * Reference: [Practical Real-Time Strategies for Accurate Indirect Occlusion](https://www.activision.com/cdn/research/Practical_Real_Time_Strategies_for_Accurate_Indirect_Occlusion_NEW%20VERSION_COLOR.pdf).
 *
 * @augments TempNode
 * @three_import import { ao } from 'three/addons/tsl/display/GTAONode.js';
 */
declare class GTAONode extends TempNode {
    /**
     * Constructs a new GTAO node.
     *
     * @param {Node<float>} depthNode - A node that represents the scene's depth.
     * @param {?Node<vec3>} normalNode - A node that represents the scene's normals.
     * @param {Camera} camera - The camera the scene is rendered with.
     */
    constructor(depthNode: Node<any>, normalNode: Node<any> | null, camera: Camera);
    /**
     * A node that represents the scene's depth.
     *
     * @type {Node<float>}
     */
    depthNode: Node<any>;
    /**
     * A node that represents the scene's normals. If no normals are passed to the
     * constructor (because MRT is not available), normals can be automatically
     * reconstructed from depth values in the shader.
     *
     * @type {?Node<vec3>}
     */
    normalNode: Node<any> | null;
    /**
     * The resolution scale. By default the effect is rendered in full resolution
     * for best quality but a value of `0.5` should be sufficient for most scenes.
     *
     * @type {number}
     * @default 1
     */
    resolutionScale: number;
    /**
     * The render target the ambient occlusion is rendered into.
     *
     * @private
     * @type {RenderTarget}
     */
    private _aoRenderTarget;
    /**
     * The radius of the ambient occlusion.
     *
     * @type {UniformNode<float>}
     */
    radius: UniformNode<any>;
    /**
     * The thickness of the ambient occlusion.
     *
     * @type {UniformNode<float>}
     */
    thickness: UniformNode<any>;
    /**
     * @deprecated since r186. The new distance model "Quadratic Ray Stepping"
     * does not need it anymore.
     *
     * @type {UniformNode<float>}
     */
    distanceExponent: UniformNode<any>;
    /**
     * @deprecated since r186. The new distance model "Quadratic Ray Stepping"
     * does not need it anymore.
     *
     * @type {UniformNode<float>}
     */
    distanceFallOff: UniformNode<any>;
    /**
     * The scale of the ambient occlusion.
     *
     * @type {UniformNode<float>}
     */
    scale: UniformNode<any>;
    /**
     * How many samples are used to compute the AO.
     * A higher value results in better quality but also
     * in a more expensive runtime behavior.
     *
     * Note: Changing this member triggers a shader recompilation.
     *
     * @type {UniformNode<float>}
     */
    samples: UniformNode<any>;
    /**
     * Whether to use temporal filtering or not. Setting this property to
     * `true` requires the usage of `TRAANode`. This will help to reduce noise
     * although it introduces typical TAA artifacts like ghosting and temporal
     * instabilities.
     *
     * If setting this property to `false`, a manual denoise via `DenoiseNode`
     * might be required.
     *
     * @type {boolean}
     * @default false
     */
    useTemporalFiltering: boolean;
    /**
     * The resolution of the effect. Can be scaled via `resolutionScale`.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _resolution;
    /**
     * The internal noise texture used by the AO.
     *
     * @private
     * @type {DataTexture}
     */
    private _noiseTexture;
    /**
     * The node represents the internal noise texture used by the AO.
     *
     * @private
     * @type {TextureNode}
     */
    private _noiseNode;
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
     * Temporal direction that influences the rotation angle for each slice.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _temporalDirection;
    /**
     * Temporal offset added to the initial ray step.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _temporalOffset;
    /**
     * Resolution scale uniform.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _resolutionScale;
    /**
     * The TSL function that computes the AO. Required for rebuild.
     *
     * @private
     * @type {?Function}
     * @default null
     */
    private _ao;
    /**
     * The sample count currently baked into the shader.
     *
     * @private
     * @type {number}
     */
    private _currentSamples;
    /**
     * The shared builder context.  Required for rebuild.
     *
     * @private
     * @type {?Object}
     * @default null
     */
    private _sharedContext;
    /**
     * The material that is used to render the effect.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _material;
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
