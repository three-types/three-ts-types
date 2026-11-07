/**
 * The minimal basic Event that can be dispatched by a {@link EventDispatcher<>}.
 */
export interface BaseEvent<TEventType extends string = string> {
    readonly type: TEventType;
}

/**
 * The minimal expected contract of a fired Event that was dispatched by a {@link EventDispatcher<>}.
 */
export interface Event<TEventType extends string = string, TTarget = unknown> {
    readonly type: TEventType;
    readonly target: TTarget;
}

export type EventListener<TEventData, TEventType extends string, TTarget> = (
    event: TEventData & Event<TEventType, TTarget>,
) => void;

/**
 * This modules allows to dispatch event objects on custom JavaScript objects.
 *
 * Main repository: [eventdispatcher.js](https://github.com/mrdoob/eventdispatcher.js/)
 *
 * Code Example:
 * ```js
 * class Car extends EventDispatcher {
 * 	start() {
 * 		this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );
 * 	}
 * };
 *
 * // Using events with the custom object
 * const car = new Car();
 * car.addEventListener( 'start', function ( event ) {
 * 	alert( event.message );
 * } );
 *
 * car.start();
 * ```
 */
export class EventDispatcher<TEventMap extends {} = {}> {
    /**
     * Creates {@link THREE.EventDispatcher | EventDispatcher} object.
     */
    constructor();
    /**
     * Adds the given event listener to the given event type.
     *
     * @param {string} type - The type of event to listen to.
     * @param {Function} listener - The function that gets called when the event is fired.
     */
    addEventListener<T extends Extract<keyof TEventMap, string>>(
        type: T,
        listener: EventListener<TEventMap[T], T, this>,
    ): void;
    /**
     * Returns `true` if the given event listener has been added to the given event type.
     *
     * @param {string} type - The type of event.
     * @param {Function} listener - The listener to check.
     * @return {boolean} Whether the given event listener has been added to the given event type.
     */
    hasEventListener<T extends Extract<keyof TEventMap, string>>(
        type: T,
        listener: EventListener<TEventMap[T], T, this>,
    ): boolean;
    /**
     * Removes the given event listener from the given event type.
     *
     * @param {string} type - The type of event.
     * @param {Function} listener - The listener to remove.
     */
    removeEventListener<T extends Extract<keyof TEventMap, string>>(
        type: T,
        listener: EventListener<TEventMap[T], T, this>,
    ): void;
    /**
     * Dispatches an event object.
     *
     * @param {Object} event - The event that gets fired.
     */
    dispatchEvent<T extends Extract<keyof TEventMap, string>>(event: BaseEvent<T> & TEventMap[T]): void;
}
