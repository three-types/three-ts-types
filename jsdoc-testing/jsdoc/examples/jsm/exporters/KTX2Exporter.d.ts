/**
 * An exporter for KTX2.
 *
 * ```js
 * const exporter = new KTX2Exporter();
 * const result = await exporter.parse( dataTexture );
 * ```
 *
 * @three_import import { KTX2Exporter } from 'three/addons/exporters/KTX2Exporter.js';
 */
export class KTX2Exporter {
    /**
     * This method has two variants.
     *
     * - When exporting a data texture, it receives one parameter. The data or 3D data texture.
     * - When exporting a render target (e.g. a PMREM), it receives two parameters. The renderer and the
     * render target.
     *
     * @async
     * @param {(DataTexture|Data3DTexture|WebGPURenderer|WebGLRenderer)} arg1 - The data texture to export or a renderer.
     * @param {RenderTarget} [arg2] - The render target that should be exported
     * @return {Promise<Uint8Array>} A Promise that resolves with the exported KTX2.
     */
    parse(arg1: (DataTexture | Data3DTexture | WebGPURenderer | WebGLRenderer), arg2?: RenderTarget): Promise<Uint8Array>;
}
import { DataTexture } from 'three';
