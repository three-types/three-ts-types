export default MeshStandardNodeMaterial;
/**
 * Node material version of {@link MeshStandardMaterial}.
 *
 * @augments NodeMaterial
 */
declare class MeshStandardNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new mesh standard node material.
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
    readonly isMeshStandardNodeMaterial: boolean;
    /**
     * The emissive color of standard materials is by default inferred from the `emissive`,
     * `emissiveIntensity` and `emissiveMap` properties. This node property allows to
     * overwrite the default and define the emissive color with a node instead.
     *
     * If you don't want to overwrite the emissive color but modify the existing
     * value instead, use {@link materialEmissive}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    emissiveNode: Node<any> | null;
    /**
     * The metalness of standard materials is by default inferred from the `metalness`,
     * and `metalnessMap` properties. This node property allows to
     * overwrite the default and define the metalness with a node instead.
     *
     * If you don't want to overwrite the metalness but modify the existing
     * value instead, use {@link materialMetalness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    metalnessNode: Node<any> | null;
    /**
     * The roughness of standard materials is by default inferred from the `roughness`,
     * and `roughnessMap` properties. This node property allows to
     * overwrite the default and define the roughness with a node instead.
     *
     * If you don't want to overwrite the roughness but modify the existing
     * value instead, use {@link materialRoughness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    roughnessNode: Node<any> | null;
    /**
     * Overwritten since this type of material uses {@link EnvironmentNode}
     * to implement the PBR (PMREM based) environment mapping. Besides, the
     * method honors `Scene.environment`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {?EnvironmentNode<vec3>} The environment node.
     */
    setupEnvironment(builder: NodeBuilder): EnvironmentNode<any> | null;
    /**
     * Setups the lighting model.
     *
     * @return {PhysicalLightingModel} The lighting model.
     */
    setupLightingModel(): PhysicalLightingModel;
    /**
     * Setups the specular related node variables.
     */
    setupSpecular(): void;
    copy(source: any): NodeMaterial;
}
import NodeMaterial from './NodeMaterial.js';
import EnvironmentNode from '../../nodes/lighting/EnvironmentNode.js';
import PhysicalLightingModel from '../../nodes/functions/PhysicalLightingModel.js';
