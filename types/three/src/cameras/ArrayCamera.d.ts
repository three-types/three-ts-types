import { PerspectiveCamera } from './PerspectiveCamera.js';

export class ArrayCamera extends PerspectiveCamera {
    constructor(cameras?: PerspectiveCamera[]);

    /**
     * @default []
     */
    cameras: PerspectiveCamera[];
    readonly isArrayCamera: true;
}
