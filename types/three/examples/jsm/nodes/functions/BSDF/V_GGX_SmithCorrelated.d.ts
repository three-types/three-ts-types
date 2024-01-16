import { ShaderNodeObject } from '../../shadernode/ShaderNode.js';
import Node from '../../core/Node.js';
import OperatorNode from '../../math/OperatorNode.js';

declare const V_GGX_SmithCorrelated: (args: {
    alpha: Node;
    dotNL: Node;
    dotNV: Node;
}) => ShaderNodeObject<OperatorNode>;

export default V_GGX_SmithCorrelated;
