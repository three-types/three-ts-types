import { Color } from 'three';
import { ColorRepresentation } from '../../../../src/math/Color';

export type Color4Representation = ColorRepresentation | Color4;

export default class Color4 extends Color {
    constructor(r: number, g: number, b: number, a?: number);

    set(...args: [color: Color4Representation] | [r: number, g: number, b: number, a?: number]): this;

    copy(color: this): this;

    clone(): this;
}
