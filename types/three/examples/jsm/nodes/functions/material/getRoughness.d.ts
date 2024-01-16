import { ShaderNodeObject } from '../../shadernode/ShaderNode.js';
import Node from '../../core/Node.js';
import MathNode from '../../math/MathNode.js';

declare const getRoughness: (args: { roughness: Node }) => ShaderNodeObject<MathNode>;

export default getRoughness;
