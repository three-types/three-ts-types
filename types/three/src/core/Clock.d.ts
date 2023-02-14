/**
 * Object for keeping track of time
 * @remarks
 * This uses {@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/now | performance.now} if it is available,
 * otherwise it reverts to the less accurate {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now | Date.now}.
 * @see {@link https://threejs.org/docs/index.html#/api/en/core/Clock | Official Documentation}
 * @see {@link https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js | Source}
 */
export class Clock {
    /**
     * Create a new instance of {@link THREE.Clock | Clock}
     * @param autoStart - Whether to automatically start the clock when {@link Clock.getDelta | .getDelta}() is called for the first time. Default `true`
     */
    constructor(autoStart?: boolean);

    /**
     * If set, starts the clock automatically when {@link Clock.getDelta | .getDelta}() is called for the first time.
     * @defaultValue `true`
     */
    autoStart: boolean;

    /**
     * Holds the time at which the clock's {@link Clock.start | start} method was last called.
     * @defaultValue `0`
     */
    startTime: number;

    /**
     * Holds the time at which the clock's {@link Clock.start | start}, {@link Clock.getElapsedTime | .getElapsedTime}() or {@link Clock.getDelta | .getDelta}() methods were last called.
     * @defaultValue `0`
     */
    oldTime: number;

    /**
     * Keeps track of the total time that the clock has been running.
     * @defaultValue `0`
     */
    elapsedTime: number;

    /**
     * Whether the clock is running or not.
     * @defaultValue `false`
     */
    running: boolean;

    /**
     * Starts clock
     * @remarks
     * Also sets the {@link Clock.startTime | .startTime} and {@link Clock.oldTime | .oldTime} to the current time,
     * sets {@link Clock.elapsedTime | .elapsedTime} to `0` and {@link Clock.running | .running} to `true`.
     */
    start(): void;

    /**
     * Stops clock and sets {@link Clock.oldTime | oldTime} to the current time.
     */
    stop(): void;

    /**
     * Get the seconds passed since the clock started and sets {@link Clock.oldTime | .oldTime} to the current time.
     * @remarks
     * If {@link Clock.autoStart | .autoStart} is `true` and the clock is not running, also starts the clock.
     */
    getElapsedTime(): number;

    /**
     * Get the seconds passed since the time {@link Clock.oldTime | .oldTime} was set and sets {@link Clock.oldTime | .oldTime} to the current time.
     * @remarks
     * If {@link Clock.autoStart | .autoStart} is `true` and the clock is not running, also starts the clock.
     */
    getDelta(): number;
}
