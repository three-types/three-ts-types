export default WebGLExtensions;
/**
 * A WebGL 2 backend utility module for managing extensions.
 *
 * @private
 */
declare class WebGLExtensions {
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
     * A list with all the supported WebGL extensions.
     *
     * @type {Array<string>}
     */
    availableExtensions: Array<string>;
    /**
     * A dictionary with requested WebGL extensions.
     * The key is the name of the extension, the value
     * the requested extension object.
     *
     * @type {Object<string,Object>}
     */
    extensions: {
        [x: string]: Object;
    };
    /**
     * Returns the extension object for the given extension name.
     *
     * @param {string} name - The extension name.
     * @return {Object} The extension object.
     */
    get(name: string): Object;
    /**
     * Returns `true` if the requested extension is available.
     *
     * @param {string} name - The extension name.
     * @return {boolean} Whether the given extension is available or not.
     */
    has(name: string): boolean;
}
