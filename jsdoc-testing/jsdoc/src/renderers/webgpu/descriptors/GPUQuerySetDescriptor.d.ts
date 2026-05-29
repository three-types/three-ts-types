export default GPUQuerySetDescriptor;
/**
 * Reusable descriptor for `GPUDevice.createQuerySet()`.
 *
 * @private
 */
declare class GPUQuerySetDescriptor {
    /**
     * The label of the query set.
     *
     * @type {string}
     */
    label: string;
    /**
     * The type of queries managed by the set.
     *
     * @type {string|undefined}
     */
    type: string | undefined;
    /**
     * The number of queries managed by the set.
     *
     * @type {number}
     * @default 0
     */
    count: number;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
