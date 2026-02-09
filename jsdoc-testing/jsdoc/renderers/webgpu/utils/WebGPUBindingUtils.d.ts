export default WebGPUBindingUtils;
/**
 * A WebGPU backend utility module for managing bindings.
 *
 * When reading the documentation it's helpful to keep in mind that
 * all class definitions starting with 'GPU*' are modules from the
 * WebGPU API. So for example `BindGroup` is a class from the engine
 * whereas `GPUBindGroup` is a class from WebGPU.
 *
 * @private
 */
declare class WebGPUBindingUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGPUBackend} backend - The WebGPU backend.
     */
    constructor(backend: WebGPUBackend);
    /**
     * A reference to the WebGPU backend.
     *
     * @type {WebGPUBackend}
     */
    backend: WebGPUBackend;
    /**
     * A cache that maps combinations of layout entries to existing bind group layouts.
     *
     * @private
     * @type {Map<string, BindGroupLayout>}
     */
    private _bindGroupLayoutCache;
    /**
     * Creates a GPU bind group layout for the given bind group.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @return {GPUBindGroupLayout} The GPU bind group layout.
     */
    createBindingsLayout(bindGroup: BindGroup): GPUBindGroupLayout;
    /**
     * Creates bindings from the given bind group definition.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {number} cacheIndex - The cache index.
     * @param {number} version - The version.
     */
    createBindings(bindGroup: BindGroup, bindings: Array<BindGroup>, cacheIndex: number, version?: number): void;
    /**
     * Updates a buffer binding.
     *
     *  @param {Buffer} binding - The buffer binding to update.
     */
    updateBinding(binding: Buffer): void;
    /**
     * Creates a GPU bind group for the camera index.
     *
     * @param {Uint32Array} data - The index data.
     * @param {GPUBindGroupLayout} layoutGPU - The GPU bind group layout.
     * @return {GPUBindGroup} The GPU bind group.
     */
    createBindGroupIndex(data: Uint32Array, layoutGPU: GPUBindGroupLayout): GPUBindGroup;
    /**
     * Creates a GPU bind group for the given bind group and GPU layout.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @param {GPUBindGroupLayout} layoutGPU - The GPU bind group layout.
     * @return {GPUBindGroup} The GPU bind group.
     */
    createBindGroup(bindGroup: BindGroup, layoutGPU: GPUBindGroupLayout): GPUBindGroup;
    /**
     * Creates a GPU bind group layout entries for the given bind group.
     *
     * @private
     * @param {BindGroup} bindGroup - The bind group.
     * @return {Array<GPUBindGroupLayoutEntry>} The GPU bind group layout entries.
     */
    private _createLayoutEntries;
    /**
     * Delete the data associated with a bind group.
     *
     * @param {BindGroup} bindGroup - The bind group.
     */
    deleteBindGroupData(bindGroup: BindGroup): void;
    /**
     * Frees internal resources.
     */
    dispose(): void;
}
