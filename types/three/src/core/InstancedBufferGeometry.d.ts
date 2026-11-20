import { BufferGeometry } from "./BufferGeometry.js";

/**
 * An instanced version of a geometry.
 */
export class InstancedBufferGeometry extends BufferGeometry {
    /**
     * Create a new instance of {@link InstancedBufferGeometry}
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isInstancedBufferGeometry: true;
    /**
     * The instance count.
     *
     * @default Infinity
     */
    instanceCount: number;
    copy(source: InstancedBufferGeometry): this;
}
