import { MOUSE, TOUCH } from "../constants.js";
import { EventDispatcher } from "../core/EventDispatcher.js";
import { Object3D } from "../core/Object3D.js";

export interface ControlsEventMap {}

/**
 * Abstract base class for controls.
 *
 * @abstract
 * @augments EventDispatcher
 */
export abstract class Controls<
    TEventMap extends ControlsEventMap = ControlsEventMap,
    TObject extends Object3D = Object3D,
> extends EventDispatcher<TEventMap> {
    /**
     * Constructs a new controls instance.
     *
     * @param {Object3D} object - The object that is managed by the controls.
     * @param {?HTMLElement} domElement - The HTML element used for event listeners.
     */
    constructor(object: TObject, domElement?: HTMLElement | SVGElement | null);
    /**
     * The object that is managed by the controls.
     */
    object: TObject;
    /**
     * The HTML element used for event listeners.
     *
     * @default null
     */
    domElement: HTMLElement | SVGElement | null;
    /**
     * Whether the controls responds to user input or not.
     *
     * @default true
     */
    enabled: boolean;
    /**
     * The internal state of the controls.
     *
     * @default -1
     */
    state: number;
    /**
     * This object defines the keyboard input of the controls.
     */
    keys: object;
    /**
     * This object defines what type of actions are assigned to the available mouse buttons.
     * It depends on the control implementation what kind of mouse buttons and actions are supported.
     */
    mouseButtons: {
        LEFT?: MOUSE | null | undefined;
        MIDDLE?: MOUSE | null | undefined;
        RIGHT?: MOUSE | null | undefined;
    };
    /**
     * This object defines what type of actions are assigned to what kind of touch interaction.
     * It depends on the control implementation what kind of touch interaction and actions are supported.
     */
    touches: {
        ONE?: TOUCH | null | undefined;
        TWO?: TOUCH | null | undefined;
    };
    /**
     * Connects the controls to the DOM. This method has so called "side effects" since
     * it adds the module's event listeners to the DOM.
     *
     * @param {HTMLElement} element - The DOM element to connect to.
     */
    connect(element: HTMLElement | SVGElement): void;
    /**
     * Disconnects the controls from the DOM.
     */
    disconnect(): void;
    /**
     * Call this method if you no longer want use to the controls. It frees all internal
     * resources and removes all event listeners.
     */
    dispose(): void;
    /**
     * Controls should implement this method if they have to update their internal state
     * per simulation step.
     *
     * @param {number} [delta] - The time delta in seconds.
     */
    update(delta?: number): void;
}
