/**
 * A loader for the MaterialX format.
 *
 * The node materials loaded with this loader can only be used with {@link WebGPURenderer}.
 * Besides plain `.mtlx` documents, the loader accepts `.mtlx.zip` archives that bundle a
 * document with its textures.
 *
 * ```js
 * const loader = new MaterialXLoader().setPath( SAMPLE_PATH );
 * const { materials } = await loader.loadAsync( 'standard_surface_brass_tiled.mtlx' );
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
     * Releases the resources of the last loaded archive, if any.
     *
     * @private
     * @type {?Function}
     */
    private archiveDisposer;
    /**
     * Frees the resources of the last loaded archive.
     *
     * @return {MaterialXLoader} A reference to this loader.
     */
    dispose(): MaterialXLoader;
    /**
     * Starts loading from the given URL and passes the loaded MaterialX asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Object)} onLoad - Executed when the loading process has been finished. Receives the parse result, see {@link MaterialXLoader#parse}.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     * @param {Object} [options] - Parse options, see {@link MaterialXLoader#parse}.
     * @return {MaterialXLoader} A reference to this loader.
     */
    load(url: string, onLoad: (arg0: Object) => any, onProgress: onProgressCallback, onError: onErrorCallback, options?: Object): MaterialXLoader;
    /**
     * Async version of {@link MaterialXLoader#load}. The progress callback can be
     * omitted and the parse options passed as the second argument instead.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {onProgressCallback|Object} [onProgress] - Executed while the loading is in progress, or the parse options.
     * @param {Object} [options] - Parse options, see {@link MaterialXLoader#parse}.
     * @return {Promise<Object>} A Promise that resolves with the parse result.
     */
    loadAsync(url: string, onProgress?: onProgressCallback | Object, options?: Object): Promise<Object>;
    /**
     * Parses a raw MaterialX document or a `.mtlx.zip` archive and returns the resulting materials.
     *
     * @param {ArrayBuffer|Uint8Array|string} data - The MaterialX document or archive.
     * @param {string} [url=''] - The URL the data was loaded from, used to resolve relative resource paths.
     * @param {Object} [options] - Parse options, see {@link MaterialXLoader#parse}.
     * @return {Object} The parse result, see {@link MaterialXLoader#parse}.
     */
    parseBuffer(data: ArrayBuffer | Uint8Array | string, url?: string, options?: Object): Object;
    _parseBuffer(data: any, url?: string, options?: {}): {
        document: MaterialXDocument;
        log: MaterialXLog;
        result: {
            materials: any;
            log: any;
            errors: any;
            warnings: any;
        };
    };
    /**
     * Parses the given MaterialX document and returns the resulting materials
     * together with the translation log.
     *
     * @param {string} text - The raw MaterialX data as a string.
     * @param {Object} [options] - Parse options.
     * @param {string} [options.path] - The base path for resolving resources like textures. Defaults to the loader's path.
     * @param {string} [options.materialName] - Only translate the material with this name. Defaults to all materials.
     * @param {string} [options.uvSpace='bottom-left'] - The UV space of the document's textures, `'bottom-left'` or `'top-left'`.
     * @param {Function} [options.interfaceValidator] - Validates node interfaces, see `createStrictInterfaceValidator()` in `MaterialXInterfaceValidation.js`.
     * @param {boolean} [options.throwOnErrors=true] - Whether translation errors throw or are only reported in the log.
     * @return {{materials: Object<string,NodeMaterial>, log: Array<Object>, errors: Array<Object>, warnings: Array<Object>}} The materials keyed by name and the translation log.
     */
    parse(text: string, options?: {
        path?: string | undefined;
        materialName?: string | undefined;
        uvSpace?: string | undefined;
        interfaceValidator?: Function | undefined;
        throwOnErrors?: boolean | undefined;
    }): {
        materials: {
            [x: string]: NodeMaterial;
        };
        log: Array<Object>;
        errors: Array<Object>;
        warnings: Array<Object>;
    };
    _parse(text: any, options?: {}): {
        document: MaterialXDocument;
        log: MaterialXLog;
        result: {
            materials: any;
            log: any;
            errors: any;
            warnings: any;
        };
    };
    _throwOnErrors(log: any, options: any): void;
}
import { Loader } from 'three/webgpu';
import { MaterialXDocument } from './materialx/MaterialXDocument.js';
import { MaterialXLog } from './materialx/MaterialXLog.js';
