export default NodeMaterialLoader;
/**
 * A special type of material loader for loading node materials.
 *
 * @augments MaterialLoader
 */
declare class NodeMaterialLoader extends MaterialLoader {
    /**
     * Represents a dictionary of node types.
     *
     * @type {Object<string,Node.constructor>}
     */
    nodes: {
        [x: string]: Node.constructor;
    };
    /**
     * Represents a dictionary of node material types.
     *
     * @type {Object<string,NodeMaterial.constructor>}
     */
    nodeMaterials: {
        [x: string]: NodeMaterial.constructor;
    };
    /**
     * Parses the node material from the given JSON.
     *
     * @param {Object} json - The JSON definition
     * @return {NodeMaterial}. The parsed material.
     */
    parse(json: Object): NodeMaterial;
    /**
     * Defines the dictionary of node types.
     *
     * @param {Object<string,Node.constructor>} value - The node library defined as `<classname,class>`.
     * @return {NodeLoader} A reference to this loader.
     */
    setNodes(value: {
        [x: string]: Node.constructor;
    }): NodeLoader;
    /**
     * Defines the dictionary of node material types.
     *
     * @param {Object<string,NodeMaterial.constructor>} value - The node material library defined as `<classname,class>`.
     * @return {NodeLoader} A reference to this loader.
     */
    setNodeMaterials(value: {
        [x: string]: NodeMaterial.constructor;
    }): NodeLoader;
    /**
     * Creates a node material from the given type.
     *
     * @param {string} type - The node material type.
     * @return {Node} The created node material instance.
     */
    createMaterialFromType(type: string): Node;
}
import { MaterialLoader } from '../../loaders/MaterialLoader.js';
