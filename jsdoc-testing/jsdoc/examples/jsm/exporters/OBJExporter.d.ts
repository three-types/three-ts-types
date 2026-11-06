/**
 * An exporter for OBJ.
 *
 * `OBJExporter` is not able to export material data into MTL files so only geometry data are supported.
 *
 * ```js
 * const exporter = new OBJExporter();
 * const data = exporter.parse( scene );
 * ```
 *
 * @three_import import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';
 */
export class OBJExporter {
    /**
     * Parses the given 3D object and generates the OBJ output.
     *
     * If the 3D object is composed of multiple children and geometry, they are merged into a single mesh in the file.
     *
     * @param {Object3D} object - The 3D object to export.
     * @return {string} The exported OBJ.
     */
    parse(object: Object3D): string;
}
