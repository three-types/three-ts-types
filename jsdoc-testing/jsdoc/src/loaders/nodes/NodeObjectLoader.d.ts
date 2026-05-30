export default NodeObjectLoader;
/**
 * A special type of object loader for loading 3D objects using
 * node materials.
 *
 * @augments ObjectLoader
 */
declare class NodeObjectLoader extends ObjectLoader {
    /**
     * Constructs a new node object loader.
     *
     * @param {LoadingManager} [manager] - A reference to a loading manager.
     */
    constructor(manager?: LoadingManager);
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
     * A reference to hold the `nodes` JSON property.
     *
     * @private
     * @type {?Object[]}
     */
    private _nodesJSON;
    /**
     * Defines the dictionary of node types.
     *
     * @param {Object<string,Node.constructor>} value - The node library defined as `<classname,class>`.
     * @return {NodeObjectLoader} A reference to this loader.
     */
    setNodes(value: {
        [x: string]: Node.constructor;
    }): NodeObjectLoader;
    /**
     * Defines the dictionary of node material types.
     *
     * @param {Object<string,NodeMaterial.constructor>} value - The node material library defined as `<classname,class>`.
     * @return {NodeObjectLoader} A reference to this loader.
     */
    setNodeMaterials(value: {
        [x: string]: NodeMaterial.constructor;
    }): NodeObjectLoader;
    /**
     * Parses the node objects from the given JSON.
     *
     * @param {Object} json - The JSON definition
     * @param {Function} onLoad - The onLoad callback function.
     * @return {Object3D}. The parsed 3D object.
     */
    parse(json: Object, onLoad: Function): Object3D;
    /**
     * Async version of {@link NodeObjectLoader#parse}.
     *
     * @param {Object} json - The JSON definition
     * @return {Promise<Object3D>} A Promise that resolves with the parsed 3D object.
     */
    parseAsync(json: Object): Promise<Object3D>;
    /**
     * Parses the node objects from the given JSON and textures.
     *
     * @param {Object[]} json - The JSON definition
     * @param {Object<string,Texture>} textures - The texture library.
     * @return {Object<string,Node>}. The parsed nodes.
     */
    parseNodes(json: Object[], textures: {
        [x: string]: Texture;
    }): {
        [x: string]: Node;
    };
    /**
     * Parses the node objects from the given JSON and textures.
     *
     * @param {Object} json - The JSON definition
     * @param {Object<string,Texture>} textures - The texture library.
     * @return {Object<string,NodeMaterial>}. The parsed materials.
     */
    parseMaterials(json: Object, textures: {
        [x: string]: Texture;
    }): {
        [x: string]: NodeMaterial;
    };
}
import { ObjectLoader } from '../../loaders/ObjectLoader.js';
