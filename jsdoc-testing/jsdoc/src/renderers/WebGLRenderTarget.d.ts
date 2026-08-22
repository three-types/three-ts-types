/**
 * A render target used in context of {@link WebGLRenderer}.
 *
 * @augments RenderTarget
 */
export class WebGLRenderTarget extends RenderTarget {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWebGLRenderTarget: boolean;
}
import { RenderTarget } from '../core/RenderTarget.js';
