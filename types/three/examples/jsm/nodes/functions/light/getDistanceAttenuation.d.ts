import { ShaderNode } from '../../shadernode/ShaderNodeBaseElements.js';
import Node from '../../core/Node.js';
declare const getDistanceAttenuation: ShaderNode<{ lightDistance: Node; cutoffDistance: Node; decayExponent: Node }>;

export default getDistanceAttenuation;
