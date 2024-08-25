import { Camera } from "../../../src/cameras/Camera.js";
import { EventDispatcher } from "../../../src/core/EventDispatcher.js";

declare class Controls<TEventMap extends {}> extends EventDispatcher<TEventMap> {
    object: Camera;
    domElement: HTMLElement;

    enabled: boolean;

    constructor(object: Camera, domElement: HTMLElement);
}
