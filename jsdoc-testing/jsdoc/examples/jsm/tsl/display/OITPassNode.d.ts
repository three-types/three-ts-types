export default OITPassNode;
export function oitPass(scene: Scene, camera: Camera, options?: Object): OITPassNode;
/**
 * A render pass node that renders the scene with Order-Independent Transparency
 * based on the Weighted Blended OIT technique by McGuire and Bavoil.
 *
 * Transparent objects are rendered in a separate pass into two accumulation
 * targets (a weighted color sum and the pixel's revealage) which are
 * then composited over the rest of the scene. Since the result does not depend
 * on the draw order, artifacts from sorting-based transparency like popping or
 * incorrectly resolved intersecting geometry are avoided.
 *
 * Only transparent materials using `NormalBlending` and no transmission qualify
 * for OIT. All other objects are rendered as usual.
 *
 * MSAA is only supported with the WebGPU backend.
 *
 * MRT configurations assigned via `setMRT()` apply to the default pass only.
 * OIT-qualified objects contribute to the color output but not to custom
 * MRT outputs since a pixel may accumulate multiple transparent surfaces.
 *
 * ```js
 * const renderPipeline = new THREE.RenderPipeline( renderer );
 * renderPipeline.outputNode = oitPass( scene, camera );
 * ```
 *
 * References:
 * - {@link https://jcgt.org/published/0002/02/09/}
 * - {@link https://casual-effects.blogspot.com/2014/03/weighted-blended-order-independent.html}
 *
 * @augments PassNode
 * @three_import import { oitPass } from 'three/addons/tsl/display/OITPassNode.js';
 */
declare class OITPassNode extends PassNode {
    /**
     * Constructs a new OIT pass node.
     *
     * @param {Scene} scene - The scene to render.
     * @param {Camera} camera - The camera to render the scene with.
     * @param {Object} [options={}] - Options for the internal render target.
     */
    constructor(scene: Scene, camera: Camera, options?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isOITPassNode: boolean;
    /**
     * The depth-based weight of a transparent fragment, see equations (7) to (9)
     * in the paper. When `null`, equation (9) is used. Must be assigned before
     * the first render.
     *
     * @type {?Node<float>}
     * @default null
     */
    weightNode: Node<any> | null;
    /**
     * The render target holding the OIT accumulation textures.
     *
     * @private
     * @type {RenderTarget}
     */
    private _oitRenderTarget;
    /**
     * The MRT configuration for the OIT pass.
     *
     * @private
     * @type {?MRTNode}
     */
    private _oitMRTNode;
    /**
     * The renderer of the current frame.
     *
     * @private
     * @type {?Renderer}
     */
    private _renderer;
    /**
     * Renders opaque objects and transparent objects that do not qualify for OIT.
     *
     * @private
     * @type {Function}
     */
    private _defaultRenderObjectFunction;
    /**
     * Renders OIT-qualified objects into the accumulation targets.
     *
     * @private
     * @type {Function}
     */
    private _oitRenderObjectFunction;
    /**
     * Returns the MRT configuration for the OIT pass.
     *
     * @private
     * @return {MRTNode} The MRT node.
     */
    private _getMRTNode;
    setSize(width: any, height: any): void;
    setup(builder: any): any;
}
import { PassNode } from 'three/webgpu';
