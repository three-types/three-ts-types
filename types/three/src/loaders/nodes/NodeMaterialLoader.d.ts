export default NodeMaterialLoader;
/**
 * A special type of material loader for loading node materials.
 *
 * @augments MaterialLoader
 */
declare class NodeMaterialLoader extends MaterialLoader {
    /**
     * Represents a dictionary of deserialized node instances, keyed by UUID.
     * They are assigned to the node properties of the parsed material.
     *
     * @type {Object<string,Node>}
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
     * @return {Material} The parsed material.
     */
    parse(json: unknown): NodeMaterial;
    /**
     * Defines the dictionary of deserialized node instances.
     *
     * @param {Object<string,Node>} value - The node instances defined as `<uuid,node>`.
     * @return {NodeMaterialLoader} A reference to this loader.
     */
    setNodes(value: {
        [x: string]: new(...args: any[]) => Node;
    }): this;
    /**
     * Defines the dictionary of node material types.
     *
     * @param {Object<string,NodeMaterial.constructor>} value - The node material library defined as `<classname,class>`.
     * @return {NodeMaterialLoader} A reference to this loader.
     */
    setNodeMaterials(value: {
        [x: string]: new() => NodeMaterial;
    }): this;
    /**
     * Creates a node material from the given type.
     *
     * @param {string} type - The node material type.
     * @return {Material} The created material instance.
     */
    createMaterialFromType(type: string): NodeMaterial;
}
import { MaterialLoader } from "../../loaders/MaterialLoader.js";
import NodeMaterial from "../../materials/nodes/NodeMaterial.js";
import { Node } from "../../nodes/Nodes.js";
