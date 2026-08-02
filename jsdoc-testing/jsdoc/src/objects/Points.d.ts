/**
 * A class for displaying points or point clouds.
 *
 * @augments Object3D
 */
export class Points extends Object3D {
    /**
     * Constructs a new point cloud.
     *
     * @param {BufferGeometry} [geometry] - The points geometry.
     * @param {Material|Array<Material>} [material] - The points material.
     */
    constructor(geometry?: BufferGeometry, material?: Material | Array<Material>);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPoints: boolean;
    type: string;
    /**
     * The points geometry.
     *
     * @type {BufferGeometry}
     */
    geometry: BufferGeometry;
    /**
     * The line material.
     *
     * @type {Material|Array<Material>}
     * @default PointsMaterial
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
     * Computes intersection points between a casted ray and this point cloud.
     *
     * @param {Raycaster} raycaster - The raycaster.
     * @param {Array<Object>} intersects - The target array that holds the intersection points.
     */
    raycast(raycaster: Raycaster, intersects: Array<Object>): void;
    /**
     * Sets the values of {@link Points#morphTargetDictionary} and {@link Points#morphTargetInfluences}
     * to make sure existing morph targets can influence this 3D object.
     */
    updateMorphTargets(): void;
}
import { Object3D } from '../core/Object3D.js';
import { BufferGeometry } from '../core/BufferGeometry.js';
