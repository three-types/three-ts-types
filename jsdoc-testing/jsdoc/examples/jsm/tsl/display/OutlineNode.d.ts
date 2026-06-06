export default OutlineNode;
export function outline(scene: Scene, camera: Camera, params: {
    selectedObjects?: Object3D[] | undefined;
    edgeThickness?: Node<any>;
    edgeGlow?: Node<any>;
    downSampleRatio?: number | undefined;
}): OutlineNode;
/**
 * Post processing node for rendering outlines around selected objects. The node
 * gives you great flexibility in composing the final outline look depending on
 * your requirements.
 * ```js
 * const renderPipeline = new THREE.RenderPipeline( renderer );
 *
 * const scenePass = pass( scene, camera );
 *
 * // outline parameter
 *
 * const edgeStrength = uniform( 3.0 );
 * const edgeGlow = uniform( 0.0 );
 * const edgeThickness = uniform( 1.0 );
 * const visibleEdgeColor = uniform( new THREE.Color( 0xffffff ) );
 * const hiddenEdgeColor = uniform( new THREE.Color( 0x4e3636 ) );
 *
 * outlinePass = outline( scene, camera, {
 * 	selectedObjects,
 * 	edgeGlow,
 * 	edgeThickness
 * } );
 *
 * // compose custom outline
 *
 * const { visibleEdge, hiddenEdge } = outlinePass;
 * const outlineColor = visibleEdge.mul( visibleEdgeColor ).add( hiddenEdge.mul( hiddenEdgeColor ) ).mul( edgeStrength );
 *
 * renderPipeline.outputNode = outlineColor.add( scenePass );
 * ```
 *
 * @augments TempNode
 * @three_import import { outline } from 'three/addons/tsl/display/OutlineNode.js';
 */
declare class OutlineNode extends TempNode {
    /**
     * Constructs a new outline node.
     *
     * @param {Scene} scene - A reference to the scene.
     * @param {Camera} camera - The camera the scene is rendered with.
     * @param {Object} params - The configuration parameters.
     * @param {Array<Object3D>} [params.selectedObjects] - An array of selected objects.
     * @param {Node<float>} [params.edgeThickness=float(1)] - The thickness of the edges.
     * @param {Node<float>} [params.edgeGlow=float(0)] - Can be used for an animated glow/pulse effects.
     * @param {number} [params.downSampleRatio=2] - The downsample ratio.
     */
    constructor(scene: Scene, camera: Camera, params?: {
        selectedObjects?: Object3D[] | undefined;
        edgeThickness?: Node<any>;
        edgeGlow?: Node<any>;
        downSampleRatio?: number | undefined;
    });
    /**
     * A reference to the scene.
     *
     * @type {Scene}
     */
    scene: Scene;
    /**
     * The camera the scene is rendered with.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * An array of selected objects.
     *
     * @type {Array<Object3D>}
     */
    selectedObjects: Array<Object3D>;
    /**
     * The thickness of the edges.
     *
     * @type {Node<float>}
     */
    edgeThicknessNode: Node<any>;
    /**
     * Can be used for an animated glow/pulse effect.
     *
     * @type {Node<float>}
     */
    edgeGlowNode: Node<any>;
    /**
     * The downsample ratio.
     *
     * @type {number}
     * @default 2
     */
    downSampleRatio: number;
    /**
     * The render target for the depth pre-pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetDepthBuffer;
    /**
     * The render target for the mask pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetMaskBuffer;
    /**
     * The render target for the mask downsample.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetMaskDownSampleBuffer;
    /**
     * The first render target for the edge detection.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetEdgeBuffer1;
    /**
     * The second render target for the edge detection.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetEdgeBuffer2;
    /**
     * The first render target for the blur pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetBlurBuffer1;
    /**
     * The second render target for the blur pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetBlurBuffer2;
    /**
     * The render target for the final composite.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetComposite;
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
     * Uniform that represents the blur direction of the pass.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _blurDirection;
    /**
     * Texture node that holds the data from the depth pre-pass.
     *
     * @private
     * @type {TextureNode}
     */
    private _depthTextureUniform;
    /**
     * Texture node that holds the data from the mask pass.
     *
     * @private
     * @type {TextureNode}
     */
    private _maskTextureUniform;
    /**
     * Texture node that holds the data from the mask downsample pass.
     *
     * @private
     * @type {TextureNode}
     */
    private _maskTextureDownsSampleUniform;
    /**
     * Texture node that holds the data from the first edge detection pass.
     *
     * @private
     * @type {TextureNode}
     */
    private _edge1TextureUniform;
    /**
     * Texture node that holds the data from the second edge detection pass.
     *
     * @private
     * @type {TextureNode}
     */
    private _edge2TextureUniform;
    /**
     * Texture node that holds the current blurred color data.
     *
     * @private
     * @type {TextureNode}
     */
    private _blurColorTextureUniform;
    /**
     * Visible edge color.
     *
     * @private
     * @type {Node<vec3>}
     */
    private _visibleEdgeColor;
    /**
     * Hidden edge color.
     *
     * @private
     * @type {Node<vec3>}
     */
    private _hiddenEdgeColor;
    /**
     * The material for the depth pre-pass.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _depthMaterial;
    _depthSpriteMaterial: SpriteNodeMaterial;
    /**
     * The material for preparing the mask.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _prepareMaskMaterial;
    _prepareMaskSpriteMaterial: SpriteNodeMaterial;
    /**
     * The copy material
     *
     * @private
     * @type {NodeMaterial}
     */
    private _materialCopy;
    /**
     * The edge detection material.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _edgeDetectionMaterial;
    /**
     * The material that is used to render in the blur pass.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _separableBlurMaterial;
    /**
     * The material that is used to render in the blur pass.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _separableBlurMaterial2;
    /**
     * The final composite material.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _compositeMaterial;
    /**
     * A set to cache selected objects in the scene.
     *
     * @private
     * @type {Set<Object3D>}
     */
    private _selectionCache;
    /**
     * The number of selected objects from the previous frame. Used to detect
     * the transition to an empty selection so the composite render target can
     * be cleared once and avoid leaving a stale outline on screen.
     *
     * @private
     * @type {number}
     * @default 0
     */
    private _lastSelectionCount;
    /**
     * The result of the effect is represented as a separate texture node.
     *
     * @private
     * @type {PassTextureNode}
     */
    private _textureNode;
    /**
     * A mask value that represents the visible edge.
     *
     * @return {Node<float>} The visible edge.
     */
    get visibleEdge(): Node<any>;
    /**
     * A mask value that represents the hidden edge.
     *
     * @return {Node<float>} The hidden edge.
     */
    get hiddenEdge(): Node<any>;
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
    setup(): PassTextureNode;
    /**
     * Updates the selection cache based on the selected objects.
     *
     * @private
     */
    private _updateSelectionCache;
}
import { TempNode } from 'three/webgpu';
import { SpriteNodeMaterial } from 'three/webgpu';
