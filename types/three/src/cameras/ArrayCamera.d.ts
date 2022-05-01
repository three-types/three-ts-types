import { PerspectiveCamera } from './PerspectiveCamera';

export class ArrayCamera extends PerspectiveCamera {
    constructor(cameras?: PerspectiveCamera[]);

    /**
     * @default []
     */
    cameras: PerspectiveCamera[];
    readonly isArrayCamera: true;
}

export interface ArrayCameraConstructor {
    new (cameras?: PerspectiveCamera[]): ArrayCamera;
    prototype: ArrayCamera;
}
