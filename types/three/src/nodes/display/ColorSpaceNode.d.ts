import { ColorSpace, LinearSRGBColorSpace, SRGBColorSpace } from "../../constants.js";
import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import { NodeRepresentation, ShaderNodeObject } from "../tsl/TSLCore.js";

export type ColorSpaceMethod = 'LinearTosRGB' | 'sRGBToLinear' | 'LinearToLinear' | 'sRGBTosRGB';

export const getColorSpaceMethod: (
    source: typeof LinearSRGBColorSpace | typeof SRGBColorSpace,
    target: typeof LinearSRGBColorSpace | typeof SRGBColorSpace,
) => ColorSpaceMethod;

export default class ColorSpaceNode extends TempNode {
    colorSpace: ColorSpaceMethod;
    node: Node;

    constructor(colorSpace: ColorSpaceMethod, node: Node);

    static LINEAR_TO_LINEAR: "LinearToLinear";
}

export const linearToColorSpace: (node: NodeRepresentation, colorSpace: ColorSpace) => ShaderNodeObject<ColorSpaceNode>;
export const colorSpaceToLinear: (node: NodeRepresentation, colorSpace: ColorSpace) => ShaderNodeObject<ColorSpaceNode>;

export const linearTosRGB: (node: NodeRepresentation) => ShaderNodeObject<ColorSpaceNode>;
export const sRGBToLinear: (node: NodeRepresentation) => ShaderNodeObject<ColorSpaceNode>;

declare module "../tsl/TSLCore.js" {
    interface NodeElements {
        linearToColorSpace: typeof linearToColorSpace;
        colorSpaceToLinear: typeof colorSpaceToLinear;
    }
}
