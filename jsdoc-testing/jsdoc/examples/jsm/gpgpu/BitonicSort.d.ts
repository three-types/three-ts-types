/**
 * Returns the indices that will be compared in a bitonic flip operation.
 *
 * @tsl
 * @private
 * @param {Node<uint>} index - The compute thread's invocation id.
 * @param {Node<uint>} blockHeight - The height of the block within which elements are being swapped.
 * @returns {Node<uvec2>} The indices of the elements in the data buffer being compared.
 */
export const getBitonicFlipIndices: any;
/**
 * Returns the indices that will be compared in a bitonic sort's disperse operation.
 *
 * @tsl
 * @private
 * @param {Node<uint>} index - The compute thread's invocation id.
 * @param {Node<uint>} swapSpan - The maximum span over which elements are being swapped.
 * @returns {Node<uvec2>} The indices of the elements in the data buffer being compared.
 */
export const getBitonicDisperseIndices: any;
export class BitonicSort {
    /**
     * Constructs a new light probe helper.
     *
     * @param {Renderer} renderer - The current scene's renderer.
     * @param {StorageBufferNode} dataBuffer - The data buffer to sort.
     * @param {Object} [options={}] - Options that modify the bitonic sort.
     */
    constructor(renderer: Renderer, dataBuffer: StorageBufferNode, options?: Object);
    /**
     * A reference to the renderer.
     *
     * @type {Renderer}
     */
    renderer: Renderer;
    /**
     * A reference to the StorageBufferNode holding the data that will be sorted  .
     *
     * @type {StorageBufferNode}
     */
    dataBuffer: StorageBufferNode;
    /**
     * The size of the data.
     *
     * @type {StorageBufferNode}
     */
    count: StorageBufferNode;
    /**
     *
     * The size of each compute dispatch.
     * @type {number}
     */
    dispatchSize: number;
    /**
     * The workgroup size of the compute shaders executed during the sort.
     *
     * @type {StorageBufferNode}
    */
    workgroupSize: StorageBufferNode;
    /**
     * A node representing a workgroup scoped buffer that holds locally sorted elements.
     *
     * @type {WorkgroupInfoNode}
    */
    localStorage: WorkgroupInfoNode;
    _tempArray: Uint32Array<StorageBufferNode>;
    /**
     * A node representing a storage buffer used for transferring the result of the global sort back to the original data buffer.
     *
     * @type {StorageBufferNode}
    */
    tempBuffer: StorageBufferNode;
    /**
     * A node containing the current algorithm type, the current swap span, and the highest swap span.
     *
     * @type {StorageBufferNode}
    */
    infoStorage: StorageBufferNode;
    /**
     * The number of distinct swap operations ('flips' and 'disperses') executed in an in-place
     * bitonic sort of the current data buffer.
     *
     * @type {number}
    */
    swapOpCount: number;
    /**
     * The number of steps (i.e prepping and/or executing a swap) needed to fully execute an in-place bitonic sort of the current data buffer.
     *
     * @type {number}
    */
    stepCount: number;
    /**
     * The number of the buffer being read from.
     *
     * @type {string}
    */
    readBufferName: string;
    /**
     * An object containing compute shaders that execute a 'flip' swap within a global address space on elements in the data buffer.
     *
     * @type {Object<string, ComputeNode>}
    */
    flipGlobalNodes: {
        [x: string]: ComputeNode;
    };
    /**
     * An object containing compute shaders that execute a 'disperse' swap within a global address space on elements in the data buffer.
     *
     * @type {Object<string, ComputeNode>}
    */
    disperseGlobalNodes: {
        [x: string]: ComputeNode;
    };
    /**
     * A compute shader that executes a sequence of flip and disperse swaps within a local address space on elements in the data buffer.
     *
     * @type {ComputeNode}
    */
    swapLocalFn: ComputeNode;
    /**
     * A compute shader that executes a sequence of disperse swaps within a local address space on elements in the data buffer.
     *
     * @type {Object<string, ComputeNode>}
    */
    disperseLocalNodes: {
        [x: string]: ComputeNode;
    };
    /**
     * A compute shader that sets up the algorithm and the swap span for the next swap operation.
     *
     * @type {ComputeNode}
    */
    setAlgoFn: ComputeNode;
    /**
     * A compute shader that aligns the result of the global swap operation with the current buffer.
     *
     * @type {ComputeNode}
    */
    alignFn: ComputeNode;
    /**
     * A compute shader that resets the algorithm and swap span information.
     *
     * @type {ComputeNode}
    */
    resetFn: ComputeNode;
    /**
     * The current compute shader dispatch within the list of dispatches needed to complete the sort.
     *
     * @type {number}
    */
    currentDispatch: number;
    /**
     * The number of global swap operations that must be executed before the sort
     * can swap in local address space.
     *
     * @type {number}
    */
    globalOpsRemaining: number;
    /**
     * The total number of global operations needed to sort elements within the current swap span.
     *
     * @type {number}
    */
    globalOpsInSpan: number;
    /**
     * Get total number of distinct swaps that occur in a bitonic sort.
     *
     * @private
     * @returns {number} - The total number of distinct swaps in a bitonic sort
     */
    private _getSwapOpCount;
    /**
     * Get the number of steps it takes to execute a complete bitonic sort.
     *
     * @private
     * @returns {number} The number of steps it takes to execute a complete bitonic sort.
     */
    private _getStepCount;
    /**
     * Compares and swaps two data points in the data buffer within the global address space.
     * @param {Node<uint>} idxBefore - The index of the first data element in the data buffer.
     * @param {Node<uint>} idxAfter - The index of the second data element in the data buffer.
     * @param {StorageBufferNode} dataBuffer - The buffer of data to read from.
     * @param {StorageBufferNode} tempBuffer - The buffer of data to write to.
     * @private
     *
     */
    private _globalCompareAndSwapTSL;
    /**
     * Compares and swaps two data points in the data buffer within the local address space.
     *
     * @private
     * @param {Node<uint>} idxBefore - The index of the first data element in the data buffer.
     * @param {Node<uint>} idxAfter - The index of the second data element in the data buffer
     */
    private _localCompareAndSwapTSL;
    /**
     * Create the compute shader that performs a global disperse swap on the data buffer.
     *
     * @private
     * @param {StorageBufferNode} readBuffer - The data buffer to read from.
     * @param {StorageBufferNode} writeBuffer - The data buffer to read from.
     * @returns {ComputeNode} - A compute shader that performs a global disperse swap on the data buffer.
     */
    private _getDisperseGlobal;
    /**
     * Create the compute shader that performs a global flip swap on the data buffer.
     *
     * @private
     * @param {StorageBufferNode} readBuffer - The data buffer to read from.
     * @param {StorageBufferNode} writeBuffer - The data buffer to read from.
     * @returns {ComputeNode} - A compute shader that executes a global flip swap.
     */
    private _getFlipGlobal;
    /**
     * Create the compute shader that performs a complete local swap on the data buffer.
     *
     * @private
     * @returns {ComputeNode} - A compute shader that executes a full local swap.
     */
    private _getSwapLocal;
    /**
     * Create the compute shader that performs a local disperse swap on the data buffer.
     *
     * @private
     * @param {StorageBufferNode} readWriteBuffer - The data buffer to read from and write to.
     * @returns {ComputeNode} - A compute shader that executes a local disperse swap.
     */
    private _getDisperseLocal;
    /**
     * Create the compute shader that resets the sort's algorithm information.
     *
     * @private
     * @returns {ComputeNode} - A compute shader that resets the bitonic sort's algorithm information.
     */
    private _getResetFn;
    /**
     * Create the compute shader that copies the state of the last global swap to the data buffer.
     *
     * @private
     * @returns {ComputeNode} - A compute shader that copies the state of the last global swap to the data buffer.
     */
    private _getAlignFn;
    /**
     * Create the compute shader that sets the bitonic sort algorithm's information.
     *
     * @private
     * @returns {ComputeNode} - A compute shader that sets the bitonic sort algorithm's information.
     */
    private _getSetAlgoFn;
    /**
     * Executes a step of the bitonic sort operation.
     *
     * @param {Renderer} renderer - The current scene's renderer.
     */
    computeStep(renderer: Renderer): void;
    /**
     * Executes a complete bitonic sort on the data buffer.
     *
     * @param {Renderer} renderer - The current scene's renderer.
     */
    compute(renderer: Renderer): void;
}
