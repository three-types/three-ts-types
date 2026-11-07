import { ColorSpaceTransfer } from "../constants.js";
import { Color } from "./Color.js";
import { Matrix3 } from "./Matrix3.js";
import { Vector3 } from "./Vector3.js";

export interface ColorSpaceDefinition {
    primaries: [number, number, number, number, number, number];
    whitePoint: [number, number];
    transfer: ColorSpaceTransfer;
    toXYZ: Matrix3;
    fromXYZ: Matrix3;
    luminanceCoefficients: [number, number, number];
    workingColorSpaceConfig?: { unpackColorSpace: string };
    outputColorSpaceConfig?: { drawingBufferColorSpace: string; toneMappingMode?: "extended" | "standard" };
}

export function SRGBToLinear(c: number): number;
export function LinearToSRGB(c: number): number;
export interface ColorManagement {
    enabled: boolean;
    workingColorSpace: string;
    spaces: Record<string, ColorSpaceDefinition>;
    convert: (color: Color, sourceColorSpace: string, targetColorSpace: string) => Color;
    workingToColorSpace: (color: Color, targetColorSpace: string) => Color;
    colorSpaceToWorking: (color: Color, sourceColorSpace: string) => Color;
    getPrimaries: (colorSpace: string) => [number, number, number, number, number, number];
    getTransfer: (colorSpace: string) => ColorSpaceTransfer;
    getToneMappingMode: (colorSpace: string) => "extended" | "standard";
    getLuminanceCoefficients: (target: Vector3, colorSpace?: string) => Vector3;
    define: (colorSpaces: Record<string, ColorSpaceDefinition>) => void;
    _getMatrix: (targetMatrix: Matrix3, sourceColorSpace: string, targetColorSpace: string) => Matrix3;
    _getDrawingBufferColorSpace: (colorSpace: string) => string;
    _getUnpackColorSpace: (colorSpace?: string) => string;
}
export const ColorManagement: ColorManagement;
