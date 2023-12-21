import Node from '../core/Node.js';
import { Swizzable } from '../shadernode/ShaderNode';

export type PositionNodeScope =
    | typeof PositionNode.GEOMETRY
    | typeof PositionNode.LOCAL
    | typeof PositionNode.WORLD
    | typeof PositionNode.WORLD_DIRECTION
    | typeof PositionNode.VIEW
    | typeof PositionNode.VIEW_DIRECTION;

export default class PositionNode extends Node {
    static GEOMETRY: 'geometry';
    static LOCAL: 'local';
    static WORLD: 'world';
    static WORLD_DIRECTION: 'worldDirection';
    static VIEW: 'view';
    static VIEW_DIRECTION: 'viewDirection';
    scope: PositionNodeScope;

    constructor(scope?: PositionNodeScope);
}

export const positionGeometry: Swizzable<PositionNode>;
export const positionLocal: Swizzable<PositionNode>;
export const positionWorld: Swizzable<PositionNode>;
export const positionWorldDirection: Swizzable<PositionNode>;
export const positionView: Swizzable<PositionNode>;
export const positionViewDirection: Swizzable<PositionNode>;
