export default ShadowMaskModel;
/**
 * Represents lighting model for a shadow material. Used in {@link ShadowNodeMaterial}.
 *
 * @augments LightingModel
 */
declare class ShadowMaskModel extends LightingModel {
    /**
     * The shadow mask node.
     *
     * @type {Node}
     */
    shadowNode: Node;
    /**
     * Only used to save the shadow mask.
     *
     * @param {Object} input - The input data.
     */
    direct({ lightNode }: Object): void;
    /**
     * Uses the shadow mask to produce the final color.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    finish({ context }: NodeBuilder): void;
}
import LightingModel from '../core/LightingModel.js';
