export default ParallaxBarrierPassNode;
export function parallaxBarrierPass(scene: Scene, camera: Camera): ParallaxBarrierPassNode;
/**
 * A render pass node that creates a parallax barrier effect.
 *
 * @augments StereoCompositePassNode
 * @three_import import { parallaxBarrierPass } from 'three/addons/tsl/display/ParallaxBarrierPassNode.js';
 */
declare class ParallaxBarrierPassNode extends StereoCompositePassNode {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isParallaxBarrierPassNode: boolean;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {PassTextureNode}
     */
    setup(builder: NodeBuilder): PassTextureNode;
}
import StereoCompositePassNode from './StereoCompositePassNode.js';
