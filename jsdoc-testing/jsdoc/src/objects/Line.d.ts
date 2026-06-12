/**
 * A continuous line. The line are rendered by connecting consecutive
 * vertices with straight lines.
 *
 * ```js
 * const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
 *
 * const points = [];
 * points.push( new THREE.Vector3( - 10, 0, 0 ) );
 * points.push( new THREE.Vector3( 0, 10, 0 ) );
 * points.push( new THREE.Vector3( 10, 0, 0 ) );
 *
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 *
 * const line = new THREE.Line( geometry, material );
 * scene.add( line );
 * ```
 *
 * @augments Object3D
 */
export class Line extends Object3D {
    /**
     * Constructs a new line.
     *
     * @param {BufferGeometry} [geometry] - The line geometry.
     * @param {Material|Array<Material>} [material] - The line material.
     */
    constructor(geometry?: BufferGeometry, material?: Material | Array<Material>);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLine: boolean;
    type: string;
    /**
     * The line geometry.
     *
     * @type {BufferGeometry}
     */
    geometry: BufferGeometry;
    /**
     * The line material.
     *
     * @type {Material|Array<Material>}
     * @default LineBasicMaterial
     */
    material: Material | Array<Material>;
    /**
     * A dictionary representing the morph targets in the geometry. The key is the
     * morph targets name, the value its attribute index. This member is `undefined`
     * by default and only set when morph targets are detected in the geometry.
     *
     * @type {Object<string,number>|undefined}
     * @default undefined
     */
    morphTargetDictionary: {
        [x: string]: number;
    } | undefined;
    /**
     * An array of weights typically in the range `[0,1]` that specify how much of the morph
     * is applied. This member is `undefined` by default and only set when morph targets are
     * detected in the geometry.
     *
     * @type {Array<number>|undefined}
     * @default undefined
     */
    morphTargetInfluences: Array<number> | undefined;
    copy(source: any, recursive: any): this;
    /**
     * Computes an array of distance values which are necessary for rendering dashed lines.
     * For each vertex in the geometry, the method calculates the cumulative length from the
     * current point to the very beginning of the line.
     *
     * @return {Line} A reference to this line.
     */
    computeLineDistances(): Line;
    /**
     * Computes intersection points between a casted ray and this line.
     *
     * @param {Raycaster} raycaster - The raycaster.
     * @param {Array<Object>} intersects - The target array that holds the intersection points.
     */
    raycast(raycaster: Raycaster, intersects: Array<Object>): void;
    /**
     * Sets the values of {@link Line#morphTargetDictionary} and {@link Line#morphTargetInfluences}
     * to make sure existing morph targets can influence this 3D object.
     */
    updateMorphTargets(): void;
}
import { Object3D } from '../core/Object3D.js';
import { BufferGeometry } from '../core/BufferGeometry.js';
