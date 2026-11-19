export default GPURenderPassTimestampWrites;
/**
 * Reusable descriptor for `GPURenderPassTimestampWrites`, the
 * `timestampWrites` field of `GPURenderPassDescriptor`. The same shape is
 * also accepted as `GPUComputePassTimestampWrites`.
 *
 * @private
 */
declare class GPURenderPassTimestampWrites {
    /**
     * The query set the timestamps are written to.
     *
     * @type {?GPUQuerySet}
     * @default null
     */
    querySet: GPUQuerySet | null;
    /**
     * The index in the query set the beginning timestamp is written to.
     *
     * @type {number|undefined}
     */
    beginningOfPassWriteIndex: number | undefined;
    /**
     * The index in the query set the ending timestamp is written to.
     *
     * @type {number|undefined}
     */
    endOfPassWriteIndex: number | undefined;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
