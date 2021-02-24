import { Group, Texture } from '../../../src/Three';

import { HandModelOptions, XRHandModel } from './XRHandModelFactory';

export class XRHandPrimitiveModel {
    controller: Group;
    handModel: XRHandModel;
    envMap: Texture | null;
    handMesh: Group;

    constructor(handModel: XRHandModel, controller: Group, path: string, handedness: any, options: HandModelOptions);

    updateMesh: () => void;
}
