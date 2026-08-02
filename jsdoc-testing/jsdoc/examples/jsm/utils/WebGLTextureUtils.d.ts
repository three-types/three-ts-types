/**
 * Returns an uncompressed version of the given compressed texture.
 *
 * This module can only be used with {@link WebGLRenderer}. When using {@link WebGPURenderer},
 * import the function from {@link WebGPUTextureUtils}.
 *
 * @param {CompressedTexture} texture - The compressed texture.
 * @param {number} [maxTextureSize=Infinity] - The maximum size of the uncompressed texture.
 * @param {?WebGLRenderer} [renderer=null] - A reference to a renderer.
 * @return {CanvasTexture} The uncompressed texture.
 */
export function decompress(texture: CompressedTexture, maxTextureSize?: number, renderer?: WebGLRenderer | null): CanvasTexture;
import { WebGLRenderer } from 'three';
import { CanvasTexture } from 'three';
