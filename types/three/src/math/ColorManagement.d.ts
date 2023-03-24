import { ColorSpace, DisplayP3ColorSpace, LinearSRGBColorSpace, SRGBColorSpace } from '../constants';
import { Color } from './Color';

export function SRGBToLinear(c: number): number;

export function LinearToSRGB(c: number): number;

export namespace ColorManagement {
    /**
     * @default false
     */
    let enabled: boolean;

    /**
     * @default LinearSRGBColorSpace
     */
    let workingColorSpace: ColorSpace;

    function convert(
        color: Color,
        sourceColorSpace: SRGBColorSpace | LinearSRGBColorSpace | DisplayP3ColorSpace,
        targetColorSpace: SRGBColorSpace | LinearSRGBColorSpace | DisplayP3ColorSpace,
    ): Color;

    function fromWorkingColorSpace(color: Color, targetColorSpace: SRGBColorSpace | LinearSRGBColorSpace): Color;

    function toWorkingColorSpace(color: Color, sourceColorSpace: SRGBColorSpace | LinearSRGBColorSpace): Color;
}
