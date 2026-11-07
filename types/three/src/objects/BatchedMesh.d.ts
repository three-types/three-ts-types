import { Camera } from "../cameras/Camera.js";
import { BufferGeometry } from "../core/BufferGeometry.js";
import { Intersection, Raycaster } from "../core/Raycaster.js";
import { Material } from "../materials/Material.js";
import { Box3 } from "../math/Box3.js";
import { Color } from "../math/Color.js";
import { Matrix4 } from "../math/Matrix4.js";
import { Sphere } from "../math/Sphere.js";
import { Vector4 } from "../math/Vector4.js";
import { Mesh } from "./Mesh.js";

export interface BatchedMeshGeometryRange {
    vertexStart: number;
    vertexCount: number;
    reservedVertexCount: number;
    indexStart: number;
    indexCount: number;
    reservedIndexCount: number;
    start: number;
    count: number;
}

/**
 * A special version of a mesh with multi draw batch rendering support. Use
 * this class if you have to render a large number of objects with the same
 * material but with different geometries or world transformations. The usage of
 * `BatchedMesh` will help you to reduce the number of draw calls and thus improve the overall
 * rendering performance in your application.
 *
 * ```js
 * const box = new THREE.BoxGeometry( 1, 1, 1 );
 * const sphere = new THREE.SphereGeometry( 1, 12, 12 );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 *
 * // initialize and add geometries into the batched mesh
 * const batchedMesh = new BatchedMesh( 10, 5000, 10000, material );
 * const boxGeometryId = batchedMesh.addGeometry( box );
 * const sphereGeometryId = batchedMesh.addGeometry( sphere );
 *
 * // create instances of those geometries
 * const boxInstancedId1 = batchedMesh.addInstance( boxGeometryId );
 * const boxInstancedId2 = batchedMesh.addInstance( boxGeometryId );
 *
 * const sphereInstancedId1 = batchedMesh.addInstance( sphereGeometryId );
 * const sphereInstancedId2 = batchedMesh.addInstance( sphereGeometryId );
 *
 * // position the geometries
 * batchedMesh.setMatrixAt( boxInstancedId1, boxMatrix1 );
 * batchedMesh.setMatrixAt( boxInstancedId2, boxMatrix2 );
 *
 * batchedMesh.setMatrixAt( sphereInstancedId1, sphereMatrix1 );
 * batchedMesh.setMatrixAt( sphereInstancedId2, sphereMatrix2 );
 *
 * scene.add( batchedMesh );
 * ```
 *
 * The first geometry added defines the layout of the batch. All subsequent geometries must
 * match its index usage and provide its attributes with the same itemSize and normalized
 * values. Additional attributes are ignored.
 *
 * @augments Mesh
 */
