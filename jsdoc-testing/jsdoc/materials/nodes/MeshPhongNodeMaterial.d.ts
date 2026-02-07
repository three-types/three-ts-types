export default MeshPhongNodeMaterial;
/**
 * Node material version of {@link MeshPhongMaterial}.
 *
 * @augments NodeMaterial
 */
declare class MeshPhongNodeMaterial extends NodeMaterial {
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
    readonly isMeshPhongNodeMaterial: boolean;
    /**
     * The shininess of phong materials is by default inferred from the `shininess`
     * property. This node property allows to overwrite the default
     * and define the shininess with a node instead.
     *
     * If you don't want to overwrite the shininess but modify the existing
     * value instead, use {@link materialShininess}.
     *
     * @type {?Node<float>}
     * @default null
     */
    shininessNode: Node<any> | null;
    /**
     * The specular color of phong materials is by default inferred from the
     * `specular` property. This node property allows to overwrite the default
     * and define the specular color with a node instead.
     *
     * If you don't want to overwrite the specular color but modify the existing
     * value instead, use {@link materialSpecular}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    specularNode: Node<vec3> | null;
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
    copy(source: any): NodeMaterial;
}
import NodeMaterial from './NodeMaterial.js';
import BasicEnvironmentNode from '../../nodes/lighting/BasicEnvironmentNode.js';
import PhongLightingModel from '../../nodes/functions/PhongLightingModel.js';
