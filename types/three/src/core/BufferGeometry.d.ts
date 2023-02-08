import { BufferAttribute } from './BufferAttribute';
import { InterleavedBufferAttribute } from './InterleavedBufferAttribute';
import { GLBufferAttribute } from './GLBufferAttribute';
import { Box3 } from './../math/Box3';
import { Sphere } from './../math/Sphere';
import { Matrix4 } from './../math/Matrix4';
import { Quaternion } from './../math/Quaternion';
import { Vector2 } from './../math/Vector2';
import { Vector3 } from './../math/Vector3';
import { EventDispatcher } from './EventDispatcher';
import { BuiltinShaderAttributeName } from '../constants';

/**
 * A representation of mesh, line, or point geometry.
 * Includes vertex positions, face indices, normals, colors, UVs, and custom attributes within buffers,
 * reducing the cost of passing all this data to the GPU.
 * *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/BufferGeometry.js}
 */
export class BufferGeometry extends EventDispatcher {
    /**
     * This creates a new BufferGeometry. It also sets several properties to a default value.
     */
    constructor();

    /**
     * Unique number for this bufferGeometry instance.
     */
    id: number;

    /**
     * UUID of this object instance. This gets automatically assigned and shouldn't be edited.
     */
    uuid: string;

    /**
     * Optional name for this bufferGeometry instance.
     * @default ''
     */
    name: string;

    /**
     * @default 'BufferGeometry'
     */
    type: string;

    /**
     * Allows for vertices to be re-used across multiple triangles; this is called using "indexed triangles".
     * Each triangle is associated with the indices of three vertices. This attribute therefore stores the index of each vertex for each triangular face.
     * If this attribute is not set, the renderer assumes that each three contiguous positions represent a single triangle.
     * @default null
     */
    index: BufferAttribute | null;

    /**
     * This hashmap has as id the name of the attribute to be set and as value the buffer to set it to.
     * Rather than accessing this property directly, use .setAttribute and .getAttribute to access attributes of this geometry.
     * @default {}
     */
    attributes: {
        [name: string]: BufferAttribute | InterleavedBufferAttribute | GLBufferAttribute;
    };

    /**
     * Hashmap of BufferAttributes holding details of the geometry's morph targets.
     * @remarks Once the geometry has been rendered, the morph attribute data cannot be changed. You will have to call .dispose(), and create a new instance of BufferGeometry.
     * @default {}
     */
    morphAttributes: {
        [name: string]: Array<BufferAttribute | InterleavedBufferAttribute>;
    };

    /**
     * Used to control the morph target behavior; when set to true, the morph target data is treated as relative offsets, rather than as absolute positions/normals.
     * @default false
     */
    morphTargetsRelative: boolean;

    /**
     * Split the geometry into groups, each of which will be rendered in a separate WebGL draw call. This allows an array of materials to be used with the geometry.
     * @default []
     */
    groups: Array<{ start: number; count: number; materialIndex?: number | undefined }>;

    /**
     * Bounding box for the bufferGeometry, which can be calculated with .computeBoundingBox().
     * @default null
     */
    boundingBox: Box3 | null;

    /**
     * Bounding sphere for the bufferGeometry, which can be calculated with .computeBoundingSphere().
     * @default null
     */
    boundingSphere: Sphere | null;

    /**
     * Determines the part of the geometry to render. This should not be set directly, instead use .setDrawRange.
     * @remarks For non-indexed BufferGeometry, count is the number of vertices to render. For indexed BufferGeometry, count is the number of indices to render.
     * @default { start: 0, count: Infinity }
     */
    drawRange: { start: number; count: number };

    /**
     * An object that can be used to store custom data about the BufferGeometry. It should not hold references to functions as these will not be cloned.
     * @default {}
     */
    userData: { [key: string]: any };

    /**
     * Read-only flag to check if a given object is of type BufferGeometry.
     * @default true
     */
    readonly isBufferGeometry: true;

    /**
     * Return the .index buffer.
     */
    getIndex(): BufferAttribute | null;

    /**
     * Set the .index buffer.
     */
    setIndex(index: BufferAttribute | number[] | null): BufferGeometry;

    /**
     * Sets an attribute to this geometry.
     * @remarks Use this rather than the attributes property, because an internal hashmap of .attributes is maintained to speed up iterating over attributes.
     */
    setAttribute(
        name: BuiltinShaderAttributeName | (string & {}),
        attribute: BufferAttribute | InterleavedBufferAttribute | GLBufferAttribute,
    ): BufferGeometry;

