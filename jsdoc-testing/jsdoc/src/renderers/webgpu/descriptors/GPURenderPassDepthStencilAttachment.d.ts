export default GPURenderPassDepthStencilAttachment;
/**
 * Reusable descriptor for `GPURenderPassDepthStencilAttachment`, the
 * `depthStencilAttachment` field of `GPURenderPassDescriptor`.
 *
 * @private
 */
declare class GPURenderPassDepthStencilAttachment {
    /**
     * The depth/stencil texture view the pass renders into.
     *
     * @type {?GPUTextureView}
     * @default null
     */
    view: GPUTextureView | null;
    /**
     * The load operation applied to the depth aspect at the start of the pass.
     *
     * @type {string|undefined}
     */
    depthLoadOp: string | undefined;
    /**
     * The store operation applied to the depth aspect at the end of the pass.
     *
     * @type {string|undefined}
     */
    depthStoreOp: string | undefined;
    /**
     * The clear value used when `depthLoadOp` is `'clear'`.
     *
     * @type {number|undefined}
     */
    depthClearValue: number | undefined;
    /**
     * Whether the depth aspect is read-only.
     *
     * @type {boolean}
     * @default false
     */
    depthReadOnly: boolean;
    /**
     * The load operation applied to the stencil aspect at the start of the pass.
     *
     * @type {string|undefined}
     */
    stencilLoadOp: string | undefined;
    /**
     * The store operation applied to the stencil aspect at the end of the pass.
     *
     * @type {string|undefined}
     */
    stencilStoreOp: string | undefined;
    /**
     * The clear value used when `stencilLoadOp` is `'clear'`.
     *
     * @type {number}
     * @default 0
     */
    stencilClearValue: number;
    /**
     * Whether the stencil aspect is read-only.
     *
     * @type {boolean}
     * @default false
     */
    stencilReadOnly: boolean;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
