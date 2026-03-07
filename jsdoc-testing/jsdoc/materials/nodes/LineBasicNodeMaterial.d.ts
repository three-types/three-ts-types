export default LineBasicNodeMaterial;
/**
 * Node material version of {@link LineBasicMaterial}.
 *
 * @augments NodeMaterial
 */
declare class LineBasicNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new line basic node material.
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
    readonly isLineBasicNodeMaterial: boolean;
}
import NodeMaterial from './NodeMaterial.js';
