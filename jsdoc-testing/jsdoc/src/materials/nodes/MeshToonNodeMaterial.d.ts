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
     * The emissive color of toon materials is by default inferred from the `emissive`,
     * `emissiveIntensity` and `emissiveMap` properties. This node property allows to
     * overwrite the default and define the emissive color with a node instead.
     *
     * If you don't want to overwrite the emissive color but modify the existing
     * value instead, use {@link materialEmissive}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    emissiveNode: Node<vec3> | null;
    /**
     * Setups the lighting model.
     *
     * @return {ToonLightingModel} The lighting model.
     */
    setupLightingModel(): ToonLightingModel;
}
import NodeMaterial from './NodeMaterial.js';
import ToonLightingModel from '../../nodes/functions/ToonLightingModel.js';
