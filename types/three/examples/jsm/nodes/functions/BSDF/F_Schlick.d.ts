import { ShaderNode } from '../../shadernode/ShaderNodeBaseElements';

declare const F_Schlick: ShaderNode<{ f0: Node; f90: Node; dotVH: Node }>;

export default F_Schlick;
