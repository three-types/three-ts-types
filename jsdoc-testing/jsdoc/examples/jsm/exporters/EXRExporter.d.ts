/**
 * ~Options
 */
export type EXRExporter = {
    /**
     * - Output data type.
     */
    type?: number | undefined;
};
/**
 * An exporter for EXR.
 *
 * EXR ( Extended Dynamic Range) is an [open format specification](https://github.com/AcademySoftwareFoundation/openexr)
 * for professional-grade image storage format of the motion picture industry. The purpose of
 * format is to accurately and efficiently represent high-dynamic-range scene-linear image data
 * and associated metadata. The library is widely used in host application software where accuracy
 * is critical, such as photorealistic rendering, texture access, image compositing, deep compositing,
 * and DI.
 *
 * ```js
 * const exporter = new EXRExporter();
 * const result = await exporter.parse( renderer, options );
 * ```
 *
 * @three_import import { EXRExporter } from 'three/addons/exporters/EXRExporter.js';
 */
export class EXRExporter {
    /**
     * This method has two variants.
     *
     * - When exporting a data texture, it receives two parameters. The texture and the exporter options.
     * - When exporting a render target (e.g. a PMREM), it receives three parameters. The renderer, the
     * render target and the exporter options.
     *
     * @async
     * @param {(DataTexture|WebGPURenderer|WebGLRenderer)} arg1 - The data texture to export or a renderer.
     * @param {(EXRExporter~Options|RenderTarget)} arg2 - The exporter options or a render target.
     * @param {EXRExporter~Options} [arg3] - The exporter options.
     * @return {Promise<Uint8Array>} A Promise that resolves with the exported EXR.
     */
    parse(arg1: (DataTexture | WebGPURenderer | WebGLRenderer), arg2: any, arg3: any): Promise<Uint8Array>;
}
export const NO_COMPRESSION: 0;
export const ZIP_COMPRESSION: 3;
export const ZIPS_COMPRESSION: 2;
