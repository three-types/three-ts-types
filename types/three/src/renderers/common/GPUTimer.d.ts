import Renderer from "./Renderer.js";

export default GPUTimer;
/**
 * Measures the GPU time of the render and compute passes issued between {@link GPUTimer#begin} and
 * {@link GPUTimer#end}, from the start of the first pass to the end of the last one.
 *
 * Requires the `timestamp-query` feature in WebGPU or the `EXT_disjoint_timer_query_webgl2` extension
 * in WebGL. Otherwise the results are `null`.
 *
 * ```js
 * const timer = new GPUTimer( renderer );
 *
 * timer.begin();
 * renderer.render( scene, camera );
 * const { delta } = await timer.end();
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
     * Stops timing and returns the GPU timing of the passes issued since {@link GPUTimer#begin}.
     * The timer can begin a new measurement before the result is read.
     *
     * - `start`: The GPU timestamp of the start of the first pass.
     * - `end`: The GPU timestamp of the end of the last pass.
     * - `delta`: The time between them, `0` without any pass.
     *
     * The timestamps can only be compared with each other, and are `null` in WebGL or without any pass.
     * The result is `null` when the backend doesn't support timing.
     *
     * @async
     * @return {Promise<?{start: ?number, end: ?number, delta: number}>} The GPU timing in milliseconds.
     */
    end(): Promise<
        {
            start: number | null;
            end: number | null;
            delta: number;
        } | null
    >;
}
