import { Camera, MOUSE, TOUCH, Vector3 } from '../../../src/Three';

/**
 * Orbit controls allow the camera to orbit around a target.
 * @param {Camera} object - The camera to be controlled. The camera must not be a child of another object, unless that object is the scene itself.
 * @param {HTMLElement} [domElement] - The HTML element used for event listeners.
 */
export class OrbitControls {
    constructor(object: Camera, domElement?: HTMLElement);

    /**
     * The camera being controlled.
     */
    object: Camera;

    /**
     * The HTMLElement used to listen for mouse / touch events. This must be passed in the constructor; changing it here will not set up new event listeners.
     */
    domElement: HTMLElement | Document;

    /**
     * When set to `false`, the controls will not respond to user input.
     * @default true
     */
    enabled: boolean;

    /**
     * The focus point of the controls, the .object orbits around this. It can be updated manually at any point to change the focus of the controls.
     */
    target: Vector3;

    /** @deprecated */
    center: Vector3;

    /**
     * How far you can dolly in ( PerspectiveCamera only ).
     * @default 0
     */
    minDistance: number;

    /**
     * How far you can dolly out ( PerspectiveCamera only ).
     * @default Infinity
     */
    maxDistance: number;

    /**
     * How far you can zoom in ( OrthographicCamera only ).
     * @default 0
     */
    minZoom: number;

    /**
     * How far you can zoom out ( OrthographicCamera only ).
     * @default Infinity
     */
    maxZoom: number;

    /**
     * How far you can orbit vertically, lower limit. Range is 0 to Math.PI radians.
     * @default 0
     */
    minPolarAngle: number;
    maxPolarAngle: number;

    minAzimuthAngle: number;
    maxAzimuthAngle: number;

    enableDamping: boolean;
    /**
     * The damping inertia used if .enableDamping is set to true.
     * Note that for this to work, you must call .update () in your animation loop.
     * @default 0.05
     * */
    dampingFactor: number;

    enableZoom: boolean;
    zoomSpeed: number;

    enableRotate: boolean;
    rotateSpeed: number;

    enablePan: boolean;
    panSpeed: number;
    screenSpacePanning: boolean;
    keyPanSpeed: number;

    autoRotate: boolean;
    autoRotateSpeed: number;

    keys: { LEFT: string; UP: string; RIGHT: string; BOTTOM: string };
    mouseButtons: Partial<{ LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE }>;
    touches: Partial<{ ONE: TOUCH; TWO: TOUCH }>;

    target0: Vector3;
    position0: Vector3;
    zoomO: number;

    update(): boolean;

    listenToKeyEvents(domElement: HTMLElement | Window): void;

    saveState(): void;

    reset(): void;

    dispose(): void;

    getPolarAngle(): number;

    getAzimuthalAngle(): number;

    getDistance(): number;

    // EventDispatcher mixins
    addEventListener(type: string, listener: (event: any) => void): void;

    hasEventListener(type: string, listener: (event: any) => void): boolean;

    removeEventListener(type: string, listener: (event: any) => void): void;

    dispatchEvent(event: { type: string; target: any }): void;
}

export class MapControls extends OrbitControls {
    constructor(object: Camera, domElement?: HTMLElement);
}
