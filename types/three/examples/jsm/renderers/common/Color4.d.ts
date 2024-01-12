import { Color, ColorRepresentation } from '../../../../src/math/Color.ts';

export type Color4Representation = ColorRepresentation | Color4;

export default class Color4 extends Color {
    constructor(r: number, g: number, b: number, a?: number);

    set(...args: [color: ColorRepresentation] | [r: number, g: number, b: number, a?: number]): this;

    clone(): this;
}
