/**
 * ~Options
 */
export type PLYExporter = {
    /**
     * - Whether to export in binary format or ASCII.
     */
    binary?: boolean | undefined;
    /**
     * - Which properties to explicitly exclude from
     * the exported PLY file. Valid values are `'color'`, `'normal'`, `'uv'`, and `'index'`. If triangle
     * indices are excluded, then a point cloud is exported.
     */
    excludeAttributes?: string[] | undefined;
    /**
     * - Whether the binary export uses little or big endian.
     */
    littleEndian?: boolean | undefined;
};
/**
 * An exporter for PLY.
 *
 * PLY (Polygon or Stanford Triangle Format) is a file format for efficient delivery and
 * loading of simple, static 3D content in a dense format. Both binary and ascii formats are
 * supported. PLY can store vertex positions, colors, normals and uv coordinates. No textures
 * or texture references are saved.
 *
 * ```js
 * const exporter = new PLYExporter();
 * const data = exporter.parse( scene, options );
 * ```
 *
 * @three_import import { PLYExporter } from 'three/addons/exporters/PLYExporter.js';
 */
export class PLYExporter {
    /**
     * Parses the given 3D object and generates the PLY output.
     *
     * If the 3D object is composed of multiple children and geometry, they are merged into a single mesh in the file.
     *
     * @param {Object3D} object - The 3D object to export.
     * @param {PLYExporter~OnDone} onDone - A callback function that is executed when the export has finished.
     * @param {PLYExporter~Options} options - The export options.
     * @return {?(string|ArrayBuffer)} The exported PLY.
     */
    parse(object: Object3D, onDone: any, options?: {}): (string | ArrayBuffer) | null;
}
