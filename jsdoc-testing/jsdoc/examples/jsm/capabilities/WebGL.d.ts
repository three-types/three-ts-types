export default WebGL;
/**
 * A utility module with basic WebGL 2 capability testing.
 *
 * @hideconstructor
 * @three_import import WebGL from 'three/addons/capabilities/WebGL.js';
 */
declare class WebGL {
    /**
     * Returns `true` if WebGL 2 is available.
     *
     * @return {boolean} Whether WebGL 2 is available or not.
     */
    static isWebGL2Available(): boolean;
    /**
     * Returns `true` if the given color space is available. This method can only be used
     * if WebGL 2 is supported.
     *
     * @param {string} colorSpace - The color space to test.
     * @return {boolean} Whether the given color space is available or not.
     */
    static isColorSpaceAvailable(colorSpace: string): boolean;
    /**
     * Returns a `div` element representing a formatted error message that can be appended in
     * web sites if WebGL 2 isn't supported.
     *
     * @return {HTMLDivElement} A `div` element representing a formatted error message that WebGL 2 isn't supported.
     */
    static getWebGL2ErrorMessage(): HTMLDivElement;
    static _getErrorMessage(version: any): HTMLDivElement;
}
