export default WebGLTimestampQueryPool;
/**
 * Manages the WebGL timer queries of GPU timers. While timers are active, a `TIME_ELAPSED` query
 * measures the render and compute calls. The query restarts when a timer begins or ends, so each
 * query adds its elapsed time to the timers that were active during it.
 *
 * @augments TimestampQueryPool
 */
declare class WebGLTimestampQueryPool extends TimestampQueryPool {
    /**
     * Creates a new WebGL timestamp query pool.
     *
     * @param {WebGL2RenderingContext} gl - The WebGL context.
     * @param {EXTDisjointTimerQueryWebGL2} ext - The `EXT_disjoint_timer_query_webgl2` extension.
     */
    constructor(gl: WebGL2RenderingContext, ext: EXTDisjointTimerQueryWebGL2);
    gl: WebGL2RenderingContext;
    ext: EXTDisjointTimerQueryWebGL2;
    /**
     * The active query, `null` if there is none.
     *
     * @type {?Object}
     * @default null
     */
    activeQuery: Object | null;
    /**
     * The ended queries waiting for their results.
     *
     * @type {Array<Object>}
     */
    queries: Array<Object>;
    /**
     * Returns the GPU time of the given timer, the sum of its elapsed times.
     *
     * @param {Object} timer - The timer, ended and resolved.
     * @returns {?number} The GPU time in milliseconds, or `null` if a query was disjoint.
     */
    getDuration(timer: Object): number | null;
    /**
     * Starts a query for the active timers.
     *
     * @private
     */
    private _beginQuery;
    /**
     * Ends the active query.
     *
     * @private
     */
    private _endQuery;
}
import TimestampQueryPool from '../../common/TimestampQueryPool.js';
