export default WebGPUPipelineUtils;
/**
 * A WebGPU backend utility module for managing pipelines.
 *
 * @private
 */
declare class WebGPUPipelineUtils {
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
     * Returns the sample count derived from the given render context.
     *
     * @private
     * @param {RenderContext} renderContext - The render context.
     * @return {number} The sample count.
     */
    private _getSampleCount;
    /**
     * Creates a render pipeline for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @param {Array<Promise>} promises - An array of compilation promises which are used in `compileAsync()`.
     */
    createRenderPipeline(renderObject: RenderObject, promises: Array<Promise<any>>): void;
    /**
     * Creates GPU render bundle encoder for the given render context.
     *
     * @param {RenderContext} renderContext - The render context.
     * @param {?string} [label='renderBundleEncoder'] - The label.
     * @return {GPURenderBundleEncoder} The GPU render bundle encoder.
     */
    createBundleEncoder(renderContext: RenderContext, label?: string | null): GPURenderBundleEncoder;
    /**
     * Creates a compute pipeline for the given compute node.
     *
     * @param {ComputePipeline} pipeline - The compute pipeline.
     * @param {Array<BindGroup>} bindings - The bindings.
     */
    createComputePipeline(pipeline: ComputePipeline, bindings: Array<BindGroup>): void;
    /**
     * Reads line-accurate diagnostics from shader modules and logs them.
     * Called from pipeline creation error paths to turn opaque validation
     * failures into actionable WGSL feedback.
     *
     * @private
     * @param {Array<{program: ProgrammableStage, module: GPUShaderModule}>} stages - Pairs of program + compiled shader module.
     * @param {string} pipelineLabel - Label of the owning pipeline, used as log prefix.
     * @return {Promise<void>}
     */
    private _reportShaderDiagnostics;
    /**
     * Returns the blending state as a descriptor object required
     * for the pipeline creation.
     *
     * @private
     * @param {Material|BlendMode} object - The object containing blending information.
     * @return {Object} The blending state.
     */
    private _getBlending;
    /**
     * Returns the GPU blend factor which is required for the pipeline creation.
     *
     * @private
     * @param {number} blend - The blend factor as a three.js constant.
     * @return {string} The GPU blend factor.
     */
    private _getBlendFactor;
    /**
     * Returns the GPU stencil compare function which is required for the pipeline creation.
     *
     * @private
     * @param {Material} material - The material.
     * @return {string} The GPU stencil compare function.
     */
    private _getStencilCompare;
    /**
     * Returns the GPU stencil operation which is required for the pipeline creation.
     *
     * @private
     * @param {number} op - A three.js constant defining the stencil operation.
     * @return {string} The GPU stencil operation.
     */
    private _getStencilOperation;
    /**
     * Returns the GPU blend operation which is required for the pipeline creation.
     *
     * @private
     * @param {number} blendEquation - A three.js constant defining the blend equation.
     * @return {string} The GPU blend operation.
     */
    private _getBlendOperation;
    /**
     * Returns the primitive state as a descriptor object required
     * for the pipeline creation.
     *
     * @private
     * @param {Object3D} object - The 3D object.
     * @param {BufferGeometry} geometry - The geometry.
     * @param {Material} material - The material.
     * @return {Object} The primitive state.
     */
    private _getPrimitiveState;
    /**
     * Returns the GPU color write mask which is required for the pipeline creation.
     *
     * @private
     * @param {Material} material - The material.
     * @return {number} The GPU color write mask.
     */
    private _getColorWriteMask;
    /**
     * Returns the GPU depth compare function which is required for the pipeline creation.
     *
     * @private
     * @param {Material} material - The material.
     * @return {string} The GPU depth compare function.
     */
    private _getDepthCompare;
}
