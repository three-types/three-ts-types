import { Color, ColorKeyword } from './math/Color';

export type ColorModelString = `${'rgb' | 'hsl'}(${string})`;
export type HexColorString = `#${string & { length: 3 | 6 }}`;

export type ColorRepresentation = Color | ColorKeyword | ColorModelString | HexColorString | number;
