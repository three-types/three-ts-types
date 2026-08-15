export namespace GAUSSIAN_SPLAT_PLY_PROPERTY_MAPPING {
    let scale: string[];
    let rotation: string[];
    let f_dc: string[];
    let opacity: string[];
}
export const SH_C0: 0.2820947917738781;
export function clampByte(value: any): number;
export function createGaussianSplatGeometry(centers: any, covariances: any, colors: any): BufferGeometry;
export function createGaussianSplatGeometryFromPLYGeometry(geometry: any, { scaleAttribute, rotationAttribute, sh0Attribute, opacityAttribute }?: {
    scaleAttribute?: string | undefined;
    rotationAttribute?: string | undefined;
    sh0Attribute?: string | undefined;
    opacityAttribute?: string | undefined;
}): BufferGeometry;
export function linearToSH0(color: any): number;
export function sh0ToLinear(coefficient: any): number;
export function sigmoid(value: any): number;
export function writeColorBytes(target: any, offset: any, r: any, g: any, b: any, a: any): void;
export function writeColorBytesFromSH0(target: any, offset: any, r: any, g: any, b: any, a: any): void;
export function writeCovariance(target: any, offset: any, sx: any, sy: any, sz: any, qx: any, qy: any, qz: any, qw: any): void;
import { BufferGeometry } from 'three';
