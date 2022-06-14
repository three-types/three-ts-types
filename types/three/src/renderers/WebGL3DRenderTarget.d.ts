import { Data3DTexture } from '../textures/Data3DTexture';
import { DataDimensions3D } from '../textures/Texture';
import { WebGLRenderTarget } from './WebGLRenderTarget';

/**
 * Represents a three-dimensional render target.
 */
export class WebGL3DRenderTarget extends WebGLRenderTarget<DataDimensions3D, DataDimensions3D, Data3DTexture> {
    /**
     * Creates a new WebGL3DRenderTarget.
     *
     * @param width the width of the render target, in pixels.
     * @param height the height of the render target, in pixels.
     * @param depth the depth of the render target.
     */
    constructor(width: number, height: number, depth: number);

    /**
     * The depth of the render target.
     */
    depth: number;

    readonly isWebGL3DRenderTarget: true;
}
