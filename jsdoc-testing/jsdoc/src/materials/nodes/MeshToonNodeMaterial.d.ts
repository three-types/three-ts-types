export default MeshToonNodeMaterial;
/**
 * Node material version of {@link MeshToonMaterial}.
 *
 * @augments NodeMaterial
 */
declare class MeshToonNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new mesh toon node material.
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
    readonly isMeshToonNodeMaterial: boolean;
    /**
     * Setups the lighting model.
     *
     * @return {ToonLightingModel} The lighting model.
     */
    setupLightingModel(): ToonLightingModel;
}
import NodeMaterial from './NodeMaterial.js';
import ToonLightingModel from '../../nodes/functions/ToonLightingModel.js';
