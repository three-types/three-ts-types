/**
 * A utility class for creating a button that allows to initiate
 * immersive AR sessions based on WebXR. The button can be created
 * with a factory method and then appended to the website's DOM.
 *
 * ```js
 * document.body.appendChild( ARButton.createButton( renderer ) );
 * ```
 *
 * @hideconstructor
 * @three_import import { ARButton } from 'three/addons/webxr/ARButton.js';
 */
export class ARButton {
    /**
     * Constructs a new AR button.
     *
     * @param {WebGLRenderer|WebGPURenderer} renderer - The renderer.
     * @param {XRSessionInit} [sessionInit] - The a configuration object for the AR session.
     * @return {HTMLElement} The button or an error message if `immersive-ar` isn't supported.
     */
    static createButton(renderer: WebGLRenderer | WebGPURenderer, sessionInit?: XRSessionInit): HTMLElement;
}
