/**
 * Class representing triangular polygon mesh based objects.
 *
 * ```js
 * const geometry = new THREE.BoxGeometry( 1, 1, 1 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 * ```
 *
 * @augments Object3D
 */
export class Mesh extends Object3D {
    /**
     * Constructs a new mesh.
     *
     * @param {BufferGeometry} [geometry] - The mesh geometry.
     * @param {Material|Array<Material>} [material] - The mesh material.
     */
    constructor(geometry?: BufferGeometry, material?: Material | Array<Material>);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMesh: boolean;
    type: string;
    /**
     * The mesh geometry.
     *
     * @type {BufferGeometry}
     */
    geometry: BufferGeometry;
    /**
     * The mesh material.
     *
     * @type {Material|Array<Material>}
     * @default MeshBasicMaterial
     */
    material: Material | Array<Material>;
    /**
     * A dictionary representing the morph targets in the geometry. The key is the
     * morph targets name, the value its attribute index. This member is `undefined`
     * by default and only set when morph targets are detected in the geometry.
     *
     * @type {Object<String,number>|undefined}
     * @default undefined
     */
    morphTargetDictionary: any | undefined;
    /**
     * An array of weights typically in the range `[0,1]` that specify how much of the morph
     * is applied. This member is `undefined` by default and only set when morph targets are
     * detected in the geometry.
     *
     * @type {Array<number>|undefined}
     * @default undefined
     */
    morphTargetInfluences: Array<number> | undefined;
    /**
     * The number of instances of this mesh.
     * Can only be used with {@link WebGPURenderer}.
     *
     * @type {number}
     * @default 1
     */
    count: number;
    copy(source: any, recursive: any): this;
    /**
     * Sets the values of {@link Mesh#morphTargetDictionary} and {@link Mesh#morphTargetInfluences}
     * to make sure existing morph targets can influence this 3D object.
     */
    updateMorphTargets(): void;
    /**
     * Returns the local-space position of the vertex at the given index, taking into
     * account the current animation state of both morph targets and skinning.
     *
     * @param {number} index - The vertex index.
     * @param {Vector3} target - The target object that is used to store the method's result.
     * @return {Vector3} The vertex position in local space.
     */
    getVertexPosition(index: number, target: Vector3): Vector3;
    /**
     * Computes intersection points between a casted ray and this line.
     *
     * @param {Raycaster} raycaster - The raycaster.
     * @param {Array<Object>} intersects - The target array that holds the intersection points.
     */
    raycast(raycaster: Raycaster, intersects: Array<Object>): void;
    _computeIntersections(raycaster: any, intersects: any, rayLocalSpace: any): void;
}
import { Object3D } from '../core/Object3D.js';
import { BufferGeometry } from '../core/BufferGeometry.js';
import { Vector3 } from '../math/Vector3.js';
