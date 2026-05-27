export default WebGLTimestampQueryPool;
/**
 * Manages a pool of WebGL timestamp queries for performance measurement.
 * Handles creation, execution, and resolution of timer queries using WebGL extensions.
 *
 * @augments TimestampQueryPool
 */
declare class WebGLTimestampQueryPool extends TimestampQueryPool {
    /**
     * Creates a new WebGL timestamp query pool.
     *
     * @param {WebGLRenderingContext|WebGL2RenderingContext} gl - The WebGL context.
     * @param {string} type - The type identifier for this query pool.
     * @param {number} [maxQueries=2048] - Maximum number of queries this pool can hold.
     */
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, type: string, maxQueries?: number);
    gl: WebGLRenderingContext | WebGL2RenderingContext;
    type: string;
    ext: any;
    queries: any[] | undefined;
    activeQuery: number | null;
    queryStates: Map<any, any> | undefined;
    /**
     * Allocates a pair of queries for a given render context.
     *
     * @param {string} uid - A unique identifier for the render context.
     * @returns {?number} The base offset for the allocated queries, or null if allocation failed.
     */
    allocateQueriesForContext(uid: string): number | null;
    /**
     * Begins a timestamp query for the specified render context.
     *
     * @param {string} uid - A unique identifier for the render context.
     */
    beginQuery(uid: string): void;
    /**
     * Ends the active timestamp query for the specified render context.
     *
     * @param {string} uid - A unique identifier for the render context.
     */
    endQuery(uid: string): void;
    /**
     * Asynchronously resolves all completed queries and returns the total duration.
     *
     * @async
     * @returns {Promise<number>} The total duration in milliseconds, or the last valid value if resolution fails.
     */
    resolveQueriesAsync(): Promise<number>;
    /**
     * Resolves a single query, checking for completion and disjoint operation.
     *
     * @async
     * @param {WebGLQuery} query - The query object to resolve.
     * @returns {Promise<number>} The elapsed time in milliseconds.
     */
    resolveQuery(query: WebGLQuery): Promise<number>;
}
import TimestampQueryPool from '../../common/TimestampQueryPool.js';
