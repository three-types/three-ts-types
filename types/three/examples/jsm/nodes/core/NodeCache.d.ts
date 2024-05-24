import Node from './Node.js';
import NodeAttribute from './NodeAttribute.js';
import NodeUniform from './NodeUniform.js';
import NodeVar from './NodeVar.js';
import NodeVarying from './NodeVarying.js';
import NodeCode from './NodeCode.js';
interface ShaderStageNodeData {
    properties?: {
        outputNode: Node | null;
    } | undefined;
    bufferAttribute?: NodeAttribute | undefined;
    structType?: Node | undefined;
    uniform?: NodeUniform | undefined;
    variable?: NodeVar | undefined;
    varying?: NodeVarying | undefined;
    code?: NodeCode | undefined;
}
interface NodeData {
    vertex?: ShaderStageNodeData | undefined;
    fragment?: ShaderStageNodeData | undefined;
    compute?: ShaderStageNodeData | undefined;
    any?: ShaderStageNodeData | undefined;
}
declare class NodeCache {
    id: number;
    nodesData: WeakMap<Node, NodeData>;
    constructor();
    getNodeData(node: Node): NodeData | undefined;
    setNodeData(node: Node, data: NodeData): void;
}
export default NodeCache;
