import Node from "../../../nodes/core/Node.js";
import NodeAttribute from "../../../nodes/core/NodeAttribute.js";
import { Transform } from "../../webgl/nodes/GLSLNodeBuilder.js";
import Binding from "../Binding.js";
declare class NodeBuilderState {
    vertexShader: string | null;
    fragmentShader: string | null;
    computeShader: string | null;
    transforms: Transform[];
    nodeAttributes: NodeAttribute[];
    bindings: Binding[];
    updateNodes: Node[];
    updateBeforeNodes: Node[];
    usedTimes: number;
    constructor(
        vertexShader: string | null,
        fragmentShader: string | null,
        computeShader: string | null,
        nodeAttributes: NodeAttribute[],
        bindings: Binding[],
        updateNodes: Node[],
        updateBeforeNodes: Node[],
        transforms?: Transform[],
    );
    createBindings(): Binding[];
}
export default NodeBuilderState;
