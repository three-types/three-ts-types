export default GPURenderPassDescriptor;
/**
 * Reusable descriptor for `GPUCommandEncoder.beginRenderPass()`.
 *
 * @private
 */
declare class GPURenderPassDescriptor {
    /**
     * The label of the render pass.
     *
     * @type {string}
     */
    label: string;
    /**
     * The color attachments of the render pass.
     *
     * @type {Array<?Object>}
     */
    colorAttachments: Array<Object | null>;
    /**
     * The depth-stencil attachment of the render pass.
     *
     * @type {Object|undefined}
     */
    depthStencilAttachment: Object | undefined;
    /**
     * The query set used for occlusion queries during the pass.
     *
     * @type {?GPUQuerySet|undefined}
     */
    occlusionQuerySet: (GPUQuerySet | undefined) | null;
    /**
     * Defines which timestamp values are written and where.
     *
     * @type {Object|undefined}
     */
    timestampWrites: Object | undefined;
    /**
     * The maximum number of draw calls that can be issued during the pass.
     *
     * @type {number}
     * @default 50000000
     */
    maxDrawCount: number;
    /**
     * Resets the descriptor to its default state. The internal `colorAttachments`
     * array is emptied without releasing its backing storage.
     */
    reset(): void;
}
