import { DataArrayTexture } from '../textures/DataArrayTexture';
import { DataDimensions3D } from '../textures/Texture';
import { WebGLRenderTarget } from './WebGLRenderTarget';

/**
 * This type of render target represents an array of textures.
 */
export class WebGLArrayRenderTarget extends WebGLRenderTarget<DataDimensions3D, DataDimensions3D, DataArrayTexture> {
    /**
     * Creates a new WebGLArrayRenderTarget.
     *
     * @param width the width of the render target, in pixels.
     * @param height the height of the render target, in pixels.
     * @param depth the depth/layer count of the render target.
     */
    constructor(width: number, height: number, depth: number);

    /**
     * The depth of the render target.
     */
    depth: number;

    readonly isWebGLArrayRenderTarget: true;
}
