import AttributeNode from "../core/AttributeNode.js";
import VarNode from "../core/VarNode.js";
import VaryingNode from "../core/VaryingNode.js";
import { ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const positionGeometry: ShaderNodeObject<AttributeNode>;
export const positionLocal: ShaderNodeObject<VarNode>;
export const positionWorld: ShaderNodeObject<VaryingNode>;
export const positionWorldDirection: ShaderNodeObject<VarNode>;
export const positionView: ShaderNodeObject<VaryingNode>;
export const positionViewDirection: ShaderNodeObject<VarNode>;
