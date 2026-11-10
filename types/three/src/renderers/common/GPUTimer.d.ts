import Renderer from "./Renderer.js";

export default GPUTimer;
/**
 * Measures the GPU time of the render and compute passes issued between {@link GPUTimer#begin} and
 * {@link GPUTimer#end}, from the start of the first pass to the end of the last one.
 *
 * Timers can overlap and end in any order: a pass counts toward every active timer. In WebGL only one
 * timer can run at a time and an overlapping one returns `null`.
 *
 * Requires the `timestamp-query` feature in WebGPU or the `EXT_disjoint_timer_query_webgl2` extension
 * in WebGL. Otherwise the results are `null`.
 *
 * ```js
 * const timer = new GPUTimer( renderer );
 *
 * timer.begin();
 * renderer.render( scene, camera );
 * const milliseconds = await timer.end();
 * ```
 */
declare class GPUTimer {
    /**
     * Constructs a new GPU timer.
     *
     * @param {Renderer} renderer - The renderer whose passes are timed. Must be initialized before
     * {@link GPUTimer#begin} is called.
     */
    constructor(renderer: Renderer);
    /**
     * The renderer whose passes are timed.
     *
     * @type {Renderer}
     */
    renderer: Renderer;
    /**
     * Starts timing the passes the renderer issues.
     */
    begin(): void;
    /**
     * Stops timing and returns the GPU time of the passes issued since {@link GPUTimer#begin}. The timer
     * can begin a new measurement before the result is read.
     *
     * @async
     * @return {Promise<?number>} The GPU time in milliseconds, `0` without any pass, or `null` when the
     * backend doesn't support timing.
     */
    end(): Promise<number | null>;
}
