export default RTTNode;
export function rtt(node: Node, ...params: any[]): RTTNode;
export function convertToTexture(node: Node, ...params: any[]): RTTNode;
/**
 * `RTTNode` takes another node and uses it with a `QuadMesh` to render into a texture (RTT).
 * This module is especially relevant in context of post processing where certain nodes require
 * texture input for their effects. With the helper function `convertToTexture()` which is based
 * on this module, the node system can automatically ensure texture input if required.
 *
 * @augments TextureNode
 */
declare class RTTNode extends TextureNode {
    /**
     * Constructs a new RTT node.
     *
     * @param {Node} node - The node to render a texture with.
     * @param {?number} [width=null] - The width of the internal render target. If not width is applied, the render target is automatically resized.
     * @param {?number} [height=null] - The height of the internal render target.
     * @param {Object} [options={type:HalfFloatType}] - The options for the internal render target.
     */
    constructor(node: Node, width?: number | null, height?: number | null, options?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isRTTNode: boolean;
    /**
     * The node to render a texture with.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The width of the internal render target.
     * If not width is applied, the render target is automatically resized.
     *
     * @type {?number}
     * @default null
     */
    width: number | null;
    /**
     * The height of the internal render target.
     *
     * @type {?number}
     * @default null
     */
    height: number | null;
    /**
     * The pixel ratio
     *
     * @type {number}
     * @default 1
     */
    pixelRatio: number;
    /**
     * The render target
     *
     * @type {RenderTarget}
     */
    renderTarget: RenderTarget;
    /**
     * Whether the texture requires an update or not.
     *
     * @type {boolean}
     * @default true
     */
    textureNeedsUpdate: boolean;
    /**
     * Whether the texture should automatically be updated or not.
     *
     * @type {boolean}
     * @default true
     */
    autoUpdate: boolean;
    /**
     * The node which is used with the quad mesh for RTT.
     *
     * @private
     * @type {Node}
     * @default null
     */
    private _rttNode;
    /**
     * The internal quad mesh for RTT.
     *
     * @private
     * @type {QuadMesh}
     */
    private _quadMesh;
    /**
     * Whether the internal render target should automatically be resized or not.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly get autoResize(): boolean;
    setup(builder: any): void;
    /**
     * Sets the size of the internal render target
     *
     * @param {number} width - The width to set.
     * @param {number} height - The width to set.
     */
    setSize(width: number, height: number): void;
    /**
     * Sets the pixel ratio. This will also resize the render target.
     *
     * @param {number} pixelRatio - The pixel ratio to set.
     */
    setPixelRatio(pixelRatio: number): void;
    updateBefore({ renderer }: {
        renderer: any;
    }): void;
}
import TextureNode from '../accessors/TextureNode.js';
import { RenderTarget } from '../../core/RenderTarget.js';
