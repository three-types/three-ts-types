import { Object3D } from './../core/Object3D.js';

// Objects //////////////////////////////////////////////////////////////////////////////////

export class Bone extends Object3D {
    constructor();
    readonly isBone: true;
    type: 'Bone';
}
