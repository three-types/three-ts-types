import { Renderer } from "three/webgpu";

declare class XRButton {
    static createButton(renderer: Renderer, sessionInit?: XRSessionInit): HTMLElement;
}

export { XRButton };
