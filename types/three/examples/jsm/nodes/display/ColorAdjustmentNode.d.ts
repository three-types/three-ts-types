import TempNode from '../core/TempNode.js';
import MathNode from '../math/MathNode.js';
import { NodeRepresentation, Swizzable } from '../shadernode/ShaderNode.js';

export type ColorAdjustmentMethod =
    | typeof ColorAdjustmentNode.SATURATION
    | typeof ColorAdjustmentNode.VIBRANCE
    | typeof ColorAdjustmentNode.HUE;

export default class ColorAdjustmentNode extends TempNode {
    static SATURATION: 'saturation';
    static VIBRANCE: 'vibrance';
    static HUE: 'hue';

    method: ColorAdjustmentMethod;

    colorNode: Node;
    adjustmentNode: Node;

    constructor(method: ColorAdjustmentMethod, colorNode: Node, adjustmentNode?: Node);
}

export const saturation: (
    colorNode: NodeRepresentation,
    adjustmentNode?: NodeRepresentation,
) => Swizzable<ColorAdjustmentNode>;
export const vibrance: (
    colorNode: NodeRepresentation,
    adjustmentNode?: NodeRepresentation,
) => Swizzable<ColorAdjustmentNode>;
export const hue: (
    colorNode: NodeRepresentation,
    adjustmentNode?: NodeRepresentation,
) => Swizzable<ColorAdjustmentNode>;

export const lumaCoeffs: Swizzable<MathNode>;
export const luminance: (a: NodeRepresentation, b: NodeRepresentation) => Swizzable<MathNode>;
