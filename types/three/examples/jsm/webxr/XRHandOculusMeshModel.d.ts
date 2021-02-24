import { Group, Object3D } from './../../../src/Three';

import { HandModelOptions, XRHandModel } from './XRHandModelFactory';

export class XRHandOculusMeshModel {
    controller: Group;
    handModel: XRHandModel;
    bones: Object3D[];

    constructor(handModel: XRHandModel, controller: Group, path: string, handedness: any, options: HandModelOptions);

    updateMesh: () => void;
}
