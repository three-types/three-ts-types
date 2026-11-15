/**
 * @module GeometryCompressionUtils
 * @three_import import * as GeometryCompressionUtils from 'three/addons/utils/GeometryCompressionUtils.js';
 */
/**
 * Compressed the given geometry's `normal` attribute by the selected encode method.
 *
 * @param {BufferGeometry} geometry - The geometry whose normals should be compressed.
 * @param {('DEFAULT'|'OCT1Byte'|'OCT2Byte'|'ANGLES')} encodeMethod - The compression method.
 */
export function compressNormals(geometry: BufferGeometry, encodeMethod: ("DEFAULT" | "OCT1Byte" | "OCT2Byte" | "ANGLES")): void;
/**
 * Compressed the given geometry's `position` attribute.
 *
 * @param {BufferGeometry} geometry - The geometry whose position values should be compressed.
 */
export function compressPositions(geometry: BufferGeometry): void;
/**
 * Compressed the given geometry's `uv` attribute.
 *
 * @param {BufferGeometry} geometry - The geometry whose texture coordinates should be compressed.
 */
export function compressUvs(geometry: BufferGeometry): void;
