export default GPUComputePipelineDescriptor;
/**
 * Reusable descriptor for `GPUDevice.createComputePipeline()`.
 *
 * @private
 */
declare class GPUComputePipelineDescriptor {
    /**
     * The label of the compute pipeline.
     *
     * @type {string}
     */
    label: string;
    /**
     * The pipeline layout the pipeline conforms to, or `'auto'`.
     *
     * @type {?GPUPipelineLayout|string}
     * @default null
     */
    layout: (GPUPipelineLayout | string) | null;
    /**
     * The programmable compute stage.
     *
     * @type {?Object}
     * @default null
     */
    compute: Object | null;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
