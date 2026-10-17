export namespace Constants {
    let Handedness: Readonly<{
        NONE: "none";
        LEFT: "left";
        RIGHT: "right";
    }>;
    let ComponentState: Readonly<{
        DEFAULT: "default";
        TOUCHED: "touched";
        PRESSED: "pressed";
    }>;
    let ComponentProperty: Readonly<{
        BUTTON: "button";
        X_AXIS: "xAxis";
        Y_AXIS: "yAxis";
        STATE: "state";
    }>;
    let ComponentType: Readonly<{
        TRIGGER: "trigger";
        SQUEEZE: "squeeze";
        TOUCHPAD: "touchpad";
        THUMBSTICK: "thumbstick";
        BUTTON: "button";
    }>;
    let ButtonTouchThreshold: number;
    let AxisTouchThreshold: number;
    let VisualResponseProperty: Readonly<{
        TRANSFORM: "transform";
        VISIBILITY: "visibility";
    }>;
}
/**
  * @description Builds a motion controller with components and visual responses based on the
  * supplied profile description. Data is polled from the xrInputSource's gamepad.
  * @author Nell Waliczek / https://github.com/NellWaliczek
*/
export class MotionController {
    /**
     * @param {Object} xrInputSource - The XRInputSource to build the MotionController around
     * @param {Object} profile - The best matched profile description for the supplied xrInputSource
     * @param {string} assetUrl
     */
    constructor(xrInputSource: Object, profile: Object, assetUrl: string);
    xrInputSource: Object;
    assetUrl: string;
    id: any;
    layoutDescription: any;
    components: {};
    get gripSpace(): any;
    get targetRaySpace(): any;
    /**
     * @description Returns a subset of component data for simplified debugging
     */
    get data(): any[];
    /**
     * @description Poll for updated data based on current gamepad state
     */
    updateFromGamepad(): void;
}
export function fetchProfile(xrInputSource: any, basePath: any, defaultProfile?: null, getAssetPath?: boolean): Promise<{
    profile: any;
    assetPath: string | undefined;
}>;
export function fetchProfilesList(basePath: any): Promise<any>;
