export default GPUPipelineLayoutDescriptor;
/**
 * Reusable descriptor for `GPUDevice.createPipelineLayout()`.
 *
 * @private
 */
declare class GPUPipelineLayoutDescriptor {
    /**
     * The label of the pipeline layout.
     *
     * @type {string}
     */
    label: string;
    /**
     * The set of bind group layouts the pipeline layout describes.
     *
     * @type {?Array<?GPUBindGroupLayout>}
     * @default null
     */
    bindGroupLayouts: Array<GPUBindGroupLayout | null> | null;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
