/**
 * A utility class for creating a button that allows to initiate
 * immersive VR sessions based on WebXR. The button can be created
 * with a factory method and then appended ot the website's DOM.
 *
 * ```js
 * document.body.appendChild( VRButton.createButton( renderer ) );
 * ```
 *
 * @hideconstructor
 * @three_import import { VRButton } from 'three/addons/webxr/VRButton.js';
 */
export class VRButton {
    /**
     * Constructs a new VR button.
     *
     * @param {WebGLRenderer|WebGPURenderer} renderer - The renderer.
     * @param {XRSessionInit} [sessionInit] - The a configuration object for the AR session.
     * @return {HTMLElement} The button or an error message if `immersive-ar` isn't supported.
     */
    static createButton(renderer: WebGLRenderer | WebGPURenderer, sessionInit?: XRSessionInit): HTMLElement;
    /**
     * Registers a `sessiongranted` event listener. When a session is granted, the {@link VRButton#xrSessionIsGranted}
     * flag will evaluate to `true`. This method is automatically called by the module itself so there
     * should be no need to use it on app level.
     */
    static registerSessionGrantedListener(): void;
}
export namespace VRButton {
    let xrSessionIsGranted: boolean;
}
