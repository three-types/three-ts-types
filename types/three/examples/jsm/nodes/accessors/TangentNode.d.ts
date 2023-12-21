import Node from '../core/Node.js';
import { Swizzable } from '../shadernode/ShaderNode.js';
import MathNode from '../math/MathNode.js';

export type TangentNodeScope =
    | typeof TangentNode.LOCAL
    | typeof TangentNode.VIEW
    | typeof TangentNode.WORLD
    | typeof TangentNode.GEOMETRY;

export default class TangentNode extends Node {
    static GEOMETRY: 'geometry';
    static LOCAL: 'local';
    static VIEW: 'view';
    static WORLD: 'world';

    scope: TangentNodeScope;

    constructor(scope?: TangentNodeScope);
}

export const tangentGeometry: Swizzable<TangentNode>;
export const tangentLocal: Swizzable<TangentNode>;
export const tangentView: Swizzable<TangentNode>;
export const tangentWorld: Swizzable<TangentNode>;
export const transformedTangentView: Swizzable<MathNode>;
export const transformedTangentWorld: Swizzable<MathNode>;
