import { ShaderNodeObject } from '../shadernode/ShaderNode';
import Node from './Node';
import TempNode from './TempNode';

export default class AssignNode extends TempNode {
    constructor(targetNode: Node, sourceNode: Node);

    hasDependencies(): false;
}

export const assign: (targetNode: Node, sourceNode: Node) => ShaderNodeObject<AssignNode>;

declare module '../shadernode/ShaderNode.js' {
    interface NodeElements {
        assign: typeof assign;
    }
}
