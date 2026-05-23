/**
 * A special version of a mesh with instanced rendering support. Use
 * this class if you have to render a large number of objects with the same
 * geometry and material(s) but with different world transformations. The usage
 * of 'InstancedMesh' will help you to reduce the number of draw calls and thus
 * improve the overall rendering performance in your application.
 *
 * @augments Mesh
 */
export class InstancedMesh extends Mesh {
    /**
     * Constructs a new instanced mesh.
     *
     * @param {BufferGeometry} [geometry] - The mesh geometry.
     * @param {Material|Array<Material>} [material] - The mesh material.
     * @param {number} count - The number of instances.
     */
    constructor(geometry?: BufferGeometry, material?: Material | Array<Material>, count: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isInstancedMesh: boolean;
    /**
     * Represents the local transformation of all instances. You have to set its
     * {@link BufferAttribute#needsUpdate} flag to true if you modify instanced data
     * via {@link InstancedMesh#setMatrixAt}.
     *
     * @type {InstancedBufferAttribute}
     */
    instanceMatrix: InstancedBufferAttribute;
    /**
     * Represents the local transformation of all instances of the previous frame.
     * Required for computing velocity. Maintained in {@link InstanceNode}.
     *
     * @type {?InstancedBufferAttribute}
     * @default null
     */
    previousInstanceMatrix: InstancedBufferAttribute | null;
    /**
     * Represents the color of all instances. You have to set its
     * {@link BufferAttribute#needsUpdate} flag to true if you modify instanced data
     * via {@link InstancedMesh#setColorAt}.
     *
     * @type {?InstancedBufferAttribute}
     * @default null
     */
    instanceColor: InstancedBufferAttribute | null;
    /**
     * Represents the morph target weights of all instances. You have to set its
     * {@link Texture#needsUpdate} flag to true if you modify instanced data
     * via {@link InstancedMesh#setMorphAt}.
     *
     * @type {?DataTexture}
     * @default null
     */
    morphTexture: DataTexture | null;
    /**
     * The bounding box of the instanced mesh. Can be computed via {@link InstancedMesh#computeBoundingBox}.
     *
     * @type {?Box3}
     * @default null
     */
    boundingBox: Box3 | null;
    /**
     * The bounding sphere of the instanced mesh. Can be computed via {@link InstancedMesh#computeBoundingSphere}.
     *
     * @type {?Sphere}
     * @default null
     */
    boundingSphere: Sphere | null;
    /**
     * Computes the bounding box of the instanced mesh, and updates {@link InstancedMesh#boundingBox}.
     * The bounding box is not automatically computed by the engine; this method must be called by your app.
     * You may need to recompute the bounding box if an instance is transformed via {@link InstancedMesh#setMatrixAt}.
     */
    computeBoundingBox(): void;
    /**
     * Computes the bounding sphere of the instanced mesh, and updates {@link InstancedMesh#boundingSphere}
     * The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling.
     * You may need to recompute the bounding sphere if an instance is transformed via {@link InstancedMesh#setMatrixAt}.
     */
    computeBoundingSphere(): void;
    copy(source: any, recursive: any): this;
    /**
     * Gets the color of the defined instance.
     *
     * @param {number} index - The instance index.
     * @param {Color} color - The target object that is used to store the method's result.
     * @return {Color} A reference to the target color.
     */
    getColorAt(index: number, color: Color): Color;
    /**
     * Gets the local transformation matrix of the defined instance.
     *
     * @param {number} index - The instance index.
     * @param {Matrix4} matrix - The target object that is used to store the method's result.
     * @return {Matrix4} A reference to the target matrix.
     */
    getMatrixAt(index: number, matrix: Matrix4): Matrix4;
    /**
     * Gets the morph target weights of the defined instance.
     *
     * @param {number} index - The instance index.
     * @param {Mesh} object - The target object that is used to store the method's result.
     */
    getMorphAt(index: number, object: Mesh): void;
    raycast(raycaster: any, intersects: any): void;
    /**
     * Sets the given color to the defined instance. Make sure you set the `needsUpdate` flag of
     * {@link InstancedMesh#instanceColor} to `true` after updating all the colors.
     *
     * @param {number} index - The instance index.
     * @param {Color} color - The instance color.
     * @return {InstancedMesh} A reference to this instanced mesh.
     */
    setColorAt(index: number, color: Color): InstancedMesh;
    /**
     * Sets the given local transformation matrix to the defined instance. Make sure you set the `needsUpdate` flag of
     * {@link InstancedMesh#instanceMatrix} to `true` after updating all the matrices.
     *
     * @param {number} index - The instance index.
     * @param {Matrix4} matrix - The local transformation.
     * @return {InstancedMesh} A reference to this instanced mesh.
     */
    setMatrixAt(index: number, matrix: Matrix4): InstancedMesh;
    /**
     * Sets the morph target weights to the defined instance. Make sure you set the `needsUpdate` flag of
     * {@link InstancedMesh#morphTexture} to `true` after updating all the influences.
     *
     * @param {number} index - The instance index.
     * @param {Mesh} object -  A mesh which `morphTargetInfluences` property containing the morph target weights
     * of a single instance.
     * @return {InstancedMesh} A reference to this instanced mesh.
     */
    setMorphAt(index: number, object: Mesh): InstancedMesh;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { Mesh } from './Mesh.js';
import { InstancedBufferAttribute } from '../core/InstancedBufferAttribute.js';
import { DataTexture } from '../textures/DataTexture.js';
import { Box3 } from '../math/Box3.js';
import { Sphere } from '../math/Sphere.js';
import { Matrix4 } from '../math/Matrix4.js';
