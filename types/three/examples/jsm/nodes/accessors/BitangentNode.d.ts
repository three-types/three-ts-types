import Node from '../core/Node.js';
import { Swizzable } from '../shadernode/ShaderNode.js';
import MathNode from '../math/MathNode.js';

export type BitangentNodeScope =
    | typeof BitangentNode.LOCAL
    | typeof BitangentNode.VIEW
    | typeof BitangentNode.WORLD
    | typeof BitangentNode.GEOMETRY;

export default class BitangentNode extends Node {
    static GEOMETRY: 'geometry';
    static LOCAL: 'local';
    static VIEW: 'view';
    static WORLD: 'world';

    scope: BitangentNodeScope;

    constructor(scope?: BitangentNodeScope);
}

export const bitangentGeometry: Swizzable<BitangentNode>;
export const bitangentLocal: Swizzable<BitangentNode>;
export const bitangentView: Swizzable<BitangentNode>;
export const bitangentWorld: Swizzable<BitangentNode>;
export const transformedBitangentView: Swizzable<MathNode>;
export const transformedBitangentWorld: Swizzable<MathNode>;
