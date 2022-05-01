import { Scene } from '../../../src/Three';

export class RoomEnvironment extends Scene {
    constructor();
}

export interface RoomEnvironmentConstructor {
    new (): RoomEnvironment;
    prototype: RoomEnvironment;
}
