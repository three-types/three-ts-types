import TempNode from '../core/TempNode';
import { Node } from '../Nodes';

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
