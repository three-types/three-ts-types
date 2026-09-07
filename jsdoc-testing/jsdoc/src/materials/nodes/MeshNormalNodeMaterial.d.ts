export default MeshNormalNodeMaterial;
/**
 * Node material version of {@link MeshNormalMaterial}.
 *
 * @augments NodeMaterial
 */
declare class MeshNormalNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new mesh normal node material.
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
    readonly isMeshNormalNodeMaterial: boolean;
    /**
     * Overwrites the default implementation by computing the diffuse color
     * based on the normal data.
     */
    setupDiffuseColor(): void;
}
import NodeMaterial from './NodeMaterial.js';