export class BatchedMesh extends Mesh<BufferGeometry, Material> {
    /**
     * Constructs a new batched mesh.
     *
     * @param {number} maxInstanceCount - The maximum number of individual instances planned to be added and rendered.
     * @param {number} maxVertexCount - The maximum number of vertices to be used by all unique geometries.
     * @param {number} [maxIndexCount=maxVertexCount*2] - The maximum number of indices to be used by all unique geometries
     * @param {Material|Array<Material>} [material] - The mesh material.
     */
    constructor(maxInstanceCount: number, maxVertexCount: number, maxIndexCount?: number, material?: Material);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBatchedMesh: true;
    /**
     * When set ot `true`, the individual objects of a batch are frustum culled.
     *
     * @type {boolean}
     * @default true
     */
    perObjectFrustumCulled: boolean;
    /**
     * When set to `true`, the individual objects of a batch are sorted to improve overdraw-related artifacts.
     * If the material is marked as "transparent" objects are rendered back to front and if not then they are
     * rendered front to back.
     *
     * @type {boolean}
     * @default true
     */
    sortObjects: boolean;
    /**
     * The bounding box of the batched mesh. Can be computed via {@link BatchedMesh#computeBoundingBox}.
     *
     * @type {?Box3}
     * @default null
     */
    boundingBox: Box3 | null;
    /**
     * The bounding sphere of the batched mesh. Can be computed via {@link BatchedMesh#computeBoundingSphere}.
     *
     * @type {?Sphere}
     * @default null
     */
    boundingSphere: Sphere | null;
    /**
     * Takes a sort a function that is run before render. The function takes a list of instances to
     * sort and a camera. The objects in the list include a "z" field to perform a depth-ordered
     * sort with.
     *
     * @type {?Function}
     * @default null
     */
    customSort: ((this: this, list: Array<{ start: number; count: number; z: number }>, camera: Camera) => void) | null;
    /**
     * The maximum number of individual instances that can be stored in the batch.
     *
     * @type {number}
     * @readonly
     */
    get maxInstanceCount(): number;
    /**
     * The instance count.
     *
     * @type {number}
     * @readonly
     */
    get instanceCount(): number;
    /**
     * The number of unused vertices.
     *
     * @type {number}
     * @readonly
     */
    get unusedVertexCount(): number;
    /**
     * The number of unused indices.
     *
     * @type {number}
     * @readonly
     */
    get unusedIndexCount(): number;
    /**
     * Validates the instance defined by the given ID.
     *
     * @param {number} instanceId - The instance to validate.
     */
    validateInstanceId(instanceId: number): void;
    /**
     * Validates the geometry defined by the given ID.
     *
     * @param {number} geometryId - The geometry to validate.
     */
    validateGeometryId(geometryId: number): void;
    /**
     * Takes a sort a function that is run before render. The function takes a list of instances to
     * sort and a camera. The objects in the list include a "z" field to perform a depth-ordered sort with.
     *
     * @param {Function} func - The custom sort function.
     * @return {BatchedMesh} A reference to this batched mesh.
     */
    setCustomSort(
        func: ((this: this, list: Array<{ start: number; count: number; z: number }>, camera: Camera) => void) | null,
    ): this;
    /**
     * Computes the bounding box, updating {@link BatchedMesh#boundingBox}.
     * Bounding boxes aren't computed by default. They need to be explicitly computed,
     * otherwise they are `null`. Must be recomputed when instances change.
     */
    computeBoundingBox(): void;
    /**
     * Computes the bounding sphere, updating {@link BatchedMesh#boundingSphere}.
     * The engine computes the bounding sphere once when it is needed. Must be
     * recomputed when instances change.
     */
    computeBoundingSphere(): void;
    /**
     * Adds a new instance to the batch using the geometry of the given ID and returns
     * a new id referring to the new instance to be used by other functions.
     *
     * @param {number} geometryId - The ID of a previously added geometry via {@link BatchedMesh#addGeometry}.
     * @return {number} The instance ID.
     */
    addInstance(geometryId: number): number;
    /**
     * Adds the given geometry to the batch and returns the associated
     * geometry id referring to it to be used in other functions.
     *
     * @param {BufferGeometry} geometry - The geometry to add.
     * @param {number} [reservedVertexCount=-1] - Optional parameter specifying the amount of
     * vertex buffer space to reserve for the added geometry. This is necessary if it is planned
     * to set a new geometry at this index at a later time that is larger than the original geometry.
     * Defaults to the length of the given geometry vertex buffer.
     * @param {number} [reservedIndexCount=-1] - Optional parameter specifying the amount of index
     * buffer space to reserve for the added geometry. This is necessary if it is planned to set a
     * new geometry at this index at a later time that is larger than the original geometry. Defaults to
     * the length of the given geometry index buffer.
     * @return {number} The geometry ID.
     */
    addGeometry(geometry: BufferGeometry, reservedVertexCount?: number, reservedIndexCount?: number): number;
    /**
     * Replaces the geometry at the given ID with the provided geometry. Throws an error if there
     * is not enough space reserved for geometry. Calling this will change all instances that are
     * rendering that geometry.
     *
     * @param {number} geometryId - The ID of the geometry that should be replaced with the given geometry.
     * @param {BufferGeometry} geometry - The new geometry.
     * @return {number} The geometry ID.
     */
    setGeometryAt(geometryId: number, geometry: BufferGeometry): number;
    /**
     * Deletes the geometry defined by the given ID from this batch. Any instances referencing
     * this geometry will also be removed as a side effect.
     *
     * @param {number} geometryId - The ID of the geometry to remove from the batch.
     * @return {BatchedMesh} A reference to this batched mesh.
     */
    deleteGeometry(geometryId: number): this;
    /**
     * Deletes an existing instance from the batch using the given ID.
     *
     * @param {number} instanceId - The ID of the instance to remove from the batch.
     * @return {BatchedMesh} A reference to this batched mesh.
     */
    deleteInstance(instanceId: number): this;
    /**
     * Repacks the sub geometries in BatchedMesh to remove any unused space remaining from
     * previously deleted geometry, freeing up space to add new geometry.
     *
     * @return {BatchedMesh} A reference to this batched mesh.
     */
    optimize(): this;
    /**
     * Returns the bounding box for the given geometry.
     *
     * @param {number} geometryId - The ID of the geometry to return the bounding box for.
     * @param {Box3} target - The target object that is used to store the method's result.
     * @return {?Box3} The geometry's bounding box. Returns `null` if no geometry has been found for the given ID.
     */
    getBoundingBoxAt(geometryId: number, target: Box3): Box3 | null;
    /**
     * Returns the bounding sphere for the given geometry.
     *
     * @param {number} geometryId - The ID of the geometry to return the bounding sphere for.
     * @param {Sphere} target - The target object that is used to store the method's result.
     * @return {?Sphere} The geometry's bounding sphere. Returns `null` if no geometry has been found for the given ID.
     */
    getBoundingSphereAt(geometryId: number, target: Sphere): Sphere | null;
    /**
     * Sets the given local transformation matrix to the defined instance.
     * Negatively scaled matrices are not supported.
     *
     * @param {number} instanceId - The ID of an instance to set the matrix of.
     * @param {Matrix4} matrix - A 4x4 matrix representing the local transformation of a single instance.
     * @return {BatchedMesh} A reference to this batched mesh.
     */
    setMatrixAt(instanceId: number, matrix: Matrix4): this;
    /**
     * Returns the local transformation matrix of the defined instance.
     *
     * @param {number} instanceId - The ID of an instance to get the matrix of.
     * @param {Matrix4} matrix - The target object that is used to store the method's result.
     * @return {Matrix4} The instance's local transformation matrix.
     */
    getMatrixAt(instanceId: number, matrix: Matrix4): Matrix4;
    /**
     * Sets the given color to the defined instance.
     *
     * @param {number} instanceId - The ID of an instance to set the color of.
     * @param {Color|Vector4} color - The color to set the instance to. Use a `Vector4` to also define alpha.
     * @return {BatchedMesh} A reference to this batched mesh.
     */
    setColorAt(instanceId: number, color: Color | Vector4): this;
    /**
     * Returns the color of the defined instance.
     *
     * @param {number} instanceId - The ID of an instance to get the color of.
     * @param {Color|Vector4} color - The target object that is used to store the method's result.
     * @return {Color|Vector4} The instance's color.  Use a `Vector4` to also retrieve alpha.
     */
    getColorAt(instanceId: number, color: Color): Color;
    getColorAt(instanceId: number, color: Vector4): Vector4;
    getColorAt(instanceId: number, color: Color | Vector4): Color | Vector4;
    /**
     * Sets the visibility of the instance.
     *
     * @param {number} instanceId - The id of the instance to set the visibility of.
     * @param {boolean} visible - Whether the instance is visible or not.
     * @return {BatchedMesh} A reference to this batched mesh.
     */
    setVisibleAt(instanceId: number, visible: boolean): this;
    /**
     * Returns the visibility state of the defined instance.
     *
     * @param {number} instanceId - The ID of an instance to get the visibility state of.
     * @return {boolean} Whether the instance is visible or not.
     */
    getVisibleAt(instanceId: number): boolean;
    /**
     * Sets the geometry ID of the instance at the given index.
     *
     * @param {number} instanceId - The ID of the instance to set the geometry ID of.
     * @param {number} geometryId - The geometry ID to be use by the instance.
     * @return {BatchedMesh} A reference to this batched mesh.
     */
    setGeometryIdAt(instanceId: number, geometryId: number): this;
    /**
     * Returns the geometry ID of the defined instance.
     *
     * @param {number} instanceId - The ID of an instance to get the geometry ID of.
     * @return {number} The instance's geometry ID.
     */
    getGeometryIdAt(instanceId: number): number;
    /**
     * Get the range representing the subset of triangles related to the attached geometry,
     * indicating the starting offset and count, or throws an error if invalid.
     *
     * @param {number} geometryId - The id of the geometry to get the range of.
     * @param {Object} [target] - The target object that is used to store the method's result.
     * @return {{
     * 	vertexStart:number,vertexCount:number,reservedVertexCount:number,
     * 	indexStart:number,indexCount:number,reservedIndexCount:number,
     * 	start:number,count:number
     * }} The result object with range data.
     */
    getGeometryRangeAt(geometryId: number, target?: BatchedMeshGeometryRange): BatchedMeshGeometryRange;
    /**
     * Resizes the necessary buffers to support the provided number of instances.
     * If the provided arguments shrink the number of instances but there are not enough
     * unused Ids at the end of the list then an error is thrown.
     *
     * @param {number} maxInstanceCount - The max number of individual instances that can be added and rendered by the batch.
     */
    setInstanceCount(maxInstanceCount: number): void;
    /**
     * Resizes the available space in the batch's vertex and index buffer attributes to the provided sizes.
     * If the provided arguments shrink the geometry buffers but there is not enough unused space at the
     * end of the geometry attributes then an error is thrown.
     *
     * @param {number} maxVertexCount - The maximum number of vertices to be used by all unique geometries to resize to.
     * @param {number} maxIndexCount - The maximum number of indices to be used by all unique geometries to resize to.
     */
    setGeometrySize(maxVertexCount: number, maxIndexCount: number): void;
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
    copy(source: BatchedMesh, recursive?: boolean): this;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
