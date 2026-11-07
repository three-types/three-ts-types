export default MeshMatcapNodeMaterial;
/**
 * Node material version of {@link MeshMatcapMaterial}.
 *
 * @augments NodeMaterial
 */
declare class MeshMatcapNodeMaterial extends NodeMaterial {
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
    readonly isMeshMatcapNodeMaterial: boolean;
    /**
     * Setups the matcap specific node variables.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupVariants(builder: NodeBuilder): void;
}
import NodeMaterial from './NodeMaterial.js';
