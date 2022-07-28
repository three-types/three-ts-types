import Object3DNode, { OObject3DNodeScope } from './Object3DNode';

export type CameraNodeScope = OObject3DNodeScope | typeof CameraNode.PROJECTION_MATRIX;

export default class CameraNode extends Object3DNode {
    static PROJECTION_MATRIX: 'projectionMatrix';

    // @ts-expect-error
    scope: CameraNodeScope;

    constructor(scope?: CameraNodeScope);
}
