export namespace GAUSSIAN_SPLAT_PLY_PROPERTY_MAPPING {
    let scale: string[];
    let rotation: string[];
    let f_dc: string[];
    let opacity: string[];
}
export const SH_BAND_COMPONENTS: number[];
export const SH_BAND_WORDS: number[];
export const SH_C0: 0.2820947917738781;
export const SH_DEGREE_TO_COMPONENTS: number[];
/**
 * Creates Gaussian splat geometry from packed attribute arrays. Higher-order
 * spherical harmonics must be supplied as packed `Uint32Array` words
 * (`SH_BAND_WORDS[ degree ]` words per splat, four clamped-byte coefficients
 * per word using `( value - 128 ) / 128`).
 *
 * @param {Float32Array} centers - Splat centers.
 * @param {Float32Array} covariances - Splat covariance matrices.
 * @param {Uint8Array|Uint8ClampedArray} colors - RGBA colors.
 * @param {Object} [sphericalHarmonics={}] - Optional packed SH band arrays.
 * @return {BufferGeometry} The Gaussian splat geometry.
 */
export function createGaussianSplatGeometry(centers: Float32Array, covariances: Float32Array, colors: Uint8Array | Uint8ClampedArray, sphericalHarmonics?: Object): BufferGeometry;
export function createGaussianSplatGeometryFromPLYGeometry(geometry: any, { scaleAttribute, rotationAttribute, sh0Attribute, shRestAttribute, opacityAttribute }?: {
    scaleAttribute?: string | undefined;
    rotationAttribute?: string | undefined;
    sh0Attribute?: string | undefined;
    shRestAttribute?: string | undefined;
    opacityAttribute?: string | undefined;
}): BufferGeometry;
export function createPackedSphericalHarmonicsBand(count: any, degree: any): {
    packed: Uint32Array<ArrayBuffer>;
    bytes: Uint8ClampedArray<ArrayBuffer>;
};
export function getGaussianSplatPLYPropertyMapping(sphericalHarmonicsDegree?: number): {
    scale: string[];
    rotation: string[];
    f_dc: string[];
    opacity: string[];
};
export function getSphericalHarmonicsDegree(geometry: any): number;
export function linearToSH0(color: any): number;
export function sh0ToLinear(coefficient: any): number;
export function sigmoid(value: any): number;
export function writeColorBytes(target: any, offset: any, r: any, g: any, b: any, a: any): void;
export function writeColorBytesFromSH0(target: any, offset: any, r: any, g: any, b: any, a: any): void;
export function writeCovariance(target: any, offset: any, sx: any, sy: any, sz: any, qx: any, qy: any, qz: any, qw: any): void;
import { BufferGeometry } from 'three';
