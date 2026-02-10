export default WebGPUTimestampQueryPool;
/**
 * Manages a pool of WebGPU timestamp queries for performance measurement.
 * Extends the base TimestampQueryPool to provide WebGPU-specific implementation.
 *
 * @augments TimestampQueryPool
 */
declare class WebGPUTimestampQueryPool extends TimestampQueryPool {
    /**
     * Creates a new WebGPU timestamp query pool.
     *
     * @param {GPUDevice} device - The WebGPU device to create queries on.
     * @param {string} type - The type identifier for this query pool.
     * @param {number} [maxQueries=2048] - Maximum number of queries this pool can hold.
     */
    constructor(device: GPUDevice, type: string, maxQueries?: number);
    device: GPUDevice;
    type: string;
    querySet: any;
    resolveBuffer: any;
    resultBuffer: any;
    /**
     * Allocates a pair of queries for a given render context.
     *
     * @param {string} uid - A unique identifier for the render context.
     * @returns {?number} The base offset for the allocated queries, or null if allocation failed.
     */
    allocateQueriesForContext(uid: string): number | null;
    /**
     * Asynchronously resolves all pending queries and returns the total duration.
     * If there's already a pending resolve operation, returns that promise instead.
     *
     * @async
     * @returns {Promise<number>} The total duration in milliseconds, or the last valid value if resolution fails.
     */
    resolveQueriesAsync(): Promise<number>;
    /**
     * Internal method to resolve queries and calculate total duration.
     *
     * @async
     * @private
     * @returns {Promise<number>} The total duration in milliseconds.
     */
    private _resolveQueries;
    /**
     * Dispose of the query pool.
     *
     * @async
     * @returns {Promise} A Promise that resolves when the dispose has been executed.
     */
    dispose(): Promise<any>;
}
import TimestampQueryPool from '../../common/TimestampQueryPool.js';
