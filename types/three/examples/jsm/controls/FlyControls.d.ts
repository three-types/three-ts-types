import { Camera } from "three";
import { Controls } from "./Controls.js";

export interface FlyControlsEventMap {
    change: {};
}

declare class FlyControls extends Controls<FlyControlsEventMap> {
    /**
     * The movement speed. Default is `1`.
     */
    movementSpeed: number;

    /**
     * The rotation speed. Default is `0.005`.
     */
    rollSpeed: number;

    /**
     * If set to `true`, you can only look around by performing a drag interaction. Default is `false`.
     */
    dragToLook: boolean;

    /**
     * If set to `true`, the camera automatically moves forward (and does not stop) when initially translated. Default
     * is `false`.
     */
    autoForward: boolean;

    constructor(object: Camera, domElement?: HTMLElement | null);
}

export { FlyControls };
