export function afterImage(node: Node<vec4>, damp?: (Node<any> | number)): AfterImageNode;
export default AfterImageNode;
/**
 * Post processing node for creating an after image effect.
 *
 * @augments TempNode
 * @three_import import { afterImage } from 'three/addons/tsl/display/AfterImageNode.js';
 */
declare class AfterImageNode extends TempNode {
    /**
     * Constructs a new after image node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the input of the effect.
     * @param {Node<float>} [damp=0.96] - The damping intensity. A higher value means a stronger after image effect.
     */
    constructor(textureNode: TextureNode, damp?: Node<any>);
    /**
     * The texture node that represents the input of the effect.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * How quickly the after-image fades. A higher value means the after-image
     * persists longer, while a lower value means it fades faster. Should be in
     * the range `[0, 1]`.
     *
     * @type {Node<float>}
     */
    damp: Node<any>;
    /**
     * The render target used for compositing the effect.
     *
     * @private
     * @type {RenderTarget}
     */
    private _compRT;
    /**
     * The render target that represents the previous frame.
     *
     * @private
     * @type {RenderTarget}
     */
    private _oldRT;
    /**
     * The result of the effect is represented as a separate texture node.
     *
     * @private
     * @type {PassTextureNode}
     */
    private _textureNode;
    /**
     * The texture represents the pervious frame.
     *
     * @private
     * @type {TextureNode}
     */
    private _textureNodeOld;
    /**
     * The material for the composite pass.
     *
     * @private
     * @type {?NodeMaterial}
     */
    private _materialComposed;
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
