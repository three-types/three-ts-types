import { Object3D } from '../../../src/Three';

export class Gyroscope extends Object3D {
    constructor();
}

export interface GyroscopeConstructor {
    new (): Gyroscope;
    prototype: Gyroscope;
}
