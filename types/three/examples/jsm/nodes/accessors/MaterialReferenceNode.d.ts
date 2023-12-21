import { Material } from '../../../../src/Three.js';
import ReferenceNode from './ReferenceNode.js';
import { NodeOrType, Swizzable } from '../shadernode/ShaderNode.js';

export default class MaterialReferenceNode extends ReferenceNode<Material | null> {
    constructor(property: string, inputType: string, material?: Material | null);
}

export const materialReference: (
    name: string,
    nodeOrType: NodeOrType,
    material: Material,
) => Swizzable<MaterialReferenceNode>;
