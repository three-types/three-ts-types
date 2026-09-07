/**
 * A loader for the SVG format.
 *
 * Scalable Vector Graphics is an XML-based vector image format for two-dimensional graphics
 * with support for interactivity and animation.
 *
 * ```js
 * const loader = new SVGLoader();
 * const data = await loader.loadAsync( 'data/svgSample.svg' );
 *
 * const paths = data.paths;
 * const group = new THREE.Group();
 *
 * for ( let i = 0; i < paths.length; i ++ ) {
 *
 * 	const path = paths[ i ];
 * 	const material = new THREE.MeshBasicMaterial( {
 * 		color: path.color,
 * 		side: THREE.DoubleSide,
 * 		depthWrite: false
 * 	} );
 *
 * 	const shapes = SVGLoader.createShapes( path );
 *
 * 	for ( let j = 0; j < shapes.length; j ++ ) {
 *
 * 		const shape = shapes[ j ];
 * 		const geometry = new THREE.ShapeGeometry( shape );
 * 		const mesh = new THREE.Mesh( geometry, material );
 * 		group.add( mesh );
 *
 * 	}
 *
 * }
 *
 * scene.add( group );
 * ```
 *
 * @augments Loader
 * @three_import import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
 */
export class SVGLoader extends Loader {
    /**
     * Creates a material for rendering the fill of the given path.
     *
     * @param {ShapePath} shapePath - The shape path.
     * @return {?MeshBasicMaterial} The fill material. `null` if the path has no fill.
     */
    static createFillMaterial(shapePath: ShapePath): MeshBasicMaterial | null;
    /**
     * Creates a material for rendering the stroke of the given path.
     *
     * @param {ShapePath} shapePath - The shape path.
     * @return {?MeshBasicMaterial} The stroke material. `null` if the path has no stroke.
     */
    static createStrokeMaterial(shapePath: ShapePath): MeshBasicMaterial | null;
    /**
     * Creates from the given shape path and array of shapes.
     *
     * @deprecated since 185.
     * @param {ShapePath} shapePath - The shape path.
     * @return {Array<Shape>} An array of shapes.
     */
    static createShapes(shapePath: ShapePath): Array<Shape>;
    /**
     * Returns a stroke style object from the given parameters.
     *
     * @param {number} [width=1] - The stroke width.
     * @param {string} [color='#000'] - The stroke color, as  returned by {@link Color#getStyle}.
     * @param {'round'|'bevel'|'miter'|'miter-limit'} [lineJoin='miter'] - The line join style.
     * @param {'round'|'square'|'butt'} [lineCap='butt'] - The line cap style.
     * @param {number} [miterLimit=4] - Maximum join length, in multiples of the `width` parameter (join is truncated if it exceeds that distance).
     * @return {Object} The style object.
     */
    static getStrokeStyle(width?: number, color?: string, lineJoin?: "round" | "bevel" | "miter" | "miter-limit", lineCap?: "round" | "square" | "butt", miterLimit?: number): Object;
    /**
     * Creates a stroke from an array of points.
     *
     * @param {Array<Vector2>} points - The points in 2D space. Minimum 2 points. The path can be open or closed (last point equals to first point).
     * @param {Object} style - Object with SVG properties as returned by `SVGLoader.getStrokeStyle()`, or `SVGLoader.parse()` in the `path.userData.style` object.
     * @param {number} [arcDivisions=12] - Arc divisions for round joins and endcaps.
     * @param {number} [minDistance=0.001] - Points closer to this distance will be merged.
     * @return {?BufferGeometry} The stroke geometry. UV coordinates are generated ('u' along path. 'v' across it, from left to right).
     * Returns `null` if not geometry was generated.
     */
    static pointsToStroke(points: Array<Vector2>, style: Object, arcDivisions?: number, minDistance?: number): BufferGeometry | null;
    /**
     * Creates a stroke from an array of points.
     *
     * @param {Array<Vector2>} points - The points in 2D space. Minimum 2 points.
     * @param {Object} style - Object with SVG properties as returned by `SVGLoader.getStrokeStyle()`, or `SVGLoader.parse()` in the `path.userData.style` object.
     * @param {number} [arcDivisions=12] - Arc divisions for round joins and endcaps.
     * @param {number} [minDistance=0.001] - Points closer to this distance will be merged.
     * @param {Array<number>} vertices - An array holding vertices.
     * @param {Array<number>} normals - An array holding normals.
     * @param {Array<number>} uvs - An array holding uvs.
     * @param {number} [vertexOffset=0] - The vertex offset.
     * @return {number} The number of vertices.
     */
    static pointsToStrokeWithBuffers(points: Array<Vector2>, style: Object, arcDivisions?: number, minDistance?: number, vertices: Array<number>, normals: Array<number>, uvs: Array<number>, vertexOffset?: number): number;
    /**
     * Constructs a new SVG loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Default dots per inch.
     *
     * @type {number}
     * @default 90
     */
    defaultDPI: number;
    /**
     * Default unit.
     *
     * @type {('mm'|'cm'|'in'|'pt'|'pc'|'px')}
     * @default 'px'
     */
    defaultUnit: ("mm" | "cm" | "in" | "pt" | "pc" | "px");
    /**
     * Starts loading from the given URL and passes the loaded SVG asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function({paths:Array<ShapePath>,xml:string})} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: {
        paths: Array<ShapePath>;
        xml: string;
    }) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given SVG data and returns the resulting data.
     *
     * @param {string} text - The raw SVG data as a string.
     * @return {{paths:Array<ShapePath>,xml:string}} An object holding an array of shape paths and the
     * SVG XML document.
     */
    parse(text: string): {
        paths: Array<ShapePath>;
        xml: string;
    };
}
import { Loader } from 'three';
import { ShapePath } from 'three';
import { MeshBasicMaterial } from 'three';
import { Vector2 } from 'three';
import { BufferGeometry } from 'three';
