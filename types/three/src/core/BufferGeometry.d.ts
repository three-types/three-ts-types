import { Box3 } from "../math/Box3.js";
import { Matrix4 } from "../math/Matrix4.js";
import { Quaternion } from "../math/Quaternion.js";
import { Sphere } from "../math/Sphere.js";
import { Vector2 } from "../math/Vector2.js";
import { Vector3, Vector3Tuple } from "../math/Vector3.js";
import IndirectStorageBufferAttribute from "../renderers/common/IndirectStorageBufferAttribute.js";
import { BufferAttribute, BufferAttributeJSON } from "./BufferAttribute.js";
import { EventDispatcher } from "./EventDispatcher.js";
import { GLBufferAttribute } from "./GLBufferAttribute.js";
import { InterleavedBufferAttribute } from "./InterleavedBufferAttribute.js";

export type NormalBufferAttributes = Record<string, BufferAttribute | InterleavedBufferAttribute>;
export type NormalOrGLBufferAttributes = Record<
    string,
    BufferAttribute | InterleavedBufferAttribute | GLBufferAttribute
>;

export interface BufferGeometryJSON {
    metadata?: { version: number; type: string; generator: string };

    uuid: string;
    type: string;

    name?: string;
    userData?: Record<string, unknown>;

    data?: {
        attributes: Record<string, BufferAttributeJSON>;

        index?: { type: string; array: number[] };

        morphAttributes?: Record<string, BufferAttributeJSON[]>;
        morphTargetsRelative?: boolean;

        groups?: GeometryGroup[];

        boundingSphere?: { center: Vector3Tuple; radius: number };
    };
}

export interface GeometryGroup {
    /**
     * Specifies the first element in this draw call – the first vertex for non-indexed geometry, otherwise the first triangle index.
     * @remarks Expects a `Integer`
     */
    start: number;
    /**
     * Specifies how many vertices (or indices) are included.
     * @remarks Expects a `Integer`
     */
    count: number;
    /**
     * Specifies the material array index to use.
     * @remarks Expects a `Integer`
     */
    materialIndex?: number | undefined;
}

export interface BufferGeometryEventMap {
    dispose: {};
}

/**
 * A representation of mesh, line, or point geometry. Includes vertex
 * positions, face indices, normals, colors, UVs, and custom attributes
 * within buffers, reducing the cost of passing all this data to the GPU.
 *
 * ```js
 * const geometry = new THREE.BufferGeometry();
 * // create a simple square shape. We duplicate the top left and bottom right
 * // vertices because each vertex needs to appear once per triangle.
 * const vertices = new Float32Array( [
 * 	-1.0, -1.0,  1.0, // v0
 * 	 1.0, -1.0,  1.0, // v1
 * 	 1.0,  1.0,  1.0, // v2
 *
 * 	 1.0,  1.0,  1.0, // v3
 * 	-1.0,  1.0,  1.0, // v4
 * 	-1.0, -1.0,  1.0  // v5
 * ] );
 * // itemSize = 3 because there are 3 values (components) per vertex
 * geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
 * const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
 * const mesh = new THREE.Mesh( geometry, material );
 * ```
 */
export class BufferGeometry<
    Attributes extends NormalOrGLBufferAttributes = NormalBufferAttributes,
    TEventMap extends BufferGeometryEventMap = BufferGeometryEventMap,
