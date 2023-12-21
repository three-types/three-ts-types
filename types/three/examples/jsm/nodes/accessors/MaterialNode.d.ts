import Node from '../core/Node.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

export type MaterialNodeScope =
    | typeof MaterialNode.ALPHA_TEST
    | typeof MaterialNode.COLOR
    | typeof MaterialNode.OPACITY
    | typeof MaterialNode.ROUGHNESS
    | typeof MaterialNode.METALNESS
    | typeof MaterialNode.EMISSIVE
    | typeof MaterialNode.ROTATION;

export default class MaterialNode extends Node {
    static ALPHA_TEST: 'alphaTest';
    static COLOR: 'color';
    static OPACITY: 'opacity';
    static ROUGHNESS: 'roughness';
    static METALNESS: 'metalness';
    static EMISSIVE: 'emissive';
    static ROTATION: 'rotation';

    scope: MaterialNodeScope;
    constructor(scope?: MaterialNodeScope);
}

export const materialAlphaTest: Swizzable<MaterialNode>;
export const materialColor: Swizzable<MaterialNode>;
export const materialShininess: Swizzable<MaterialNode>;
export const materialEmissive: Swizzable<MaterialNode>;
export const materialOpacity: Swizzable<MaterialNode>;
export const materialSpecularColor: Swizzable<MaterialNode>;
export const materialReflectivity: Swizzable<MaterialNode>;
export const materialRoughness: Swizzable<MaterialNode>;
export const materialMetalness: Swizzable<MaterialNode>;
export const materialRotation: Swizzable<MaterialNode>;
