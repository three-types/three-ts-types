export default NodeLoader;
/**
 * A loader for loading node objects in the three.js JSON Object/Scene format.
 *
 * @augments Loader
 */
declare class NodeLoader extends Loader {
    /**
     * Represents a dictionary of textures.
     *
     * @type {Object<string,Texture>}
     */
    textures: {
        [x: string]: Texture;
    };
    /**
     * Represents a dictionary of node types.
     *
     * @type {Object<string,Node.constructor>}
     */
    nodes: {
        [x: string]: Node.constructor;
    };
    /**
     * Loads the node definitions from the given URL.
     *
     * @param {string} url - The path/URL of the file to be loaded.
     * @param {Function} onLoad - Will be called when load completes.
     * @param {Function} onProgress - Will be called while load progresses.
     * @param {Function} onError - Will be called when errors are thrown during the loading process.
     */
    load(url: string, onLoad: Function, onProgress: Function, onError: Function): void;
    /**
     * Parse the node dependencies for the loaded node.
     *
     * @param {Array<Object>} [json] - The JSON definition
     * @return {Object<string,Node>} A dictionary with node dependencies.
     */
    parseNodes(json?: Array<Object>): {
        [x: string]: Node;
    };
    /**
     * Parses the node from the given JSON.
     *
     * @param {Object} json - The JSON definition
     * @param {string} json.type - The node type.
     * @param {string} json.uuid - The node UUID.
     * @param {Array<Object>} [json.nodes] - The node dependencies.
     * @param {Object} [json.meta] - The meta data.
     * @return {Node} The parsed node.
     */
    parse(json: {
        type: string;
        uuid: string;
        nodes?: Object[] | undefined;
        meta?: Object | undefined;
    }): Node;
    /**
     * Defines the dictionary of textures.
     *
     * @param {Object<string,Texture>} value - The texture library defines as `<uuid,texture>`.
     * @return {NodeLoader} A reference to this loader.
     */
    setTextures(value: {
        [x: string]: Texture;
    }): NodeLoader;
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
     * Creates a node object from the given type.
     *
     * @param {string} type - The node type.
     * @return {Node} The created node instance.
     */
    createNodeFromType(type: string): Node;
}
import { Loader } from '../Loader.js';
