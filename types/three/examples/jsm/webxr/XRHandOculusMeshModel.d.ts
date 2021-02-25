import { Group, Object3D } from './../../../src/Three';

import { HandModelOptions, XRHandModel } from './XRHandModelFactory';

export class XRHandOculusMeshModel {
    controller: Group;
    handModel: XRHandModel;
    bones: Array<Object3D | null>;

    constructor(handModel: XRHandModel, controller: Group, path: string, handedness: any, options: HandModelOptions);

    updateMesh: () => void;
}
