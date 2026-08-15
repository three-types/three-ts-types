export default GPURenderPassColorAttachment;
/**
 * Reusable descriptor for `GPURenderPassColorAttachment`, the type of each
 * entry in `GPURenderPassDescriptor.colorAttachments`.
 *
 * @private
 */
declare class GPURenderPassColorAttachment {
    /**
     * The texture view the pass renders into.
     *
     * @type {?GPUTextureView}
     * @default null
     */
    view: GPUTextureView | null;
    /**
     * The depth slice the pass renders into.
     *
     * @type {number|undefined}
     */
    depthSlice: number | undefined;
    /**
     * The texture view that receives the resolved output of multisampled rendering.
     *
     * @type {?GPUTextureView|undefined}
     */
    resolveTarget: (GPUTextureView | undefined) | null;
    /**
     * The clear value used when `loadOp` is `'clear'`.
     *
     * @type {Object|undefined}
     */
    clearValue: Object | undefined;
    /**
     * The load operation performed at the start of the pass.
     *
     * @type {string|undefined}
     */
    loadOp: string | undefined;
    /**
     * The store operation performed at the end of the pass.
     *
     * @type {string|undefined}
     */
    storeOp: string | undefined;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
