export default GPUBufferDescriptor;
/**
 * Reusable descriptor for `GPUDevice.createBuffer()`.
 *
 * @private
 */
declare class GPUBufferDescriptor {
    /**
     * The label of the buffer.
     *
     * @type {string}
     */
    label: string;
    /**
     * The size of the buffer in bytes.
     *
     * @type {number}
     * @default 0
     */
    size: number;
    /**
     * The allowed usages for the buffer.
     *
     * @type {number}
     * @default 0
     */
    usage: number;
    /**
     * Whether the buffer is in the mapped state at creation.
     *
     * @type {boolean}
     * @default false
     */
    mappedAtCreation: boolean;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
