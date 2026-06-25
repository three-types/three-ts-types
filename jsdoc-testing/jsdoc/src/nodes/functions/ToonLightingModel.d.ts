export default ToonLightingModel;
/**
 * Represents the lighting model for a toon material. Used in {@link MeshToonNodeMaterial}.
 *
 * @augments LightingModel
 */
declare class ToonLightingModel extends LightingModel {
    /**
     * Implements the direct lighting. Instead of using a conventional smooth irradiance, the irradiance is
     * reduced to a small number of discrete shades to create a comic-like, flat look.
     *
     * @param {Object} lightData - The light data.
     * @param {NodeBuilder} builder - The current node builder.
     */
    direct({ lightDirection, lightColor, reflectedLight }: Object, builder: NodeBuilder): void;
    /**
     * Implements the indirect lighting.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    indirect(builder: NodeBuilder): void;
}
import LightingModel from '../core/LightingModel.js';
