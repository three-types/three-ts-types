/**
 * A loader for PLY the PLY format (known as the Polygon
 * File Format or the Stanford Triangle Format).
 *
 * Limitations:
 *  - ASCII decoding assumes file is UTF-8.
 *
 * ```js
 * const loader = new PLYLoader();
 * const geometry = await loader.loadAsync( './models/ply/ascii/dolphins.ply' );
 * scene.add( new THREE.Mesh( geometry ) );
 * ```
 *
 * @augments Loader
 * @three_import import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
 */
export class PLYLoader extends Loader {
    /**
     * Constructs a new PLY loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    propertyNameMapping: {};
    customPropertyMapping: {};
    /**
     * Starts loading from the given URL and passes the loaded PLY asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: BufferGeometry) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Sets a property name mapping that maps default property names
     * to custom ones. For example, the following maps the properties
     * “diffuse_(red|green|blue)” in the file to standard color names.
     *
     * ```js
     * loader.setPropertyNameMapping( {
     * 	diffuse_red: 'red',
     * 	diffuse_green: 'green',
     * 	diffuse_blue: 'blue'
     * } );
     * ```
     *
     * @param {Object} mapping - The mapping dictionary.
     */
    setPropertyNameMapping(mapping: Object): void;
    /**
     * Custom properties outside of the defaults for position, uv, normal
     * and color attributes can be added using the setCustomPropertyNameMapping method.
     * For example, the following maps the element properties “custom_property_a”
     * and “custom_property_b” to an attribute “customAttribute” with an item size of 2.
     * Attribute item sizes are set from the number of element properties in the property array.
     *
     * ```js
     * loader.setCustomPropertyNameMapping( {
     *	customAttribute: ['custom_property_a', 'custom_property_b'],
     * } );
     * ```
     * @param {Object} mapping - The mapping dictionary.
     */
    setCustomPropertyNameMapping(mapping: Object): void;
    /**
     * Parses the given PLY data and returns the resulting geometry.
     *
     * @param {ArrayBuffer} data - The raw PLY data as an array buffer.
     * @return {BufferGeometry} The parsed geometry.
     */
    parse(data: ArrayBuffer): BufferGeometry;
}
import { Loader } from 'three';
import { BufferGeometry } from 'three';
