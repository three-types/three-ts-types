import { NodeTypeOption } from './constants.js';
import Node from './Node.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

export default class PropertyNode extends Node {
    constructor(name?: string, nodeType?: NodeTypeOption);
}

export const property: (name: string, nodeOrType: Node | NodeTypeOption) => Swizzable;

export const diffuseColor: Swizzable<PropertyNode>;
export const roughness: Swizzable<PropertyNode>;
export const metalness: Swizzable<PropertyNode>;
export const specularColor: Swizzable<PropertyNode>;
export const shininess: Swizzable<PropertyNode>;
