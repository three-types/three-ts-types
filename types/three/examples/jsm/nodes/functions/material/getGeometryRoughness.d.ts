import { ShaderNodeObject } from '../../shadernode/ShaderNode.js';
import MathNode from '../../math/MathNode.js';

declare const getGeometryRoughness: () => ShaderNodeObject<MathNode>;

export default getGeometryRoughness;
