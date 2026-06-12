/**
 * A class with loader utility functions.
 */
export class LoaderUtils {
    /**
     * Extracts the base URL from the given URL.
     *
     * @param {string} url -The URL to extract the base URL from.
     * @return {string} The extracted base URL.
     */
    static extractUrlBase(url: string): string;
    /**
     * Resolves relative URLs against the given path. Absolute paths, data urls,
     * and blob URLs will be returned as is. Invalid URLs will return an empty
     * string.
     *
     * @param {string} url -The URL to resolve.
     * @param {string} path - The base path for relative URLs to be resolved against.
     * @return {string} The resolved URL.
     */
    static resolveURL(url: string, path: string): string;
}
