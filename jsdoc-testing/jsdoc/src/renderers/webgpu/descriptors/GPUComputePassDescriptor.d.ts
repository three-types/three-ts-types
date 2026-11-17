export default GPUComputePassDescriptor;
/**
 * Reusable descriptor for `GPUCommandEncoder.beginComputePass()`.
 *
 * @private
 */
declare class GPUComputePassDescriptor {
    /**
     * The label of the compute pass.
     *
     * @type {string}
     */
    label: string;
    /**
     * Defines which timestamp values are written and where.
     *
     * @type {Object|undefined}
     */
    timestampWrites: Object | undefined;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
