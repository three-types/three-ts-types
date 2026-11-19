/**
 * A low level class for loading resources with the Fetch API, used internally by
 * most loaders. It can also be used directly to load any file type that does
 * not have a loader.
 *
 * This loader supports caching. If you want to use it, add `THREE.Cache.enabled = true;`
 * once to your application.
 *
 * ```js
 * const loader = new THREE.FileLoader();
 * const data = await loader.loadAsync( 'example.txt' );
 * ```
 *
 * @augments Loader
 */
export class FileLoader extends Loader {
    /**
     * The expected mime type. Valid values can be found
     * [here](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString#mimetype)
     *
     * @type {string}
     */
    mimeType: string;
    /**
     * The expected response type.
     *
     * @type {('arraybuffer'|'blob'|'document'|'json'|'')}
     * @default ''
     */
    responseType: ("arraybuffer" | "blob" | "document" | "json" | "");
    /**
     * Used for aborting requests.
     *
     * @private
     * @type {AbortController}
     */
    private _abortController;
    /**
     * Starts loading from the given URL and pass the loaded response to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(any)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
     * @param {onErrorCallback} [onError] - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: any) => any, onProgress?: onProgressCallback, onError?: onErrorCallback): void;
    /**
     * Sets the expected response type.
     *
     * @param {('arraybuffer'|'blob'|'document'|'json'|'')} value - The response type.
     * @return {FileLoader} A reference to this file loader.
     */
    setResponseType(value: ("arraybuffer" | "blob" | "document" | "json" | "")): FileLoader;
    /**
     * Sets the expected mime type of the loaded file.
     *
     * @param {string} value - The mime type.
     * @return {FileLoader} A reference to this file loader.
     */
    setMimeType(value: string): FileLoader;
    /**
     * Aborts ongoing fetch requests.
     *
     * @return {FileLoader} A reference to this instance.
     */
    abort(): FileLoader;
}
import { Loader } from './Loader.js';
