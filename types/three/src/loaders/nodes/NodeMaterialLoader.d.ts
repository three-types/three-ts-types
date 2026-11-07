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
        [x: string]: new(...args: any[]) => Node;
    };
    /**
     * Represents a dictionary of node material types.
     *
     * @type {Object<string,NodeMaterial.constructor>}
     */
    nodeMaterials: {
        [x: string]: new() => NodeMaterial;
    };
    /**
     * Parses the node material from the given JSON.
     *
     * @param {Object} json - The JSON definition
     * @return {NodeMaterial}. The parsed material.
     */
    parse(json: unknown): NodeMaterial;
    /**
     * Defines the dictionary of node types.
     *
     * @param {Object<string,Node.constructor>} value - The node library defined as `<classname,class>`.
     * @return {NodeLoader} A reference to this loader.
     */
    setNodes(value: {
        [x: string]: new(...args: any[]) => Node;
    }): this;
    /**
     * Defines the dictionary of node material types.
     *
     * @param {Object<string,NodeMaterial.constructor>} value - The node material library defined as `<classname,class>`.
     * @return {NodeLoader} A reference to this loader.
     */
    setNodeMaterials(value: {
        [x: string]: new() => NodeMaterial;
    }): this;
    /**
     * Creates a node material from the given type.
     *
     * @param {string} type - The node material type.
     * @return {Node} The created node material instance.
     */
    createMaterialFromType(type: string): NodeMaterial;
}
import { MaterialLoader } from "../../loaders/MaterialLoader.js";
import NodeMaterial from "../../materials/nodes/NodeMaterial.js";
import { Node } from "../../nodes/Nodes.js";
