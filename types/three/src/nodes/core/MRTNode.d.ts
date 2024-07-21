import { ShaderNodeObject } from "../shadernode/ShaderNode.js";
import OutputStructNode from "./OutputStructNode.js";
import { Node } from '../Nodes.js';

declare class MRTNode extends OutputStructNode {
    outputNodes: { [name: string]: Node };

    readonly isMRTNode: true;

    constructor(outputNodes: { [name: string]: Node });

    merge(mrtNode: MRTNode): ShaderNodeObject<MRTNode>;
}

export default MRTNode;

export const mrt: (outputNodes: { [name: string]: Node }) => ShaderNodeObject<MRTNode>;
