/**
 * A utility class for creating a button that allows to initiate
 * immersive XR sessions based on WebXR. The button can be created
 * with a factory method and then appended ot the website's DOM.
 *
 * ```js
 * document.body.appendChild( XRButton.createButton( renderer ) );
 * ```
 *
 * Compared to {@link ARButton} and {@link VRButton}, this class will
 * try to offer an immersive AR session first. If the device does not
 * support this type of session, it uses an immersive VR session.
 *
 * @hideconstructor
 * @three_import import { XRButton } from 'three/addons/webxr/XRButton.js';
 */
export class XRButton {
    /**
     * Constructs a new XR button.
     *
     * @param {WebGLRenderer|WebGPURenderer} renderer - The renderer.
     * @param {XRSessionInit} [sessionInit] - The a configuration object for the AR session.
     * @return {HTMLElement} The button or an error message if WebXR isn't supported.
     */
    static createButton(renderer: WebGLRenderer | WebGPURenderer, sessionInit?: XRSessionInit): HTMLElement;
}
