/**
 * A loader for the MaterialX format.
 *
 * The node materials loaded with this loader can only be used with {@link WebGPURenderer}.
 *
 * ```js
 * const loader = new MaterialXLoader().setPath( SAMPLE_PATH );
 * const materials = await loader.loadAsync( 'standard_surface_brass_tiled.mtlx' );
 * ```
 *
 * @augments Loader
 * @three_import import { MaterialXLoader } from 'three/addons/loaders/MaterialXLoader.js';
 */
export class MaterialXLoader extends Loader {
    /**
     * Constructs a new MaterialX loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded MaterialX asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Object<string,NodeMaterial>)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     * @return {MaterialXLoader} A reference to this loader.
     */
    load(url: string, onLoad: (arg0: {
        [x: string]: NodeMaterial;
    }) => any, onProgress: onProgressCallback, onError: onErrorCallback): MaterialXLoader;
    /**
     * Parses the given MaterialX data and returns the resulting materials.
     *
     * Supported standard_surface inputs:
     * - base, base_color: Base color/albedo
     * - opacity: Alpha/transparency
     * - specular_roughness: Surface roughness
     * - metalness: Metallic property
     * - specular: Specular reflection intensity
     * - specular_color: Specular reflection color
     * - ior: Index of refraction
     * - specular_anisotropy, specular_rotation: Anisotropic reflection
     * - transmission, transmission_color: Transmission properties
     * - thin_film_thickness, thin_film_ior: Thin film interference
     * - sheen, sheen_color, sheen_roughness: Sheen properties
     * - normal: Normal map
     * - coat, coat_roughness, coat_color: Clearcoat properties
     * - emission, emissionColor: Emission properties
     *
     * @param {string} text - The raw MaterialX data as a string.
     * @return {Object<string,NodeMaterial>} A dictionary holding the parse node materials.
     */
    parse(text: string): {
        [x: string]: NodeMaterial;
    };
}
import { Loader } from 'three/webgpu';
