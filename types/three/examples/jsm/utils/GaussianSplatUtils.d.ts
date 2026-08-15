import { BufferGeometry } from "three";

export const GAUSSIAN_SPLAT_PLY_PROPERTY_MAPPING: {
    scale: string[];
    rotation: string[];
    f_dc: string[];
    opacity: string[];
};

export const SH_C0: number;

export function sigmoid(value: number): number;

export function sh0ToLinear(coefficient: number): number;

export function linearToSH0(color: number): number;

export function writeColorBytes(
    target: Uint8ClampedArray,
    offset: number,
    r: number,
    g: number,
    b: number,
    a: number,
): void;

export function writeColorBytesFromSH0(
    target: Uint8ClampedArray,
    offset: number,
    r: number,
    g: number,
    b: number,
    a: number,
): void;

export function writeCovariance(
    target: Float32Array,
    offset: number,
    sx: number,
    sy: number,
    sz: number,
    qx: number,
    qy: number,
    qz: number,
    qw: number,
): void;

export function createGaussianSplatGeometry(
    centers: Float32Array,
    covariances: Float32Array,
    colors: Uint8ClampedArray,
): BufferGeometry;

export interface CreateGaussianSplatGeometryFromPLYGeometryOptions {
    scaleAttribute?: string | undefined;
    rotationAttribute?: string | undefined;
    sh0Attribute?: string | undefined;
    opacityAttribute?: string | undefined;
}

export function createGaussianSplatGeometryFromPLYGeometry(
    geometry: BufferGeometry,
    options?: CreateGaussianSplatGeometryFromPLYGeometryOptions,
): BufferGeometry;
