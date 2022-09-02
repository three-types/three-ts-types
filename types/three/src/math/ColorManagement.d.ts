import { ColorSpace, LinearSRGBColorSpace, SRGBColorSpace } from '../constants';
import { Color } from './Color';

export function SRGBToLinear(c: number): number;

export function LinearToSRGB(c: number): number;

export namespace ColorManagement {
    /**
     * @default true
     */
    const legacyMode: boolean;

    /**
     * @default LinearSRGBColorSpace
     */
    const workingColorSpace: ColorSpace;

    function convert(
        color: Color,
        sourceColorSpace: SRGBColorSpace | LinearSRGBColorSpace,
        targetColorSpace: SRGBColorSpace | LinearSRGBColorSpace,
    ): Color;

    function fromWorkingColorSpace(color: Color, targetColorSpace: SRGBColorSpace | LinearSRGBColorSpace): Color;

    function toWorkingColorSpace(color: Color, sourceColorSpace: SRGBColorSpace | LinearSRGBColorSpace): Color;
}
