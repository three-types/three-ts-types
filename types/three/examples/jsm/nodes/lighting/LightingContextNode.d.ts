import ContextNode from '../core/ContextNode';
import Node from '../core/Node';
import { ShaderNode } from '../Nodes';

export interface LightingContextModel {
    indirectDiffuse?: ShaderNode;
    indirectSpecular?: ShaderNode;
    ambientOcclusion?: ShaderNode;
}

export default class LightingContextNode extends ContextNode {
    lightingModelNode: LightingContextModel | null;

    constructor(node: Node, lightingModelNode?: LightingContextModel | null);
}
