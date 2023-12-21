import Object3DNode, { Object3DNodeScope } from './Object3DNode.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

export type CameraNodeScope = Object3DNodeScope | typeof CameraNode.PROJECTION_MATRIX;

export default class CameraNode extends Object3DNode {
    static PROJECTION_MATRIX: 'projectionMatrix';

    // @ts-expect-error
    scope: CameraNodeScope;

    constructor(scope?: CameraNodeScope);
}

export const cameraProjectionMatrix: Swizzable<CameraNode>;
export const cameraViewMatrix: Swizzable<CameraNode>;
export const cameraNormalMatrix: Swizzable<CameraNode>;
export const cameraWorldMatrix: Swizzable<CameraNode>;
export const cameraPosition: Swizzable<CameraNode>;
