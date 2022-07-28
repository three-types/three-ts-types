import { ShaderNode } from '../../shadernode/ShaderNodeBaseElements';

declare const V_GGX_SmithCorrelated: ShaderNode<{ alpha: Node; dotNL: Node; dotNV: Node }>;

export default V_GGX_SmithCorrelated;
