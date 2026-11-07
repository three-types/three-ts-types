export default GPURenderBundleEncoderDescriptor;
/**
 * Reusable descriptor for `GPUDevice.createRenderBundleEncoder()`.
 *
 * @private
 */
declare class GPURenderBundleEncoderDescriptor {
    /**
     * The label of the render bundle encoder.
     *
     * @type {string}
     */
    label: string;
    /**
     * The formats of the color attachments the bundle is compatible with.
     *
     * @type {?Array<?string>}
     * @default null
     */
    colorFormats: Array<string | null> | null;
    /**
     * The format of the depth/stencil attachment the bundle is compatible with.
     *
     * @type {string|undefined}
     */
    depthStencilFormat: string | undefined;
    /**
     * The number of samples per pixel the bundle is compatible with.
     *
     * @type {number}
     * @default 1
     */
    sampleCount: number;
    /**
     * Whether the depth attachment is read-only.
     *
     * @type {boolean}
     * @default false
     */
    depthReadOnly: boolean;
    /**
     * Whether the stencil attachment is read-only.
     *
     * @type {boolean}
     * @default false
     */
    stencilReadOnly: boolean;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