> extends EventDispatcher<TEventMap> {
    /**
     * This creates a new {@link THREE.BufferGeometry | BufferGeometry} object.
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isBufferGeometry: true;
    /**
     * Unique number for this {@link THREE.BufferGeometry | BufferGeometry} instance.
     * @remarks Expects a `Integer`
     */
    id: number;
    /**
     * The UUID of the geometry.
     */
    uuid: string;
    /**
     * The name of the geometry.
     */
    name: string;
    /**
     * A Read-only _string_ to check if `this` object type.
     * @remarks Sub-classes will update this value.
     * @defaultValue `BufferGeometry`
     */
    readonly type: string | "BufferGeometry";
    /**
     * Allows for vertices to be re-used across multiple triangles; this is
     * called using "indexed triangles". Each triangle is associated with the
     * indices of three vertices. This attribute therefore stores the index of
     * each vertex for each triangular face. If this attribute is not set, the
     * renderer assumes that each three contiguous positions represent a single triangle.
     *
     * @default null
     */
    index: BufferAttribute | null;
    /**
     * A (storage) buffer attribute which was generated with a compute shader and
     * now defines indirect draw calls.
     *
     * Can only be used with {@link WebGPURenderer} and a WebGPU backend.
     *
     * @default null
     */
    indirect: IndirectStorageBufferAttribute | null;
    /**
     * The offset, in bytes, into the indirect drawing buffer where the value data begins. If an array is provided, multiple indirect draw calls will be made for each offset.
     *
     * Can only be used with {@link WebGPURenderer} and a WebGPU backend.
     *
     * @default 0
     */
    indirectOffset: number | number[];
    /**
     * This dictionary has as id the name of the attribute to be set and as value
     * the buffer attribute to set it to. Rather than accessing this property directly,
     * use `setAttribute()` and `getAttribute()` to access attributes of this geometry.
     */
    attributes: Attributes;
    /**
     * This dictionary holds the morph targets of the geometry.
     *
     * Note: Once the geometry has been rendered, the morph attribute data cannot
     * be changed. You will have to call `dispose()`, and create a new geometry instance.
     */
    morphAttributes: {
        position?: Array<BufferAttribute | InterleavedBufferAttribute> | undefined;
        normal?: Array<BufferAttribute | InterleavedBufferAttribute> | undefined;
        color?: Array<BufferAttribute | InterleavedBufferAttribute> | undefined;
    };
    /**
     * Used to control the morph target behavior; when set to `true`, the morph
     * target data is treated as relative offsets, rather than as absolute
     * positions/normals.
     *
     * @default false
     */
    morphTargetsRelative: boolean;
    /**
     * Split the geometry into groups, each of which will be rendered in a
     * separate draw call. This allows an array of materials to be used with the geometry.
     *
     * Use `addGroup()` and `clearGroups()` to edit groups, rather than modifying this array directly.
     *
     * Every vertex and index must belong to exactly one group — groups must not share vertices or
     * indices, and must not leave vertices or indices unused.
     */
    groups: GeometryGroup[];
    /**
     * Bounding box for the geometry which can be calculated with `computeBoundingBox()`.
     *
     * @default null
     */
    boundingBox: Box3 | null;
    /**
     * Bounding sphere for the geometry which can be calculated with `computeBoundingSphere()`.
     *
     * @default null
     */
    boundingSphere: Sphere | null;
    /**
     * Determines the part of the geometry to render. This should not be set directly,
     * instead use `setDrawRange()`.
     */
    drawRange: {
        start: number;
        count: number;
    };
    /**
     * An object that can be used to store custom data about the geometry.
     * It should not hold references to functions as these will not be cloned.
     */
    userData: Record<string, any>;
    /**
     * Returns the index of this geometry.
     *
     * @return {?BufferAttribute} The index. Returns `null` if no index is defined.
     */
    getIndex(): BufferAttribute | null;
    /**
     * Sets the given index to this geometry.
     *
     * @param {Array<number>|BufferAttribute} index - The index to set.
     * @return {BufferGeometry} A reference to this instance.
     */
    setIndex(index: BufferAttribute | number[] | null): this;
    /**
     * Sets the given indirect attribute to this geometry.
     *
     * @param {BufferAttribute} indirect - The attribute holding indirect draw calls.
     * @param {number|Array<number>} [indirectOffset=0] - The offset, in bytes, into the indirect drawing buffer where the value data begins. If an array is provided, multiple indirect draw calls will be made for each offset.
     * @return {BufferGeometry} A reference to this instance.
     */
    setIndirect(indirect: IndirectStorageBufferAttribute | null, indirectOffset?: number | number[]): this;
    /**
     * Returns the indirect attribute of this geometry.
     *
     * @return {?BufferAttribute} The indirect attribute. Returns `null` if no indirect attribute is defined.
     */
    getIndirect(): IndirectStorageBufferAttribute | null;
    /**
     * Returns the buffer attribute for the given name.
     *
     * @param {string} name - The attribute name.
     * @return {BufferAttribute|InterleavedBufferAttribute|undefined} The buffer attribute.
     * Returns `undefined` if not attribute has been found.
     */
    getAttribute<K extends keyof Attributes>(name: K): Attributes[K];
    /**
     * Sets the given attribute for the given name.
     *
     * @param {string} name - The attribute name.
     * @param {BufferAttribute|InterleavedBufferAttribute} attribute - The attribute to set.
     * @return {BufferGeometry} A reference to this instance.
     */
    setAttribute<K extends keyof Attributes>(name: K, attribute: Attributes[K]): this;
    /**
     * Deletes the attribute for the given name.
     *
     * @param {string} name - The attribute name to delete.
     * @return {BufferGeometry} A reference to this instance.
     */
    deleteAttribute(name: keyof Attributes): this;
    /**
     * Returns `true` if this geometry has an attribute for the given name.
     *
     * @param {string} name - The attribute name.
     * @return {boolean} Whether this geometry has an attribute for the given name or not.
     */
    hasAttribute(name: keyof Attributes): boolean;
    /**
     * Adds a group to this geometry.
     *
     * @param {number} start - The first element in this draw call. That is the first
     * vertex for non-indexed geometry, otherwise the first triangle index.
     * @param {number} count - Specifies how many vertices (or indices) are part of this group.
     * @param {number} [materialIndex=0] - The material array index to use.
     */
    addGroup(start: number, count: number, materialIndex?: number): void;
    /**
     * Clears all groups.
     */
    clearGroups(): void;
    /**
     * Sets the draw range for this geometry.
     *
     * @param {number} start - The first vertex for non-indexed geometry, otherwise the first triangle index.
     * @param {number} count - For non-indexed BufferGeometry, `count` is the number of vertices to render.
     * For indexed BufferGeometry, `count` is the number of indices to render.
     */
    setDrawRange(start: number, count: number): void;
    /**
     * Applies the given 4x4 transformation matrix to the geometry.
     *
     * @param {Matrix4} matrix - The matrix to apply.
     * @return {BufferGeometry} A reference to this instance.
     */
    applyMatrix4(matrix: Matrix4): this;
    /**
     * Applies the rotation represented by the Quaternion to the geometry.
     *
     * @param {Quaternion} q - The Quaternion to apply.
     * @return {BufferGeometry} A reference to this instance.
     */
    applyQuaternion(q: Quaternion): this;
    /**
     * Rotates the geometry about the X axis. This is typically done as a one time
     * operation, and not during a loop. Use {@link Object3D#rotation} for typical
     * real-time mesh rotation.
     *
     * @param {number} angle - The angle in radians.
     * @return {BufferGeometry} A reference to this instance.
     */
    rotateX(angle: number): this;
    /**
     * Rotates the geometry about the Y axis. This is typically done as a one time
     * operation, and not during a loop. Use {@link Object3D#rotation} for typical
     * real-time mesh rotation.
     *
     * @param {number} angle - The angle in radians.
     * @return {BufferGeometry} A reference to this instance.
     */
    rotateY(angle: number): this;
    /**
     * Rotates the geometry about the Z axis. This is typically done as a one time
     * operation, and not during a loop. Use {@link Object3D#rotation} for typical
     * real-time mesh rotation.
     *
     * @param {number} angle - The angle in radians.
     * @return {BufferGeometry} A reference to this instance.
     */
    rotateZ(angle: number): this;
    /**
     * Translates the geometry. This is typically done as a one time
     * operation, and not during a loop. Use {@link Object3D#position} for typical
     * real-time mesh rotation.
     *
     * @param {number} x - The x offset.
     * @param {number} y - The y offset.
     * @param {number} z - The z offset.
     * @return {BufferGeometry} A reference to this instance.
     */
    translate(x: number, y: number, z: number): this;
    /**
     * Scales the geometry. This is typically done as a one time
     * operation, and not during a loop. Use {@link Object3D#scale} for typical
     * real-time mesh rotation.
     *
     * @param {number} x - The x scale.
     * @param {number} y - The y scale.
     * @param {number} z - The z scale.
     * @return {BufferGeometry} A reference to this instance.
     */
    scale(x: number, y: number, z: number): this;
    /**
     * Rotates the geometry to face a point in 3D space. This is typically done as a one time
     * operation, and not during a loop. Use {@link Object3D#lookAt} for typical
     * real-time mesh rotation.
     *
     * @param {Vector3} vector - The target point.
     * @return {BufferGeometry} A reference to this instance.
     */
    lookAt(vector: Vector3): this;
    /**
     * Center the geometry based on its bounding box.
     *
     * @return {BufferGeometry} A reference to this instance.
     */
    center(): this;
    /**
     * Defines a geometry by creating a `position` attribute based on the given array of points. The array
     * can hold 2D or 3D vectors. When using two-dimensional data, the `z` coordinate for all vertices is
     * set to `0`.
     *
     * If the method is used with an existing `position` attribute, the vertex data are overwritten with the
     * data from the array. The length of the array must match the vertex count.
     *
     * @param {Array<Vector2>|Array<Vector3>} points - The points.
     * @return {BufferGeometry} A reference to this instance.
     */
    setFromPoints(points: Vector3[] | Vector2[]): this;
    /**
     * Computes the bounding box of the geometry, and updates the `boundingBox` member.
     * The bounding box is not computed by the engine; it must be computed by your app.
     * You may need to recompute the bounding box if the geometry vertices are modified.
     */
    computeBoundingBox(): void;
    /**
     * Computes the bounding sphere of the geometry, and updates the `boundingSphere` member.
     * The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling.
     * You may need to recompute the bounding sphere if the geometry vertices are modified.
     */
    computeBoundingSphere(): void;
    /**
     * Calculates and adds a tangent attribute to this geometry.
     *
     * The computation is only supported for indexed geometries and if position, normal, and uv attributes
     * are defined. When using a tangent space normal map, prefer the MikkTSpace algorithm provided by
     * {@link BufferGeometryUtils#computeMikkTSpaceTangents} instead.
     */
    computeTangents(): void;
    /**
     * Computes vertex normals for the given vertex data. For indexed geometries, the method sets
     * each vertex normal to be the average of the face normals of the faces that share that vertex.
     * For non-indexed geometries, vertices are not shared, and the method sets each vertex normal
     * to be the same as the face normal.
     */
    computeVertexNormals(): void;
    /**
     * Ensures every normal vector in a geometry will have a magnitude of `1`. This will
     * correct lighting on the geometry surfaces.
     */
    normalizeNormals(): void;
    /**
     * Return a new non-index version of this indexed geometry. If the geometry
     * is already non-indexed, the method is a NOOP.
     *
     * @return {BufferGeometry} The non-indexed version of this indexed geometry.
     */
    toNonIndexed(): BufferGeometry;
    /**
     * Serializes the geometry into JSON.
     *
     * @return {Object} A JSON object representing the serialized geometry.
     */
    toJSON(): BufferGeometryJSON;
    /**
     * Returns a new geometry with copied values from this instance.
     *
     * @return {BufferGeometry} A clone of this instance.
     */
    clone(): this;
    /**
     * Copies the values of the given geometry to this instance.
     *
     * @param {BufferGeometry} source - The geometry to copy.
     * @return {BufferGeometry} A reference to this instance.
     */
    copy(source: BufferGeometry): this;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     *
     * @fires BufferGeometry#dispose
     */
    dispose(): void;
}
