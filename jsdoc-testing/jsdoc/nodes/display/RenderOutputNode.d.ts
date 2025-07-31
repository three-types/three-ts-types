export default RenderOutputNode;
export function renderOutput(color: Node, toneMapping?: number | null, outputColorSpace?: string | null): RenderOutputNode;
/**
 * Normally, tone mapping and color conversion happens automatically
 * before outputting pixel too the default (screen) framebuffer. In certain
 * post processing setups this happens to late because certain effects
 * require e.g. sRGB input. For such scenarios, `RenderOutputNode` can be used
 * to apply tone mapping and color space conversion at an arbitrary point
 * in the effect chain.
 *
 * When applying tone mapping and color space conversion manually with this node,
 * you have to set {@link PostProcessing#outputColorTransform} to `false`.
 *
 * ```js
 * const postProcessing = new PostProcessing( renderer );
 * postProcessing.outputColorTransform = false;
 *
 * const scenePass = pass( scene, camera );
 * const outputPass = renderOutput( scenePass );
 *
 * postProcessing.outputNode = outputPass;
 * ```
 *
 * @augments TempNode
 */
declare class RenderOutputNode extends TempNode {
    /**
     * Constructs a new render output node.
     *
     * @param {Node} colorNode - The color node to process.
     * @param {?number} toneMapping - The tone mapping type.
     * @param {?string} outputColorSpace - The output color space.
     */
    constructor(colorNode: Node, toneMapping: number | null, outputColorSpace: string | null);
    /**
     * The color node to process.
     *
     * @type {Node}
     */
    colorNode: Node;
    /**
     * The tone mapping type.
     *
     * @type {?number}
     */
    toneMapping: number | null;
    /**
     * The output color space.
     *
     * @type {?string}
     */
    outputColorSpace: string | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isRenderOutputNode: boolean;
    setup({ context }: {
        context: any;
    }): Node;
}
import TempNode from '../core/TempNode.js';
