export default GTAONode;
export function ao(depthNode: Node<any>, normalNode: Node<any> | null, camera: Camera): GTAONode;
/**
 * Post processing node for applying Ground Truth Ambient Occlusion (GTAO) to a scene.
 * ```js
 * const renderPipeline = new THREE.RenderPipeline( renderer );
 *
 * const scenePass = pass( scene, camera );
 * scenePass.setMRT( mrt( {
 * 	output: output,
 * 	normal: normalView
 * } ) );
 *
 * const scenePassColor = scenePass.getTextureNode( 'output' );
 * const scenePassNormal = scenePass.getTextureNode( 'normal' );
 * const scenePassDepth = scenePass.getTextureNode( 'depth' );
 *
 * const aoPass = ao( scenePassDepth, scenePassNormal, camera );
 * const aoPassOutput = aoPass.getTextureNode();
 *
 * renderPipeline.outputNode = scenePassColor.mul( vec4( vec3( aoPassOutput.r ), 1 ) );
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
     * The resolution of the effect. Can be scaled via
     * `resolutionScale`.
     *
     * @type {UniformNode<vec2>}
     */
    resolution: UniformNode<any>;
    /**
     * The thickness of the ambient occlusion.
     *
     * @type {UniformNode<float>}
     */
    thickness: UniformNode<any>;
    /**
     * Another option to tweak the occlusion. The recommended range is
     * `[1,2]` for attenuating the AO.
     *
     * @type {UniformNode<float>}
     */
    distanceExponent: UniformNode<any>;
    /**
     * The distance fall off value of the ambient occlusion.
     * A lower value leads to a larger AO effect. The value
     * should lie in the range `[0,1]`.
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
