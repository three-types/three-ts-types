/**
 * An instanced version of a geometry.
 */
export class InstancedBufferGeometry extends BufferGeometry {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isInstancedBufferGeometry: boolean;
    /**
     * The instance count.
     *
     * @type {number}
     * @default Infinity
     */
    instanceCount: number;
    copy(source: any): this;
}
import { BufferGeometry } from './BufferGeometry.js';
