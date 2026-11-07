export interface ExtrudeGeometryOptions {
    /**
     * - Number of points on the curves.
     */
    curveSegments?: number | undefined;
    /**
     * - Number of points used for subdividing segments along the depth of the extruded spline.
     */
    steps?: number | undefined;
    /**
     * - Depth to extrude the shape.
     */
    depth?: number | undefined;
    /**
     * - Whether to beveling to the shape or not.
     */
    bevelEnabled?: boolean | undefined;
    /**
     * - How deep into the original shape the bevel goes.
     */
    bevelThickness?: number | undefined;
    /**
     * - Distance from the shape outline that the bevel extends.
     */
    bevelSize?: number | undefined;
    /**
     * - Distance from the shape outline that the bevel starts.
     */
    bevelOffset?: number | undefined;
    /**
     * - Number of bevel layers.
     */
    bevelSegments?: number | undefined;
    /**
     * - A 3D spline path along which the shape should be extruded. Bevels not supported for path extrusion.
     */
    extrudePath?: Curve<Vector3> | undefined;
    /**
     * - An object that provides UV generator functions for custom UV generation.
     */
    UVGenerator?: UVGenerator | undefined;
}

export interface UVGenerator {
    generateTopUV(
        geometry: ExtrudeGeometry,
        vertices: number[],
        indexA: number,
        indexB: number,
        indexC: number,
    ): Vector2[];
    generateSideWallUV(
        geometry: ExtrudeGeometry,
        vertices: number[],
        indexA: number,
        indexB: number,
        indexC: number,
        indexD: number,
    ): Vector2[];
}

/**
 * Creates extruded geometry from a path shape.
 *
 * ```js
 * const length = 12, width = 8;
 *
 * const shape = new THREE.Shape();
 * shape.moveTo( 0,0 );
 * shape.lineTo( 0, width );
 * shape.lineTo( length, width );
 * shape.lineTo( length, 0 );
 * shape.lineTo( 0, 0 );
 *
 * const geometry = new THREE.ExtrudeGeometry( shape );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const mesh = new THREE.Mesh( geometry, material ) ;
 * scene.add( mesh );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#ExtrudeGeometry
 */
export class ExtrudeGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @param {Array<Shape>} shapes - An array of shapes.
     * @return {ExtrudeGeometry} A new instance.
     */
    static fromJSON(data: {}, shapes: Array<Shape>): ExtrudeGeometry;
    /**
     * Constructs a new extrude geometry.
     *
     * @param {Shape|Array<Shape>} [shapes] - A shape or an array of shapes.
     * @param {ExtrudeGeometry~Options} [options] - The extrude settings.
     */
    constructor(shapes?: Shape | Array<Shape>, options?: ExtrudeGeometryOptions);
    /**
     * Holds the constructor parameters that have been
     * used to generate the geometry. Any modification
     * after instantiation does not change the geometry.
     *
     * @type {Object}
     */
    readonly parameters: {
        readonly shapes: Shape | Shape[];
        readonly options: ExtrudeGeometryOptions;
    };
    copy(source: ExtrudeGeometry): this;
}
import { BufferGeometry } from "../core/BufferGeometry.js";
import { Curve } from "../extras/core/Curve.js";
import { Shape } from "../extras/core/Shape.js";
import { Vector2 } from "../math/Vector2.js";
import { Vector3 } from "../math/Vector3.js";
