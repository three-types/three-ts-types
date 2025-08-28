import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import { ShaderNodeObject } from "../tsl/TSLCore.js";

declare class BitcastNode extends TempNode {
    valueNode: Node;
    conversionType: string;

    readonly isBitcastNode: true;

    constructor(valueNode: Node, conversionType: string);
}

export default BitcastNode;

export const bitcast: (x: Node | number, y: string) => ShaderNodeObject<BitcastNode>;
