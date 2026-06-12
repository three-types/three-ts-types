/**
 * Abstract base class for controls.
 *
 * @abstract
 * @augments EventDispatcher
 */
export class Controls extends EventDispatcher {
    /**
     * Constructs a new controls instance.
     *
     * @param {Object3D} object - The object that is managed by the controls.
     * @param {?HTMLElement} domElement - The HTML element used for event listeners.
     */
    constructor(object: Object3D, domElement?: HTMLElement | null);
    /**
     * The object that is managed by the controls.
     *
     * @type {Object3D}
     */
    object: Object3D;
    /**
     * The HTML element used for event listeners.
     *
     * @type {?HTMLElement}
     * @default null
     */
    domElement: HTMLElement | null;
    /**
     * Whether the controls responds to user input or not.
     *
     * @type {boolean}
     * @default true
     */
    enabled: boolean;
    /**
     * The internal state of the controls.
     *
     * @type {number}
     * @default -1
     */
    state: number;
    /**
     * This object defines the keyboard input of the controls.
     *
     * @type {Object}
     */
    keys: Object;
    /**
     * This object defines what type of actions are assigned to the available mouse buttons.
     * It depends on the control implementation what kind of mouse buttons and actions are supported.
     *
     * @type {{LEFT: ?number, MIDDLE: ?number, RIGHT: ?number}}
     */
    mouseButtons: {
        LEFT: number | null;
        MIDDLE: number | null;
        RIGHT: number | null;
    };
    /**
     * This object defines what type of actions are assigned to what kind of touch interaction.
     * It depends on the control implementation what kind of touch interaction and actions are supported.
     *
     * @type {{ONE: ?number, TWO: ?number}}
     */
    touches: {
        ONE: number | null;
        TWO: number | null;
    };
    /**
     * Connects the controls to the DOM. This method has so called "side effects" since
     * it adds the module's event listeners to the DOM.
     *
     * @param {HTMLElement} element - The DOM element to connect to.
     */
    connect(element: HTMLElement): void;
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
    update(): void;
}
import { EventDispatcher } from '../core/EventDispatcher.js';
