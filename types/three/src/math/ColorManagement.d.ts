import { ColorSpace, LinearSRGBColorSpace, SRGBColorSpace } from '../constants.js';
import { Color } from './Color.js';

export function SRGBToLinear(c: number): number;

export function LinearToSRGB(c: number): number;

export namespace ColorManagement {
    /**
     * @default true
     */
    let legacyMode: boolean;

    /**
     * @default LinearSRGBColorSpace
     */
    let workingColorSpace: ColorSpace;

    function convert(
        color: Color,
        sourceColorSpace: typeof SRGBColorSpace | typeof LinearSRGBColorSpace,
        targetColorSpace: typeof SRGBColorSpace | typeof LinearSRGBColorSpace,
    ): Color;

    function fromWorkingColorSpace(
        color: Color,
        targetColorSpace: typeof SRGBColorSpace | typeof LinearSRGBColorSpace,
    ): Color;

    function toWorkingColorSpace(
        color: Color,
        sourceColorSpace: typeof SRGBColorSpace | typeof LinearSRGBColorSpace,
    ): Color;
}
