/**
 * Class for loading materials. The files are internally
 * loaded via {@link FileLoader}.
 *
 * ```js
 * const loader = new THREE.MaterialLoader();
 * const material = await loader.loadAsync( 'material.json' );
 * ```
 * This loader does not support node materials. Use {@link NodeMaterialLoader} instead.
 *
 * @augments Loader
 */
export class MaterialLoader extends Loader {
    /**
     * Creates a material for the given type.
     *
     * @static
     * @param {string} type - The material type.
     * @return {Material} The new material.
     */
    static createMaterialFromType(type: string): Material;
    /**
     * A dictionary holding textures used by the material.
     *
     * @type {Object<string,Texture>}
     */
    textures: {
        [x: string]: Texture;
    };
    /**
     * Starts loading from the given URL and pass the loaded material to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Material)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Material) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given JSON object and returns a material.
     *
     * @param {Object} json - The serialized material.
     * @return {Material} The parsed material.
     */
    parse(json: Object): Material;
    /**
     * Textures are not embedded in the material JSON so they have
     * to be injected before the loading process starts.
     *
     * @param {Object} value - A dictionary holding textures for material properties.
     * @return {MaterialLoader} A reference to this material loader.
     */
    setTextures(value: Object): MaterialLoader;
    /**
     * Creates a material for the given type.
     *
     * @param {string} type - The material type.
     * @return {Material} The new material.
     */
    createMaterialFromType(type: string): Material;
}
import { Loader } from './Loader.js';
import { Material } from '../materials/Materials.js';
