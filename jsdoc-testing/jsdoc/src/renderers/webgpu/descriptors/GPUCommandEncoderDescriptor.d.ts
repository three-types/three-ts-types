export default GPUCommandEncoderDescriptor;
/**
 * Reusable descriptor for `GPUDevice.createCommandEncoder()`.
 *
 * @private
 */
declare class GPUCommandEncoderDescriptor {
    /**
     * The label of the command encoder.
     *
     * @type {string}
     */
    label: string;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
