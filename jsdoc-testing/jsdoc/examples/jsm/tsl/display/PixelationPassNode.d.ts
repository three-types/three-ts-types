export function pixelationPass(scene: Scene, camera: Camera, pixelSize?: number, normalEdgeStrength?: Node<any> | number, depthEdgeStrength?: Node<any> | number): PixelationPassNode;
export default PixelationPassNode;
/**
 * A special render pass node that renders the scene with a pixelation effect,
 * creating a visual presentation similar to that of a 2D pixel art game.
 *
 * The effect is achieved by rendering into a render target whose dimensions
 * are scaled down by {@link PixelationPassNode#pixelSize}.
 *
 * @augments PassNode
 * @three_import import { pixelationPass } from 'three/addons/tsl/display/PixelationPassNode.js';
 */
declare class PixelationPassNode extends PassNode {
    /**
     * Constructs a new pixelation pass node.
     *
     * @param {Scene} scene - The scene to render.
     * @param {Camera} camera - The camera to render the scene with.
     * @param {number} [pixelSize=6] - The pixel size.
     * @param {Node<float> | number} [normalEdgeStrength=0.3] - The normal edge strength.
     * @param {Node<float> | number} [depthEdgeStrength=0.4] - The depth edge strength.
     */
    constructor(scene: Scene, camera: Camera, pixelSize?: number, normalEdgeStrength?: Node<any> | number, depthEdgeStrength?: Node<any> | number);
    /**
     * The pixel size. This value scales the pass's render target.
     *
     * @type {number}
     * @default 6
     */
    pixelSize: number;
    /**
     * The normal edge strength.
     *
     * @type {Node<float>}
     * @default 0.3
     */
    normalEdgeStrength: Node<any>;
    /**
     * The depth edge strength.
     *
     * @type {Node<float>}
     * @default 0.4
     */
    depthEdgeStrength: Node<any>;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPixelationPassNode: boolean;
    _mrt: any;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ShaderCallNodeInternal}
     */
    setup(): ShaderCallNodeInternal;
}
import { PassNode } from 'three/webgpu';
