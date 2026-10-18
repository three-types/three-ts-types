export default SSAAPassNode;
export function ssaaPass(scene: Scene, camera: Camera): SSAAPassNode;
/**
 * A special render pass node that renders the scene with SSAA (Supersampling Anti-Aliasing).
 * This manual SSAA approach re-renders the scene ones for each sample with camera jitter and accumulates the results.
 *
 * This node produces a high-quality anti-aliased output but is also extremely expensive because of
 * its brute-force approach of re-rendering the entire scene multiple times.
 *
 * Reference: {@link https://en.wikipedia.org/wiki/Supersampling}
 *
 * @augments PassNode
 * @three_import import { ssaaPass } from 'three/addons/tsl/display/SSAAPassNode.js';
 */
declare class SSAAPassNode extends PassNode {
    /**
     * Constructs a new SSAA pass node.
     *
     * @param {Scene} scene - The scene to render.
     * @param {Camera} camera - The camera to render the scene with.
     */
    constructor(scene: Scene, camera: Camera);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSSAAPassNode: boolean;
    /**
     * The sample level specified  as n, where the number of samples is 2^n,
     * so sampleLevel = 4, is 2^4 samples, 16.
     *
     * @type {number}
     * @default 4
     */
    sampleLevel: number;
    /**
     * Whether rounding errors should be mitigated or not.
     *
     * @type {boolean}
     * @default true
     */
    unbiased: boolean;
    /**
     * A uniform node representing the sample weight.
     *
     * @type {UniformNode<float>}
     * @default 1
     */
    sampleWeight: UniformNode<float>;
    /**
     * Reference to the internal render target that holds the current sample.
     *
     * @private
     * @type {?RenderTarget}
     * @default null
     */
    private _sampleRenderTarget;
    /**
     * Reference to the internal quad mesh.
     *
     * @private
     * @type {QuadMesh}
     */
    private _quadMesh;
    /**
     * This method is used to render the SSAA effect once per frame.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    updateBefore(frame: NodeFrame): void;
    /**
     * This method is used to setup the effect's MRT configuration and quad mesh.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {PassTextureNode}
     */
    setup(builder: NodeBuilder): PassTextureNode;
}
import { PassNode } from 'three/webgpu';
