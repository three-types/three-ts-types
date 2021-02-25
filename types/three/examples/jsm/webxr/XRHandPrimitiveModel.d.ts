import { Group, Texture } from '../../../src/Three';

import { XRHandModel } from './XRHandModelFactory';

export interface XRHandPrimitiveModelOptions {
    primitive?: 'sphere' | 'box';
}

export class XRHandPrimitiveModel {
    controller: Group;
    handModel: XRHandModel;
    envMap: Texture | null;
    handMesh: Group;

    constructor(
        handModel: XRHandModel,
        controller: Group,
        path: string,
        handedness: 'left' | 'right',
        options: XRHandPrimitiveModelOptions,
    );

    updateMesh: () => void;
}
