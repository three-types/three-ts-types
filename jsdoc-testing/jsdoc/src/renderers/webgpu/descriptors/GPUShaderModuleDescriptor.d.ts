export default GPUShaderModuleDescriptor;
/**
 * Reusable descriptor for `GPUDevice.createShaderModule()`.
 *
 * @private
 */
declare class GPUShaderModuleDescriptor {
    /**
     * The label of the shader module.
     *
     * @type {string}
     */
    label: string;
    /**
     * The WGSL source code of the shader module.
     *
     * @type {string}
     */
    code: string;
    /**
     * Compilation hints that may help the implementation produce optimized code.
     *
     * @type {Array<Object>}
     */
    compilationHints: Array<Object>;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
