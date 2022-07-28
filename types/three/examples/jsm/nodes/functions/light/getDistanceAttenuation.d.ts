import { ShaderNode } from '../../shadernode/ShaderNodeBaseElements';

declare const getDistanceAttenuation: ShaderNode<{ lightDistance: Node; cutoffDistance: Node; decayExponent: Node }>;

export default getDistanceAttenuation;
