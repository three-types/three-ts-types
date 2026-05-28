export default ShadowNodeMaterial;
/**
 * Node material version of {@link ShadowMaterial}.
 *
 * @augments NodeMaterial
 */
declare class ShadowNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new shadow node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isShadowNodeMaterial: boolean;
    /**
     * Setups the lighting model.
     *
     * @return {ShadowMaskModel} The lighting model.
     */
    setupLightingModel(): ShadowMaskModel;
}
import NodeMaterial from './NodeMaterial.js';
import ShadowMaskModel from '../../nodes/functions/ShadowMaskModel.js';
