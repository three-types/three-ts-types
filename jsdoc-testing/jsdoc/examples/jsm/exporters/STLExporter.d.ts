/**
 * ~Options
 */
export type STLExporter = {
    /**
     * - Whether to export in binary format or ASCII.
     */
    binary?: boolean | undefined;
};
/**
 * An exporter for STL.
 *
 * STL files describe only the surface geometry of a three-dimensional object without
 * any representation of color, texture or other common model attributes. The STL format
 * specifies both ASCII and binary representations, with binary being more compact.
 * STL files contain no scale information or indexes, and the units are arbitrary.
 *
 * ```js
 * const exporter = new STLExporter();
 * const data = exporter.parse( mesh, { binary: true } );
 * ```
 *
 * @three_import import { STLExporter } from 'three/addons/exporters/STLExporter.js';
 */
export class STLExporter {
    /**
     * Parses the given 3D object and generates the STL output.
     *
     * If the 3D object is composed of multiple children and geometry, they are merged into a single mesh in the file.
     *
     * @param {Object3D} scene - A scene, mesh or any other 3D object containing meshes to encode.
     * @param {STLExporter~Options} options - The export options.
     * @return {string|ArrayBuffer} The exported STL.
     */
    parse(scene: Object3D, options?: {}): string | ArrayBuffer;
}
