import { BufferGeometry } from './BufferGeometry';
import { BufferAttribute } from './BufferAttribute';

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/InstancedBufferAttribute.js|src/core/InstancedBufferAttribute.js}
 */
export class InstancedBufferAttribute extends BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number, normalized?: boolean, meshPerAttribute?: number);

    /**
     * @default 1
     */
    meshPerAttribute: number;
}
