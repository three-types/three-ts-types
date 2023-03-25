/**
 * The minimal basic Event that can be dispatched by a {@link EventDispatcher<>}.
 */
export interface BaseEvent {
    readonly type: string;
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

// tslint:disable-next-line:interface-over-type-literal - Type Aliases to add better readability.
export type EmptyEvent = {};

type EventMap = Record<string, {}>;
type EventKey<T extends EventMap> = string & keyof T;

type EventTypeValidator<TEvent extends BaseEvent, TEventMap extends {}> = TEvent extends {
    type: infer TEventType;
}
    ? TEventType extends EventKey<TEventMap>
        ? { type: TEventType } & TEventMap[TEventType]
        : TEventType extends string
        ? TEvent
        : never
    : never;

/**
 * JavaScript events for custom objects
 * @example
 * ```typescript
 * // Adding events to a custom object
 * class Car extends EventDispatcher {
 *   start() {
 *     this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );
 *   }
 * };
 * // Using events with the custom object
 * const car = new Car();
 * car.addEventListener( 'start', ( event ) => {
 *   alert( event.message );
 * } );
 * car.start();
 * ```
 * @see {@link https://github.com/mrdoob/eventdispatcher.js | mrdoob EventDispatcher on GitHub}
 * @see {@link https://threejs.org/docs/index.html#api/en/core/EventDispatcher | Official Documentation}
 * @see {@link https://github.com/mrdoob/three.js/blob/master/src/core/EventDispatcher.js | Source}
 */
export class EventDispatcher<TEventMap extends {} = {}> {
    /**
     * Creates {@link THREE.EventDispatcher | EventDispatcher} object.
     */
    constructor();

    /**
     * Adds a listener to an event type.
     * @param type The type of event to listen to.
     * @param listener The function that gets called when the event is fired.
     */
    addEventListener<E extends EventKey<TEventMap>>(type: E, listener: EventListener<TEventMap[E], E, this>): void;
    addEventListener<E extends string>(type: E, listener: EventListener<Event<E, this>, E, this>): void;

    /**
     * Checks if listener is added to an event type.
     * @param type The type of event to listen to.
     * @param listener The function that gets called when the event is fired.
     */
    hasEventListener<E extends EventKey<TEventMap>>(type: E, listener: EventListener<TEventMap[E], E, this>): boolean;
    hasEventListener<E extends string>(type: E, listener: EventListener<Event<E, this>, E, this>): boolean;

    /**
     * Removes a listener from an event type.
     * @param type The type of the listener that gets removed.
     * @param listener The listener function that gets removed.
     */
    removeEventListener<E extends EventKey<TEventMap>>(type: E, listener: EventListener<TEventMap[E], E, this>): void;
    removeEventListener<E extends string>(type: E, listener: EventListener<Event<E, this>, E, this>): void;

    /**
     * Fire an event type.
     * @param event The event that gets fired.
     */
    dispatchEvent<E extends BaseEvent, Map extends TEventMap>(event: EventTypeValidator<E, Map>): void;
}

export {};
