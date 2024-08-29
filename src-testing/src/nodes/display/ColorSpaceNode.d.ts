import { ColorSpace, LinearSRGBColorSpace, SRGBColorSpace } from "../../constants.js";
import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import { NodeRepresentation, ShaderNodeObject } from "../tsl/TSLCore.js";

export const getColorSpaceMethod: (
    source: typeof LinearSRGBColorSpace | typeof SRGBColorSpace,
    target: typeof LinearSRGBColorSpace | typeof SRGBColorSpace,
) => string;

export default class ColorSpaceNode extends TempNode {
    colorSpace: string;
    node: Node;

    constructor(colorSpace: string, node: Node);

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
