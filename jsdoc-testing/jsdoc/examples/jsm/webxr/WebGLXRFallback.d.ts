/**
 * Sets up a construction-time WebGL fallback for WebGPU XR examples.
 *
 * @param {WebGPURenderer} renderer - The initial renderer.
 * @param {Function} createFallbackRenderer - A function that returns a new renderer with a WebGL backend.
 * @param {Function} onFallback - A function that installs the new renderer in the app.
 */
export function setupWebGLXRFallback(renderer: WebGPURenderer, createFallbackRenderer: Function, onFallback?: Function): void;
