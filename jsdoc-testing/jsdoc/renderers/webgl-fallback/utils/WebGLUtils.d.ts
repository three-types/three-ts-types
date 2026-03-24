export default WebGLUtils;
/**
 * A WebGL 2 backend utility module with common helpers.
 *
 * @private
 */
declare class WebGLUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGLBackend} backend - The WebGL 2 backend.
     */
    constructor(backend: WebGLBackend);
    /**
     * A reference to the WebGL 2 backend.
     *
     * @type {WebGLBackend}
     */
    backend: WebGLBackend;
    /**
     * A reference to the rendering context.
     *
     * @type {WebGL2RenderingContext}
     */
    gl: WebGL2RenderingContext;
    /**
     * A reference to a backend module holding extension-related
     * utility functions.
     *
     * @type {WebGLExtensions}
     */
    extensions: WebGLExtensions;
    /**
     * Converts the given three.js constant into a WebGL constant.
     * The method currently supports the conversion of texture formats
     * and types.
     *
     * @param {number} p - The three.js constant.
     * @param {string} [colorSpace=NoColorSpace] - The color space.
     * @return {?number} The corresponding WebGL constant.
     */
    convert(p: number, colorSpace?: string): number | null;
    /**
     * This method can be used to synchronize the CPU with the GPU by waiting until
     * ongoing GPU commands have been completed.
     *
     * @private
     * @return {Promise} A promise that resolves when all ongoing GPU commands have been completed.
     */
    private _clientWaitAsync;
}
