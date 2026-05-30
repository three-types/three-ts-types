/**
 * Returns an uncompressed version of the given compressed texture.
 *
 * This module can only be used with {@link WebGPURenderer}. When using {@link WebGLRenderer},
 * import the function from {@link WebGLTextureUtils}.
 *
 * @async
 * @param {CompressedTexture} blitTexture - The compressed texture.
 * @param {number} [maxTextureSize=Infinity] - The maximum size of the uncompressed texture.
 * @param {?WebGPURenderer} [renderer=null] - A reference to a renderer.
 * @return {Promise<CanvasTexture>} A Promise that resolved with the uncompressed texture.
 */
export function decompress(blitTexture: CompressedTexture, maxTextureSize?: number, renderer?: WebGPURenderer | null): Promise<CanvasTexture>;
import { WebGPURenderer } from 'three/webgpu';
import { CanvasTexture } from 'three/webgpu';
