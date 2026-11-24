/**
 * ~Options
 */
export type DRACOExporter = {
    /**
     * - Indicates how to tune the encoder regarding decode speed (0 gives better speed but worst quality).
     */
    decodeSpeed?: number | undefined;
    /**
     * - Indicates how to tune the encoder parameters (0 gives better speed but worst quality).
     */
    encodeSpeed?: number | undefined;
    /**
     * - Either sequential (very little compression) or Edgebreaker. Edgebreaker traverses the triangles of the mesh in a deterministic, spiral-like way which provides most of the benefits of this data format.
     */
    encoderMethod?: number | undefined;
    /**
     * - Indicates the precision of each type of data stored in the draco file in the order (POSITION, NORMAL, COLOR, TEX_COORD, GENERIC).
     */
    quantization?: number[] | undefined;
    /**
     * - Whether to export UVs or not.
     */
    exportUvs?: boolean | undefined;
    /**
     * - Whether to export normals or not.
     */
    exportNormals?: boolean | undefined;
    /**
     * - Whether to export colors or not.
     */
    exportColor?: boolean | undefined;
};
/**
 * An exporter to compress geometry with the Draco library.
 *
 * [Draco](https://google.github.io/draco/) is an open source library for compressing and
 * decompressing 3D meshes and point clouds. Compressed geometry can be significantly smaller,
 * at the cost of additional decoding time on the client device.
 *
 * Standalone Draco files have a `.drc` extension, and contain vertex positions,
 * normals, colors, and other attributes. Draco files *do not* contain materials,
 * textures, animation, or node hierarchies – to use these features, embed Draco geometry
 * inside of a glTF file. A normal glTF file can be converted to a Draco-compressed glTF file
 * using [glTF-Pipeline](https://github.com/AnalyticalGraphicsInc/gltf-pipeline).
 *
 * The exporter requires the Draco encoder to be loaded as a global script in advance:
 *
 * ```html
 * <script src="https://cdn.jsdelivr.net/gh/google/draco@1.5.7/javascript/draco_encoder.js"></script>
 * ```
 *
 * ```js
 * const exporter = new DRACOExporter();
 * const data = await exporter.parseAsync( mesh, options );
 * ```
 *
 * @three_import import { DRACOExporter } from 'three/addons/exporters/DRACOExporter.js';
 */
export class DRACOExporter {
    /**
     * Parses the given mesh or point cloud and generates the Draco output.
     *
     * @async
     * @param {(Mesh|Points)} object - The mesh or point cloud to export.
     * @param {DRACOExporter~Options} options - The export options.
     * @return {Promise<Int8Array>} A Promise that resolves with the exported Draco.
     */
    parseAsync(object: (Mesh | Points), options?: {}): Promise<Int8Array>;
    /**
     * @deprecated Use {@link DRACOExporter#parseAsync} instead.
     */
    parse(): void;
}
export namespace DRACOExporter {
    let MESH_EDGEBREAKER_ENCODING: number;
    let MESH_SEQUENTIAL_ENCODING: number;
    let POINT_CLOUD: number;
    let TRIANGULAR_MESH: number;
    let INVALID: number;
    let POSITION: number;
    let NORMAL: number;
    let COLOR: number;
    let TEX_COORD: number;
    let GENERIC: number;
}
