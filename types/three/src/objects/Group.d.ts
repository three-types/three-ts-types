import { Object3D, Object3DEventMap } from './../core/Object3D';

export class Group<TEventMap extends Object3DEventMap = Object3DEventMap> extends Object3D<TEventMap> {
    constructor();
    type: 'Group';
    readonly isGroup: true;
}
