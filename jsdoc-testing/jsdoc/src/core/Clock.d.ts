/**
 * Class for keeping track of time.
 *
 * @deprecated since r183.
 */
export class Clock {
    /**
     * Constructs a new clock.
     *
     * @deprecated since 183.
     * @param {boolean} [autoStart=true] - Whether to automatically start the clock when
     * `getDelta()` is called for the first time.
     */
    constructor(autoStart?: boolean);
    /**
     * If set to `true`, the clock starts automatically when `getDelta()` is called
     * for the first time.
     *
     * @type {boolean}
     * @default true
     */
    autoStart: boolean;
    /**
     * Holds the time at which the clock's `start()` method was last called.
     *
     * @type {number}
     * @default 0
     */
    startTime: number;
    /**
     * Holds the time at which the clock's `start()`, `getElapsedTime()` or
     * `getDelta()` methods were last called.
     *
     * @type {number}
     * @default 0
     */
    oldTime: number;
    /**
     * Keeps track of the total time that the clock has been running.
     *
     * @type {number}
     * @default 0
     */
    elapsedTime: number;
    /**
     * Whether the clock is running or not.
     *
     * @type {boolean}
     * @default true
     */
    running: boolean;
    /**
     * Starts the clock. When `autoStart` is set to `true`, the method is automatically
     * called by the class.
     */
    start(): void;
    /**
     * Stops the clock.
     */
    stop(): void;
    /**
     * Returns the elapsed time in seconds.
     *
     * @return {number} The elapsed time.
     */
    getElapsedTime(): number;
    /**
     * Returns the delta time in seconds.
     *
     * @return {number} The delta time.
     */
    getDelta(): number;
}
