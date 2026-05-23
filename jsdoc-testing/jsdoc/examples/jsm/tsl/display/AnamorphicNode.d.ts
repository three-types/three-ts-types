export function anamorphic(node: TextureNode, threshold?: Node<any> | number, scale?: Node<any> | number, samples?: number): AnamorphicNode;
export default AnamorphicNode;
/**
 * Post processing node for adding an anamorphic flare effect.
 *
 * @augments TempNode
 * @three_import import { anamorphic } from 'three/addons/tsl/display/AnamorphicNode.js';
 */
declare class AnamorphicNode extends TempNode {
    /**
     * Constructs a new anamorphic node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the input of the effect.
     * @param {Node<float>} thresholdNode - The threshold is one option to control the intensity and size of the effect.
     * @param {Node<float>} scaleNode - Defines the vertical scale of the flares.
     * @param {number} samples - More samples result in larger flares and a more expensive runtime behavior.
     */
    constructor(textureNode: TextureNode, thresholdNode: Node<any>, scaleNode: Node<any>, samples: number);
    /**
     * The texture node that represents the input of the effect.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * The threshold is one option to control the intensity and size of the effect.
     *
     * @type {Node<float>}
     */
    thresholdNode: Node<any>;
    /**
     * Defines the vertical scale of the flares.
     *
     * @type {Node<float>}
     */
    scaleNode: Node<any>;
    /**
     * The color of the flares.
     *
     * @type {Node<vec3>}
     */
    colorNode: Node<any>;
    /**
     * More samples result in larger flares and a more expensive runtime behavior.
     *
     * @type {Node<float>}
     */
    samples: Node<any>;
    /**
     * The resolution scale.
     *
     * @type {number}
     */
    resolutionScale: number;
    /**
     * The internal render target of the effect.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTarget;
    /**
     * A uniform node holding the inverse resolution value.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _invSize;
    /**
     * The result of the effect is represented as a separate texture node.
     *
     * @private
     * @type {PassTextureNode}
     */
    private _textureNode;
    /**
     * The material for the anamorphic pass.
     *
     * @private
     * @type {?NodeMaterial}
     */
    private _material;
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
    set resolution(value: Vector2);
    /**
     * The resolution scale.
     *
     * @deprecated
     * @type {Vector2}
     * @default {(1,1)}
     */
    get resolution(): Vector2;
}
import { TempNode } from 'three/webgpu';
import { Vector2 } from 'three/webgpu';
