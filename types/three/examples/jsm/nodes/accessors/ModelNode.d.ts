import Object3DNode, { Object3DNodeScope } from './Object3DNode.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

/**
 * Similar to {@link Object3DNode} but the object comes from {@link NodeFrame}
 */
export default class ModelNode extends Object3DNode {
    constructor(scope?: Object3DNodeScope);
}

export const modelViewMatrix: Swizzable<ModelNode>;
export const modelNormalMatrix: Swizzable<ModelNode>;
export const modelWorldMatrix: Swizzable<ModelNode>;
export const modelPosition: Swizzable<ModelNode>;
export const modelViewPosition: Swizzable<ModelNode>;