    /**
     * Returns the attribute with the specified name.
     */
    getAttribute(
        name: BuiltinShaderAttributeName | (string & {}),
    ): BufferAttribute | InterleavedBufferAttribute | GLBufferAttribute;

    /**
     * Deletes the attribute with the specified name.
     */
    deleteAttribute(name: BuiltinShaderAttributeName | (string & {})): BufferGeometry;

    /**
     * Returns true if the attribute with the specified name exists.
     */
    hasAttribute(name: BuiltinShaderAttributeName | (string & {})): boolean;

    /**
     * Adds a group to this geometry; see the groups property for details.
     */
    addGroup(start: number, count: number, materialIndex?: number): void;
    /**
     * Clears all groups.
     */
    clearGroups(): void;

    /**
     * Set the .drawRange property. For non-indexed BufferGeometry, count is the number of vertices to render. For indexed BufferGeometry, count is the number of indices to render.
     */
    setDrawRange(start: number, count: number): void;

    /**
     * Applies the matrix transform to the geometry.
     */
    applyMatrix4(matrix: Matrix4): BufferGeometry;

    /**
     * Applies the rotation represented by the quaternion to the geometry.
     */
    applyQuaternion(q: Quaternion): BufferGeometry;

    /**
     * Rotate the geometry about the X axis. This is typically done as a one time operation, and not during a loop.
     * @remarks Use Object3D.rotation for typical real-time mesh rotation.
     */
    rotateX(angle: number): BufferGeometry;

    /**
     * Rotate the geometry about the Y axis. This is typically done as a one time operation, and not during a loop.
     * @remarks Use Object3D.rotation for typical real-time mesh rotation.
     */
    rotateY(angle: number): BufferGeometry;

    /**
     * Rotate the geometry about the Z axis. This is typically done as a one time operation, and not during a loop.
     * @remarks Use Object3D.rotation for typical real-time mesh rotation.
     */
    rotateZ(angle: number): BufferGeometry;

    /**
     * Translate the geometry. This is typically done as a one time operation, and not during a loop.
     * @remarks Use Object3D.position for typical real-time mesh translation.
     */
    translate(x: number, y: number, z: number): BufferGeometry;

    /**
     * Scale the geometry data. This is typically done as a one time operation, and not during a loop.
     * @remarks Use Object3D.scale for typical real-time mesh scaling.
     */
    scale(x: number, y: number, z: number): BufferGeometry;

    /**
     * Rotates the geometry to face a point in space. This is typically done as a one time operation, and not during a loop.
     * @remarks Use Object3D.lookAt for typical real-time mesh usage.
     */
    lookAt(v: Vector3): void;

    /**
     * Center the geometry based on the bounding box.
     */
    center(): BufferGeometry;

    /**
     * Sets the attributes for this BufferGeometry from an array of points.
     */
    setFromPoints(points: Vector3[] | Vector2[]): BufferGeometry;

    /**
     * Computes bounding box of the geometry, updating .boundingBox attribute.
     * Bounding boxes aren't computed by default. They need to be explicitly computed, otherwise they are null.
     */
    computeBoundingBox(): void;

    /**
     * Computes bounding sphere of the geometry, updating .boundingSphere attribute.
     * Bounding spheres aren't computed by default. They need to be explicitly computed, otherwise they are null.
     */
    computeBoundingSphere(): void;

    /**
     * Calculates and adds a tangent attribute to this geometry.
     * The computation is only supported for indexed geometries and if position, normal, and uv attributes are defined.
     * @remarks When using a tangent space normal map, prefer the MikkTSpace algorithm provided by BufferGeometryUtils.computeMikkTSpaceTangents instead.
     */
    computeTangents(): void;

    /**
     * Computes vertex normals by averaging face normals.
     */
    computeVertexNormals(): void;

    /**
     * Every normal vector in a geometry will have a magnitude of 1. This will correct lighting on the geometry surfaces.
     */
    normalizeNormals(): void;

    /**
     * Return a non-index version of an indexed BufferGeometry.
     */
    toNonIndexed(): BufferGeometry;

    /**
     * Convert the buffer geometry to three.js JSON Object/Scene format.
     */
    toJSON(): any;

    /**
     * Creates a clone of this BufferGeometry
     */
    clone(): BufferGeometry;

    /**
     * Copies another BufferGeometry to this BufferGeometry.
     */
    copy(source: BufferGeometry): this;

    /**
     * Frees the GPU-related resources allocated by this instance.
     * Call this method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
