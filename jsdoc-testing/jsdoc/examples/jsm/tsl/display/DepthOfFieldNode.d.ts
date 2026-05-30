export default DepthOfFieldNode;
export function dof(node: Node<any>, viewZNode: Node<any>, focusDistance?: Node<any> | number, focalLength?: Node<any> | number, bokehScale?: Node<any> | number): DepthOfFieldNode;
/**
 * Post processing node for creating depth of field (DOF) effect.
 *
 * References:
 * - {@link https://pixelmischiefblog.wordpress.com/2016/11/25/bokeh-depth-of-field/}
 * - {@link https://www.adriancourreges.com/blog/2016/09/09/doom-2016-graphics-study/}
 *
 * @augments TempNode
 * @three_import import { dof } from 'three/addons/tsl/display/DepthOfFieldNode.js';
 */
declare class DepthOfFieldNode extends TempNode {
    /**
     * Constructs a new DOF node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the input of the effect.
     * @param {Node<float>} viewZNode - Represents the viewZ depth values of the scene.
     * @param {Node<float>} focusDistanceNode - Defines the effect's focus which is the distance along the camera's look direction in world units.
     * @param {Node<float>} focalLengthNode - How far an object can be from the focal plane before it goes completely out-of-focus in world units.
     * @param {Node<float>} bokehScaleNode - A unitless value for artistic purposes to adjust the size of the bokeh.
     */
    constructor(textureNode: TextureNode, viewZNode: Node<any>, focusDistanceNode: Node<any>, focalLengthNode: Node<any>, bokehScaleNode: Node<any>);
    /**
     * The texture node that represents the input of the effect.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * Represents the viewZ depth values of the scene.
     *
     * @type {Node<float>}
     */
    viewZNode: Node<any>;
    /**
     * Defines the effect's focus which is the distance along the camera's look direction in world units.
     *
     * @type {Node<float>}
     */
    focusDistanceNode: Node<any>;
    /**
     * How far an object can be from the focal plane before it goes completely out-of-focus in world units.
     *
     * @type {Node<float>}
     */
    focalLengthNode: Node<any>;
    /**
     * A unitless value for artistic purposes to adjust the size of the bokeh.
     *
     * @type {Node<float>}
     */
    bokehScaleNode: Node<any>;
    /**
     * The inverse size of the resolution.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _invSize;
    /**
     * The render target used for the near and far field.
     *
     * @private
     * @type {RenderTarget}
     */
    private _CoCRT;
    /**
     * The render target used for blurring the near field.
     *
     * @private
     * @type {RenderTarget}
     */
    private _CoCBlurredRT;
    /**
     * The render target used for the first blur pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _blur64RT;
    /**
     * The render target used for the near field's second blur pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _blur16NearRT;
    /**
     * The render target used for the far field's second blur pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _blur16FarRT;
    /**
     * The render target used for the composite
     *
     * @private
     * @type {RenderTarget}
     */
    private _compositeRT;
    /**
     * The material used for the CoC/near and far fields.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _CoCMaterial;
    /**
     * The material used for blurring the near field.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _CoCBlurredMaterial;
    /**
     * The material used for the 64 tap blur.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _blur64Material;
    /**
     * The material used for the 16 tap blur.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _blur16Material;
    /**
     * The material used for the final composite.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _compositeMaterial;
    /**
     * The result of the effect is represented as a separate texture node.
     *
     * @private
     * @type {TextureNode}
     */
    private _textureNode;
    /**
     * The result of the CoC pass as a texture node.
     *
     * @private
     * @type {TextureNode}
     */
    private _CoCTextureNode;
    /**
     * The result of the blur64 pass as a texture node.
     *
     * @private
     * @type {TextureNode}
     */
    private _blur64TextureNode;
    /**
     * The result of the near field's blur16 pass as a texture node.
     *
     * @private
     * @type {TextureNode}
     */
    private _blur16NearTextureNode;
    /**
     * The result of the far field's blur16 pass as a texture node.
     *
     * @private
     * @type {TextureNode}
     */
    private _blur16FarTextureNode;
    /**
     * Sets the size of the effect.
     *
     * @param {number} width - The width of the effect.
     * @param {number} height - The height of the effect.
     */
    setSize(width: number, height: number): void;
    /**
     * Returns the result of the effect as a texture node.
     *
     * @return {PassTextureNode} A texture node that represents the result of the effect.
     */
    getTextureNode(): PassTextureNode;
    /**
     * This method is used to update the effect's uniforms once per frame.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    updateBefore(frame: NodeFrame): void;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ShaderCallNodeInternal}
     */
    setup(builder: NodeBuilder): ShaderCallNodeInternal;
    _generateKernels(): {
        points16: Vector2[];
        points64: Vector2[];
    };
}
import { TempNode } from 'three/webgpu';
import { Vector2 } from 'three/webgpu';
