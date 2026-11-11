/**
 * Creates an one-sided polygonal geometry from one or more path shapes.
 *
 * ```js
 * const arcShape = new THREE.Shape()
 *	.moveTo( 5, 1 )
 *	.absarc( 1, 1, 4, 0, Math.PI * 2, false );
 *
 * const geometry = new THREE.ShapeGeometry( arcShape );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide } );
 * const mesh = new THREE.Mesh( geometry, material ) ;
 * scene.add( mesh );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#ShapeGeometry
 */
export class ShapeGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @param {Array<Shape>} shapes - An array of shapes.
     * @return {ShapeGeometry} A new instance.
     */
    static fromJSON(data: Object, shapes: Array<Shape>): ShapeGeometry;
    /**
     * Constructs a new shape geometry.
     *
     * @param {Shape|Array<Shape>} [shapes] - A shape or an array of shapes.
     * @param {number} [curveSegments=12] - Number of segments per shape.
     */
    constructor(shapes?: Shape | Array<Shape>, curveSegments?: number);
    /**
     * Holds the constructor parameters that have been
     * used to generate the geometry. Any modification
     * after instantiation does not change the geometry.
     *
     * @type {Object}
     */
    parameters: Object;
    copy(source: any): this;
    toJSON(): any;
}
import { BufferGeometry } from '../core/BufferGeometry.js';
import { Shape } from '../extras/core/Shape.js';
