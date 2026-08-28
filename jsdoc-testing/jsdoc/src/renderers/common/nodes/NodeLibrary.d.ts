export default NodeLibrary;
/**
 * The purpose of a node library is to assign node implementations
 * to existing library features. In `WebGPURenderer` lights, materials
 * which are not based on `NodeMaterial` as well as tone mapping techniques
 * are implemented with node-based modules.
 *
 * @private
 */
declare class NodeLibrary {
    /**
     * A weak map that maps lights to light nodes.
     *
     * @type {WeakMap<Light.constructor,AnalyticLightNode.constructor>}
     */
    lightNodes: WeakMap<Light.constructor, AnalyticLightNode.constructor>;
    /**
     * A map that maps materials to node materials.
     *
     * @type {Map<string,NodeMaterial.constructor>}
     */
    materialNodes: Map<string, NodeMaterial.constructor>;
    /**
     * A map that maps tone mapping techniques (constants)
     * to tone mapping node functions.
     *
     * @type {Map<number,Function>}
     */
    toneMappingNodes: Map<number, Function>;
    /**
     * Returns a matching node material instance for the given material object.
     *
     * This method also assigns/copies the properties of the given material object
     * to the node material. This is done to make sure the current material
     * configuration carries over to the node version.
     *
     * @param {Material} material - A material.
     * @return {NodeMaterial} The corresponding node material.
     */
    fromMaterial(material: Material): NodeMaterial;
    /**
     * Adds a tone mapping node function for a tone mapping technique (constant).
     *
     * @param {Function} toneMappingNode - The tone mapping node function.
     * @param {number} toneMapping - The tone mapping.
     */
    addToneMapping(toneMappingNode: Function, toneMapping: number): void;
    /**
     * Returns a tone mapping node function for a tone mapping technique (constant).
     *
     * @param {number} toneMapping - The tone mapping.
     * @return {?Function} The tone mapping node function. Returns `null` if no node function is found.
     */
    getToneMappingFunction(toneMapping: number): Function | null;
    /**
     * Returns a node material class definition for a material type.
     *
     * @param {string} materialType - The material type.
     * @return {?NodeMaterial.constructor} The node material class definition. Returns `null` if no node material is found.
     */
    getMaterialNodeClass(materialType: string): NodeMaterial.constructor | null;
    /**
     * Adds a node material class definition for a given material type.
     *
     * @param {NodeMaterial.constructor} materialNodeClass - The node material class definition.
     * @param {string} materialClassType - The material type.
     */
    addMaterial(materialNodeClass: NodeMaterial.constructor, materialClassType: string): void;
    /**
     * Returns a light node class definition for a light class definition.
     *
     * @param {Light.constructor} light - The light class definition.
     * @return {?AnalyticLightNode.constructor} The light node class definition. Returns `null` if no light node is found.
     */
    getLightNodeClass(light: Light.constructor): AnalyticLightNode.constructor | null;
    /**
     * Adds a light node class definition for a given light class definition.
     *
     * @param {AnalyticLightNode.constructor} lightNodeClass - The light node class definition.
     * @param {Light.constructor} lightClass - The light class definition.
     */
    addLight(lightNodeClass: AnalyticLightNode.constructor, lightClass: Light.constructor): void;
    /**
     * Adds a node class definition for the given type to the provided type library.
     *
     * @param {Node.constructor} nodeClass - The node class definition.
     * @param {number|string} type - The object type.
     * @param {Map<number|string,Node.constructor>} library - The type library.
     */
    addType(nodeClass: Node.constructor, type: number | string, library: Map<number | string, Node.constructor>): void;
    /**
     * Adds a node class definition for the given class definition to the provided type library.
     *
     * @param {Node.constructor} nodeClass - The node class definition.
     * @param {Node.constructor} baseClass - The class definition.
     * @param {WeakMap<Node.constructor, Node.constructor>} library - The type library.
     */
    addClass(nodeClass: Node.constructor, baseClass: Node.constructor, library: WeakMap<Node.constructor, Node.constructor>): void;
}
