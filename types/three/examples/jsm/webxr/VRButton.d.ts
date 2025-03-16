import { WebGLRenderer, WebXRManager } from "three";

export interface VRButtonRenderer {
    xr: WebXRManager;
}

export class VRButton {
    static createButton(renderer: VRButtonRenderer, sessionInit?: XRSessionInit): HTMLElement;
}
