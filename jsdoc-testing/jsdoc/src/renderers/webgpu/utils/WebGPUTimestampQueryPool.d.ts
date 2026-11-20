export default WebGPUTimestampQueryPool;
/**
 * Manages a pool of WebGPU timestamp queries for GPU timers. Each pass writes a begin and an
 * end timestamp, a timer measures from the earliest begin to the latest end of its passes.
 *
 * Only one readback is in flight. When the query set is full meanwhile, it waits for its own
 * readback and the following passes continue in another query set, so no query is dropped.
 *
 * @augments TimestampQueryPool
 */
declare class WebGPUTimestampQueryPool extends TimestampQueryPool {
    /**
     * Creates a new WebGPU timestamp query pool.
     *
     * @param {GPUDevice} device - The WebGPU device to create queries on.
     * @param {number} [maxQueries=4096] - Maximum number of queries of a query set.
     */
    constructor(device: GPUDevice, maxQueries?: number);
    device: GPUDevice;
    /**
     * The query set the passes write to.
     *
     * @type {GPUQuerySet}
     */
    querySet: GPUQuerySet;
    /**
     * How many queries of the current query set are allocated.
     *
     * @type {number}
     * @default 0
     */
    currentQueryIndex: number;
    /**
     * The timers of each allocated query pair of the current query set, by the index of its first query.
     *
     * @type {Map<number, Array<Object>>}
     */
    queryTimers: Map<number, Array<Object>>;
    /**
     * The full query sets waiting for their readback.
     *
     * @type {Array<{querySet: GPUQuerySet, queryTimers: Map<number, Array<Object>>, queryCount: number}>}
     */
    fullQuerySets: Array<{
        querySet: GPUQuerySet;
        queryTimers: Map<number, Array<Object>>;
        queryCount: number;
    }>;
    /**
     * The query sets that were read back and can be reused.
     *
     * @type {Array<GPUQuerySet>}
     */
    freeQuerySets: Array<GPUQuerySet>;
    /**
     * The readback in flight, `null` if there is none.
     *
     * @type {?Promise}
     * @default null
     */
    pendingResolve: Promise<any> | null;
    resolveBuffer: GPUBuffer;
    resultBuffer: GPUBuffer;
    /**
     * Allocates a pair of queries for the active timers.
     *
     * @returns {?number} The index of the first query in {@link WebGPUTimestampQueryPool#querySet}, or `null` without active timers.
     */
    allocateQueries(): number | null;
    /**
     * Returns the GPU time of the given timer, from the earliest begin to the latest end of its passes.
     *
     * @param {Object} timer - The timer, ended and resolved.
     * @returns {?number} The GPU time in milliseconds, or `null` if queries couldn't be read back.
     */
    getDuration(timer: Object): number | null;
    /**
     * Reads back the given queries and adds their timestamps to their timers.
     *
     * @async
     * @private
     * @param {{querySet: GPUQuerySet, queryTimers: Map<number, Array<Object>>, queryCount: number}} queries - The queries to read back.
     * @returns {Promise} A Promise that resolves when the readback has finished.
     */
    private _resolveQueries;
    /**
     * Takes the allocated queries of the current query set, its following queries start at the first index.
     *
     * @private
     * @returns {{querySet: GPUQuerySet, queryTimers: Map<number, Array<Object>>, queryCount: number}} The queries.
     */
    private _takeQueries;
    /**
     * Creates a timestamp query set.
     *
     * @private
     * @returns {GPUQuerySet} The query set.
     */
    private _createQuerySet;
    /**
     * Dispose of the query pool.
     *
     * @async
     * @returns {Promise} A Promise that resolves when the dispose has been executed.
     */
    dispose(): Promise<any>;
}
import TimestampQueryPool from '../../common/TimestampQueryPool.js';
