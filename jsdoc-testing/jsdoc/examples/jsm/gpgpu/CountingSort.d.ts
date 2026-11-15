/**
 * A reusable GPU counting sort.
 *
 * This computes a stable-ish permutation of the integers `[0, count)` that orders them by an
 * arbitrary, user supplied `uint` key ("bin") in the range `[0, binCount)`. It is a good fit for
 * approximate ordering of large element counts (hundreds of thousands to millions) where an exact
 * comparison sort such as a bitonic sort (see {@link BitonicSort}) would be too slow: a counting
 * sort only requires a fixed number of passes (reset, histogram, prefix sum, scatter) regardless of
 * `count`, at the cost of only being accurate to the resolution of `binCount` - elements that land
 * in the same bin end up in an unspecified relative order.
 *
 * This class does not compute the sort key itself. Instead, a TSL function is supplied via
 * {@link CountingSort#setBinNode} that maps the current `instanceIndex` to a bin, and an equivalent
 * plain JavaScript function can be supplied to {@link CountingSort#computeCPU} for platforms without
 * compute shader support (e.g. the WebGL backend of {@link WebGPURenderer}).
 *
 * ```js
 * const sort = new CountingSort( count, { binCount: 4096 } );
 * sort.setBinNode( () => {
 *
 * 	// return a `Node<uint>` bin index for `instanceIndex`, e.g. derived from a depth value.
 *
 * } );
 *
 * sort.compute( renderer );
 *
 * // `sort.orderRead` now holds a storage buffer of `count` indices, ordered by bin.
 * ```
 *
 * @three_import import { CountingSort } from 'three/addons/gpgpu/CountingSort.js';
 */
export class CountingSort {
    /**
     * Constructs a new counting sort.
     *
     * @param {number} count - The number of elements to sort.
     * @param {Object} [options={}] - Options that modify the counting sort.
     * @param {number} [options.binCount=4096] - The number of bins/buckets the sort key is quantized into. Larger values improve sort accuracy at the cost of a longer (but still single-pass) prefix sum.
     * @param {number} [options.workgroupSize=256] - The workgroup size of the compute shaders executed during the sort.
     */
    constructor(count: number, { binCount, workgroupSize }?: {
        binCount?: number | undefined;
        workgroupSize?: number | undefined;
    });
    /**
     * The number of elements to sort.
     *
     * @type {number}
     */
    count: number;
    /**
     * The number of bins/buckets the sort key is quantized into.
     *
     * @type {number}
     */
    binCount: number;
    /**
     * The workgroup size of the compute shaders executed during the sort.
     *
     * @type {number}
     */
    workgroupSize: number;
    /**
     * The buffer attribute holding the sorted order (a permutation of `[0, count)`). This is
     * also the attribute that is kept up to date by {@link CountingSort#computeCPU}.
     *
     * @type {StorageBufferAttribute}
     */
    orderAttribute: StorageBufferAttribute;
    /**
     * A read-only storage node for the sorted order buffer.
     *
     * @type {StorageBufferNode}
     */
    orderRead: StorageBufferNode;
    /**
     * A writable storage node for the sorted order buffer.
     *
     * @type {StorageBufferNode}
     */
    orderWrite: StorageBufferNode;
    /**
     * A read-only storage node holding each element's bin, computed during the histogram pass.
     *
     * @type {StorageBufferNode}
     */
    binRead: StorageBufferNode;
    /**
     * A writable storage node holding each element's bin.
     *
     * @type {StorageBufferNode}
     */
    binWrite: StorageBufferNode;
    /**
     * An atomic storage node used to accumulate the per-bin histogram.
     *
     * @type {StorageBufferNode}
     */
    histogramAtomic: StorageBufferNode;
    /**
     * An atomic storage node used both for the exclusive prefix sum of the histogram and, during
     * the scatter pass, as a per-bin write cursor.
     *
     * @type {StorageBufferNode}
     */
    offsetAtomic: StorageBufferNode;
    _webGLBuffersEnabled: boolean;
    _cpuBins: Uint32Array<ArrayBuffer>;
    _cpuCounts: Uint32Array<ArrayBuffer>;
    _cpuOffsets: Uint32Array<ArrayBuffer>;
    _resetNode: any;
    _histogramNode: any;
    _prefixNode: any;
    _scatterNode: any;
    /**
     * Sets the TSL function used to compute the bin of the element currently referenced by
     * `instanceIndex`, and (re)builds the compute nodes used by {@link CountingSort#compute}.
     *
     * @param {Function} binNode - A parameterless function returning a `Node<uint>` in `[0, binCount)`.
     */
    setBinNode(binNode: Function): void;
    /**
     * Executes a complete counting sort on the GPU, updating {@link CountingSort#orderRead}.
     *
     * @param {Renderer} renderer - The current scene's renderer.
     */
    compute(renderer: Renderer): void;
    /**
     * Executes a complete counting sort on the CPU, updating {@link CountingSort#orderAttribute}.
     * Intended as a fallback for backends without compute shader support.
     *
     * @param {Function} binFn - A function taking an element index and returning its bin (a plain number in `[0, binCount)`).
     */
    computeCPU(binFn: Function): void;
    /**
     * Enables the WebGL-specific storage buffer path (PBO + dynamic draw usage) for the order buffer.
     * Only needed when {@link CountingSort#computeCPU} is used with the WebGL backend of {@link WebGPURenderer}.
     */
    enableWebGLBuffers(): void;
}
import { StorageBufferAttribute } from 'three/webgpu';
