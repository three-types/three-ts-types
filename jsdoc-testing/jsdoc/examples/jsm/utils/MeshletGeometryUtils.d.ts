/**
 * Builds meshlets of 64 triangles and a chain of simplified levels of detail for the given geometry.
 * Identical vertices are welded first and all levels index the same vertices. The vertex data is
 * interleaved into one storage buffer and accessed through the returned functions.
 *
 * @param {BufferGeometry} geometry - The geometry, with position and normal attributes.
 * @param {?Object} [group=null] - An optional material group whose triangles are processed independently.
 * @return {Object} The meshlet data.
 */
export function createMeshlets(geometry: BufferGeometry, group?: Object | null): Object;
/**
 * Utilities to process geometries into clusters (meshlets) of 64 triangles with a chain of simplified
 * levels of detail, used by the meshlet drawing pipelines.
 *
 * @module MeshletGeometryUtils
 * @three_import import * as MeshletGeometryUtils from 'three/addons/utils/MeshletGeometryUtils.js';
 */
/**
 * The number of triangles of a meshlet. Meshlets are padded with degenerate triangles to this size.
 *
 * @type {number}
 * @constant
 */
export const MESHLET_SIZE: number;
/**
 * Resolves when the meshoptimizer modules are ready to process geometries.
 *
 * @type {Promise}
 */
export const ready: Promise<any>;
/**
 * The maximum number of levels of detail of a geometry.
 *
 * @type {number}
 * @constant
 */
export const MAX_LODS: number;
