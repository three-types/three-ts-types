import Node from '../core/Node.js';
import { Swizzable } from '../shadernode/ShaderNode.js';
import VarNode from '../core/VarNode.js';

export type NormalNodeScope = typeof NormalNode.GEOMETRY | typeof NormalNode.LOCAL | typeof NormalNode.VIEW;

export default class NormalNode extends Node {
    static GEOMETRY: 'geometry';
    static LOCAL: 'local';
    static VIEW: 'view';
    scope: NormalNodeScope;

    constructor(scope?: NormalNodeScope);
}

export const normalGeometry: Swizzable<NormalNode>;
export const normalLocal: Swizzable<NormalNode>;
export const normalView: Swizzable<NormalNode>;
export const normalWorld: Swizzable<NormalNode>;
export const transformedNormalView: Swizzable<VarNode>;
