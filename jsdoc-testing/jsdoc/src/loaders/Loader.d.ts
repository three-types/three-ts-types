/**
 * Callback for onProgress in loaders.
 */
export type onProgressCallback = (event: ProgressEvent) => any;
/**
 * Callback for onError in loaders.
 */
export type onErrorCallback = (error: Error) => any;
/**
 * Abstract base class for loaders.
 *
 * @abstract
 */
export class Loader {
    /**
     * Constructs a new loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * The loading manager.
     *
     * @type {LoadingManager}
     * @default DefaultLoadingManager
     */
    manager: LoadingManager;
    /**
     * The crossOrigin string to implement CORS for loading the url from a
     * different domain that allows CORS.
     *
     * @type {string}
     * @default 'anonymous'
     */
    crossOrigin: string;
    /**
     * Whether the XMLHttpRequest uses credentials.
     *
     * @type {boolean}
     * @default false
     */
    withCredentials: boolean;
    /**
     * The base path from which the asset will be loaded.
     *
     * @type {string}
     */
    path: string;
    /**
     * The base path from which additional resources like textures will be loaded.
     *
     * @type {string}
     */
    resourcePath: string;
    /**
     * The [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)
     * used in HTTP request.
     *
     * @type {Object<string, any>}
     */
    requestHeader: {
        [x: string]: any;
    };
    /**
     * This method needs to be implemented by all concrete loaders. It holds the
     * logic for loading assets from the backend.
     *
     * @abstract
     * @param {string} url - The path/URL of the file to be loaded.
     * @param {Function} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
     * @param {onErrorCallback} [onError] - Executed when errors occur.
     */
    load(): void;
    /**
     * A async version of {@link Loader#load}.
     *
     * @param {string} url - The path/URL of the file to be loaded.
     * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
     * @return {Promise} A Promise that resolves when the asset has been loaded.
     */
    loadAsync(url: string, onProgress?: onProgressCallback): Promise<any>;
    /**
     * This method needs to be implemented by all concrete loaders. It holds the
     * logic for parsing the asset into three.js entities.
     *
     * @abstract
     * @param {any} data - The data to parse.
     */
    parse(): void;
    /**
     * Sets the `crossOrigin` String to implement CORS for loading the URL
     * from a different domain that allows CORS.
     *
     * @param {string} crossOrigin - The `crossOrigin` value.
     * @return {Loader} A reference to this instance.
     */
    setCrossOrigin(crossOrigin: string): Loader;
    /**
     * Whether the XMLHttpRequest uses credentials such as cookies, authorization
     * headers or TLS client certificates, see [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).
     *
     * Note: This setting has no effect if you are loading files locally or from the same domain.
     *
     * @param {boolean} value - The `withCredentials` value.
     * @return {Loader} A reference to this instance.
     */
    setWithCredentials(value: boolean): Loader;
    /**
     * Sets the base path for the asset.
     *
     * @param {string} path - The base path.
     * @return {Loader} A reference to this instance.
     */
    setPath(path: string): Loader;
    /**
     * Sets the base path for dependent resources like textures.
     *
     * @param {string} resourcePath - The resource path.
     * @return {Loader} A reference to this instance.
     */
    setResourcePath(resourcePath: string): Loader;
    /**
     * Sets the given request header.
     *
     * @param {Object} requestHeader - A [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)
     * for configuring the HTTP request.
     * @return {Loader} A reference to this instance.
     */
    setRequestHeader(requestHeader: Object): Loader;
    /**
     * This method can be implemented in loaders for aborting ongoing requests.
     *
     * @abstract
     * @return {Loader} A reference to this instance.
     */
    abort(): Loader;
}
export namespace Loader {
    let DEFAULT_MATERIAL_NAME: string;
}
