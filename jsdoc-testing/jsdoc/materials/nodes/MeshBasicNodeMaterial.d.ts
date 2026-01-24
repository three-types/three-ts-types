export default MeshBasicNodeMaterial;
/**
 * Node material version of {@link MeshBasicMaterial}.
 *
 * @augments NodeMaterial
 */
declare class MeshBasicNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new mesh basic node material.
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
    readonly isMeshBasicNodeMaterial: boolean;
    /**
     * Overwritten since this type of material uses {@link BasicEnvironmentNode}
     * to implement the default environment mapping.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {?BasicEnvironmentNode<vec3>} The environment node.
     */
    setupEnvironment(builder: NodeBuilder): BasicEnvironmentNode<vec3> | null;
    /**
     * Setups the lighting model.
     *
     * @return {BasicLightingModel} The lighting model.
     */
    setupLightingModel(): BasicLightingModel;
}
import NodeMaterial from './NodeMaterial.js';
import BasicEnvironmentNode from '../../nodes/lighting/BasicEnvironmentNode.js';
import BasicLightingModel from '../../nodes/functions/BasicLightingModel.js';
