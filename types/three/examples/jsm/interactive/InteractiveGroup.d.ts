import { WebGLRenderer, Camera, Group } from 'three';

export class InteractiveGroup extends Group {
    constructor(renderer: WebGLRenderer, camera: Camera);
}

export interface InteractiveGroupConstructor {
    new (renderer: WebGLRenderer, camera: Camera): InteractiveGroup;
    prototype: InteractiveGroup;
}
