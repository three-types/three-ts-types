/**
 * This class is an alternative to {@link Clock} with a different API design and behavior.
 * The goal is to avoid the conceptual flaws that became apparent in `Clock` over time.
 *
 * - `Timer` has an `update()` method that updates its internal state. That makes it possible to
 * call `getDelta()` and `getElapsed()` multiple times per simulation step without getting different values.
 * - The class can make use of the Page Visibility API to avoid large time delta values when the app
 * is inactive (e.g. tab switched or browser hidden).
 *
 * ```js
 * const timer = new Timer();
 * timer.connect( document ); // use Page Visibility API
 * ```
 */
export class Timer {
    _previousTime: number;
    _currentTime: number;
    _startTime: number;
    _delta: number;
    _elapsed: number;
    _timescale: number;
    _document: Document | null;
    _pageVisibilityHandler: typeof handleVisibilityChange | null;
    /**
     * Connect the timer to the given document.Calling this method is not mandatory to
     * use the timer but enables the usage of the Page Visibility API to avoid large time
     * delta values.
     *
     * @param {Document} document - The document.
     */
    connect(document: Document): void;
    /**
     * Disconnects the timer from the DOM and also disables the usage of the Page Visibility API.
     */
    disconnect(): void;
    /**
     * Returns the time delta in seconds.
     *
     * @return {number} The time delta in second.
     */
    getDelta(): number;
    /**
     * Returns the elapsed time in seconds.
     *
     * @return {number} The elapsed time in second.
     */
    getElapsed(): number;
    /**
     * Returns the timescale.
     *
     * @return {number} The timescale.
     */
    getTimescale(): number;
    /**
     * Sets the given timescale which scale the time delta computation
     * in `update()`.
     *
     * @param {number} timescale - The timescale to set.
     * @return {Timer} A reference to this timer.
     */
    setTimescale(timescale: number): Timer;
    /**
     * Resets the time computation for the current simulation step.
     *
     * @return {Timer} A reference to this timer.
     */
    reset(): Timer;
    /**
     * Can be used to free all internal resources. Usually called when
     * the timer instance isn't required anymore.
     */
    dispose(): void;
    /**
     * Updates the internal state of the timer. This method should be called
     * once per simulation step and before you perform queries against the timer
     * (e.g. via `getDelta()`).
     *
     * @param {number} timestamp - The current time in milliseconds. Can be obtained
     * from the `requestAnimationFrame` callback argument. If not provided, the current
     * time will be determined with `performance.now`.
     * @return {Timer} A reference to this timer.
     */
    update(timestamp: number): Timer;
}
declare function handleVisibilityChange(): void;
export {};
