export function SRGBToLinear(c: any): number;
export function LinearToSRGB(c: any): number;
export namespace ColorManagement {
    export let enabled: boolean;
    export { LinearSRGBColorSpace as workingColorSpace };
    export let spaces: {};
    export function convert(color: any, sourceColorSpace: any, targetColorSpace: any): any;
    export function workingToColorSpace(color: any, targetColorSpace: any): any;
    export function colorSpaceToWorking(color: any, sourceColorSpace: any): any;
    export function getPrimaries(colorSpace: any): any;
    export function getTransfer(colorSpace: any): any;
    export function getLuminanceCoefficients(target: any, colorSpace?: any): any;
    export function define(colorSpaces: any): void;
    export function _getMatrix(targetMatrix: any, sourceColorSpace: any, targetColorSpace: any): any;
    export function _getDrawingBufferColorSpace(colorSpace: any): any;
    export function _getUnpackColorSpace(colorSpace?: any): any;
    export function fromWorkingColorSpace(color: any, targetColorSpace: any): any;
    export function toWorkingColorSpace(color: any, sourceColorSpace: any): any;
}
import { LinearSRGBColorSpace } from '../constants.js';
