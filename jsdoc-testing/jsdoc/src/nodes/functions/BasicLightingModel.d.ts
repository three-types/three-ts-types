export default BasicLightingModel;
/**
 * Represents the lighting model for unlit materials. The only light contribution
 * is baked indirect lighting modulated with ambient occlusion and the material's
 * diffuse color. Environment mapping is supported. Used in {@link MeshBasicNodeMaterial}.
 *
 * @augments LightingModel
 */
declare class BasicLightingModel extends LightingModel {
    /**
     * Implements the baked indirect lighting with its modulation.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    indirect({ context }: NodeBuilder): void;
    /**
     * Implements the environment mapping.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    finish(builder: NodeBuilder): void;
}
import LightingModel from '../core/LightingModel.js';
