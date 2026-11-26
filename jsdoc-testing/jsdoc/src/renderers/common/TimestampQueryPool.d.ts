export default TimestampQueryPool;
/**
 * Abstract base class of a timestamp query pool. While GPU timers are active, the backend
 * allocates queries for its render and compute calls. Each query keeps the timers that were
 * active when it was allocated and adds its timestamps to them once it is read back.
 *
 * @abstract
 */
declare class TimestampQueryPool {
    /**
     * Creates a new timestamp query pool.
     *
     * @param {number} [maxQueries=256] - Maximum number of queries this pool can hold.
     */
    constructor(maxQueries?: number);
    /**
     * Maximum number of queries this pool can hold.
     *
     * @type {number}
     * @default 256
     */
    maxQueries: number;
    /**
     * Whether the pool has been disposed or not.
     *
     * @type {boolean}
     * @default false
     */
    isDisposed: boolean;
    /**
     * The active GPU timers.
     *
     * @type {Set<Object>}
     */
    timers: Set<Object>;
    /**
     * Starts a GPU timer. It measures the queries allocated until {@link TimestampQueryPool#endTimer}.
     *
     * @returns {Object} The timer.
     */
    beginTimer(): Object;
    /**
     * Ends the given GPU timer.
     *
     * @param {Object} timer - The timer returned by {@link TimestampQueryPool#beginTimer}.
     * @returns {Promise<Object>} A Promise that resolves with the timer once all its queries are read back.
     */
    endTimer(timer: Object): Promise<Object>;
    /**
     * Returns the GPU time of the given timer in milliseconds.
     *
     * @abstract
     * @param {Object} timer - The timer, ended and resolved.
     * @returns {?number} The GPU time, or `null` if queries couldn't be read back.
     */
    getDuration(): number | null;
    /**
     * Returns the active timers for a new query, `null` without active timers.
     *
     * @protected
     * @returns {?Array<Object>} The timers.
     */
    protected _retainTimers(): Array<Object> | null;
    /**
     * Releases the timers of a query once it is read back, and resolves the ended timers
     * without pending queries.
     *
     * @protected
     * @param {Array<Object>} timers - The timers returned by {@link TimestampQueryPool#_retainTimers}.
     * @param {boolean} lost - Whether the query couldn't be read back.
     */
    protected _releaseTimers(timers: Array<Object>, lost: boolean): void;
    /**
     * Reads back the queries that are ready.
     *
     * @abstract
     */
    resolveQueries(): void;
    /**
     * Dispose of the query pool.
     *
     * @abstract
     */
    dispose(): void;
}
