export default GPUBindGroupDescriptor;
/**
 * Reusable descriptor for `GPUDevice.createBindGroup()`.
 *
 * @private
 */
declare class GPUBindGroupDescriptor {
    /**
     * The label of the bind group.
     *
     * @type {string}
     */
    label: string;
    /**
     * The bind group layout the bind group conforms to.
     *
     * @type {?GPUBindGroupLayout}
     * @default null
     */
    layout: GPUBindGroupLayout | null;
    /**
     * The bind group entries.
     *
     * @type {Array<Object>}
     */
    entries: Array<Object>;
    /**
     * Resets the descriptor to its default state. The internal `entries` array
     * is emptied without releasing its backing storage.
     */
    reset(): void;
}
