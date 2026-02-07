/**
 * Finds the minimum value in an array.
 *
 * @private
 * @param {Array<number>} array - The array to search for the minimum value.
 * @return {number} The minimum value in the array, or Infinity if the array is empty.
 */
export function arrayMin(array: Array<number>): number;
/**
 * Finds the maximum value in an array.
 *
 * @private
 * @param {Array<number>} array - The array to search for the maximum value.
 * @return {number} The maximum value in the array, or -Infinity if the array is empty.
 */
export function arrayMax(array: Array<number>): number;
/**
 * Checks if an array contains values that require Uint32 representation.
 *
 * This function determines whether the array contains any values >= 65535,
 * which would require a Uint32Array rather than a Uint16Array for proper storage.
 * The function iterates from the end of the array, assuming larger values are
 * typically located at the end.
 *
 * @private
 * @param {Array<number>} array - The array to check.
 * @return {boolean} True if the array contains values >= 65535, false otherwise.
 */
export function arrayNeedsUint32(array: Array<number>): boolean;
/**
 * Creates a typed array of the specified type from the given buffer.
 *
 * @private
 * @param {string} type - The name of the typed array type (e.g., 'Float32Array', 'Uint16Array').
 * @param {ArrayBuffer} buffer - The buffer to create the typed array from.
 * @return {TypedArray} A new typed array of the specified type.
 */
export function getTypedArray(type: string, buffer: ArrayBuffer): TypedArray;
/**
 * Creates an XHTML element with the specified tag name.
 *
 * This function uses the XHTML namespace to create DOM elements,
 * ensuring proper element creation in XML-based contexts.
 *
 * @private
 * @param {string} name - The tag name of the element to create (e.g., 'canvas', 'div').
 * @return {HTMLElement} The created XHTML element.
 */
export function createElementNS(name: string): HTMLElement;
/**
 * Creates a canvas element configured for block display.
 *
 * This is a convenience function that creates a canvas element with
 * display style set to 'block', which is commonly used in three.js
 * rendering contexts to avoid inline element spacing issues.
 *
 * @return {HTMLCanvasElement} A canvas element with display set to 'block'.
 */
export function createCanvasElement(): HTMLCanvasElement;
/**
 * Sets a custom function to handle console output.
 *
 * This allows external code to intercept and handle console.log, console.warn,
 * and console.error calls made by three.js, which is useful for custom logging,
 * testing, or debugging workflows.
 *
 * @param {Function} fn - The function to handle console output. Should accept
 *                        (type, message, ...params) where type is 'log', 'warn', or 'error'.
 */
export function setConsoleFunction(fn: Function): void;
/**
 * Gets the currently set custom console function.
 *
 * @return {Function|null} The custom console function, or null if not set.
 */
export function getConsoleFunction(): Function | null;
/**
 * Logs an informational message with the 'THREE.' prefix.
 *
 * If a custom console function is set via setConsoleFunction(), it will be used
 * instead of the native console.log. The first parameter is treated as the
 * method name and is automatically prefixed with 'THREE.'.
 *
 * @param {...any} params - The message components. The first param is used as
 *                          the method name and prefixed with 'THREE.'.
 */
export function log(...params: any[]): void;
/**
 * Logs a warning message with the 'THREE.' prefix.
 *
 * If a custom console function is set via setConsoleFunction(), it will be used
 * instead of the native console.warn. The first parameter is treated as the
 * method name and is automatically prefixed with 'THREE.'.
 *
 * @param {...any} params - The message components. The first param is used as
 *                          the method name and prefixed with 'THREE.'.
 */
export function warn(...params: any[]): void;
/**
 * Logs an error message with the 'THREE.' prefix.
 *
 * If a custom console function is set via setConsoleFunction(), it will be used
 * instead of the native console.error. The first parameter is treated as the
 * method name and is automatically prefixed with 'THREE.'.
 *
 * @param {...any} params - The message components. The first param is used as
 *                          the method name and prefixed with 'THREE.'.
 */
export function error(...params: any[]): void;
/**
 * Logs a warning message only once, preventing duplicate warnings.
 *
 * This function maintains an internal cache of warning messages and will only
 * output each unique warning message once. Useful for warnings that may be
 * triggered repeatedly but should only be shown to the user once.
 *
 * @param {...any} params - The warning message components.
 */
export function warnOnce(...params: any[]): void;
/**
 * Asynchronously probes for WebGL sync object completion.
 *
 * This function creates a promise that resolves when the WebGL sync object
 * signals completion or rejects if the sync operation fails. It uses polling
 * at the specified interval to check the sync status without blocking the
 * main thread. This is useful for GPU-CPU synchronization in WebGL contexts.
 *
 * @private
 * @param {WebGLRenderingContext|WebGL2RenderingContext} gl - The WebGL rendering context.
 * @param {WebGLSync} sync - The WebGL sync object to wait for.
 * @param {number} interval - The polling interval in milliseconds.
 * @return {Promise<void>} A promise that resolves when the sync completes or rejects if it fails.
 */
export function probeAsync(gl: WebGLRenderingContext | WebGL2RenderingContext, sync: WebGLSync, interval: number): Promise<void>;
/**
 * Converts a projection matrix from normalized device coordinates (NDC)
 * range [-1, 1] to [0, 1].
 *
 * This conversion is commonly needed when working with depth textures or
 * render targets that expect depth values in the [0, 1] range rather than
 * the standard OpenGL NDC range of [-1, 1]. The function modifies the
 * projection matrix in place.
 *
 * @private
 * @param {Matrix4} projectionMatrix - The projection matrix to convert (modified in place).
 */
export function toNormalizedProjectionMatrix(projectionMatrix: Matrix4): void;
/**
 * Reverses the depth range of a projection matrix.
 *
 * This function inverts the depth mapping of a projection matrix, which is
 * useful for reversed-Z depth buffer techniques that can improve depth
 * precision. The function handles both perspective and orthographic projection
 * matrices differently and modifies the matrix in place.
 *
 * For perspective matrices (where m[11] === -1), the depth mapping is
 * reversed with an offset. For orthographic matrices, a simpler reversal
 * is applied.
 *
 * @private
 * @param {Matrix4} projectionMatrix - The projection matrix to reverse (modified in place).
 */
export function toReversedProjectionMatrix(projectionMatrix: Matrix4): void;
/**
 * Returns `true` if the given object is a typed array.
 *
 * @param {any} array - The object to check.
 * @return {boolean} Whether the given object is a typed array.
 */
export function isTypedArray(array: any): boolean;
