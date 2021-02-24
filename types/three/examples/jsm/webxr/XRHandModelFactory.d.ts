import { Group, Object3D } from '../../../src/Three';

import { XRHandPrimitiveModel } from './XRHandPrimitiveModel';
import { XRHandOculusMeshModel } from './XRHandOculusMeshModel';

export class XRHandModel extends Object3D {
    constructor();

    motionController: XRHandPrimitiveModel | XRHandOculusMeshModel;
}

export interface HandModelOptions {
    model?: 'lowpoly';
    primitive?: 'sphere' | 'box';
}

export class XRHandModelFactory {
    constructor();
    path: string;

    setPath(path: string): XRHandModelFactory;

    createHandModel(
        controller: Group,
        profile?: 'spheres' | 'boxes' | 'oculus',
        options?: HandModelOptions,
    ): XRHandModel;
}
