export default GPURenderPipelineDescriptor;
/**
 * Reusable descriptor for `GPUDevice.createRenderPipeline()` and
 * `createRenderPipelineAsync()`.
 *
 * @private
 */
declare class GPURenderPipelineDescriptor {
    /**
     * The label of the render pipeline.
     *
     * @type {string}
     */
    label: string;
    /**
     * The pipeline layout the pipeline conforms to, or `'auto'`.
     *
     * @type {?GPUPipelineLayout|string}
     * @default null
     */
    layout: (GPUPipelineLayout | string) | null;
    /**
     * The programmable vertex stage.
     *
     * @type {?Object}
     * @default null
     */
    vertex: Object | null;
    /**
     * The primitive-assembly state.
     *
     * @type {Object}
     */
    primitive: Object;
    /**
     * The depth/stencil state, omitted when the pipeline has no depth or stencil aspect.
     *
     * @type {Object|undefined}
     */
    depthStencil: Object | undefined;
    /**
     * The multisample state.
     *
     * @type {GPUMultisampleState}
     */
    multisample: GPUMultisampleState;
    /**
     * The programmable fragment stage. Omitted for vertex-only pipelines.
     *
     * @type {?Object}
     * @default null
     */
    fragment: Object | null;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
/**
 * Reusable nested state for `GPURenderPipelineDescriptor.multisample`.
 *
 * @private
 */
declare class GPUMultisampleState {
    /**
     * The number of samples per pixel.
     *
     * @type {number}
     * @default 1
     */
    count: number;
    /**
     * A bitmask determining which samples are written to.
     *
     * @type {number}
     * @default 0xFFFFFFFF
     */
    mask: number;
    /**
     * Whether a fragment's alpha channel is used to generate a sample coverage mask.
     *
     * @type {boolean}
     * @default false
     */
    alphaToCoverageEnabled: boolean;
    /**
     * Resets the state to its default values.
     */
    reset(): void;
}
