export default MeshLambertNodeMaterial;
/**
 * Node material version of {@link MeshLambertMaterial}.
 *
 * @augments NodeMaterial
 */
declare class MeshLambertNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new mesh lambert node material.
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
    readonly isMeshLambertNodeMaterial: boolean;
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
     * @return {PhongLightingModel} The lighting model.
     */
    setupLightingModel(): PhongLightingModel;
}
import NodeMaterial from './NodeMaterial.js';
import BasicEnvironmentNode from '../../nodes/lighting/BasicEnvironmentNode.js';
import PhongLightingModel from '../../nodes/functions/PhongLightingModel.js';
