export default BufferAttributeNode;
export function bufferAttribute(array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number): BufferAttributeNode;
export function dynamicBufferAttribute(array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number): BufferAttributeNode;
export function instancedBufferAttribute(array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number): BufferAttributeNode;
export function instancedDynamicBufferAttribute(array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number): BufferAttributeNode;
/**
 * In earlier `three.js` versions it was only possible to define attribute data
 * on geometry level. With `BufferAttributeNode`, it is also possible to do this
 * on the node level.
 * ```js
 * const geometry = new THREE.PlaneGeometry();
 * const positionAttribute = geometry.getAttribute( 'position' );
 *
 * const colors = [];
 * for ( let i = 0; i < position.count; i ++ ) {
 * 	colors.push( 1, 0, 0 );
 * }
 *
 * material.colorNode = bufferAttribute( new THREE.Float32BufferAttribute( colors, 3 ) );
 * ```
 * This new approach is especially interesting when geometry data are generated via
 * compute shaders. The below line converts a storage buffer into an attribute node.
 * ```js
 * material.positionNode = positionBuffer.toAttribute();
 * ```
 * @augments InputNode
 */
declare class BufferAttributeNode extends InputNode {
    /**
     * Constructs a new buffer attribute node.
     *
     * @param {BufferAttribute|InterleavedBuffer|TypedArray} value - The attribute data.
     * @param {?string} [bufferType=null] - The buffer type (e.g. `'vec3'`).
     * @param {number} [bufferStride=0] - The buffer stride.
     * @param {number} [bufferOffset=0] - The buffer offset.
     */
    constructor(value: BufferAttribute | InterleavedBuffer | TypedArray, bufferType?: string | null, bufferStride?: number, bufferOffset?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBufferNode: boolean;
    /**
     * The buffer type (e.g. `'vec3'`).
     *
     * @type {?string}
     * @default null
     */
    bufferType: string | null;
    /**
     * The buffer stride.
     *
     * @type {number}
     * @default 0
     */
    bufferStride: number;
    /**
     * The buffer offset.
     *
     * @type {number}
     * @default 0
     */
    bufferOffset: number;
    /**
     * The usage property. Set this to `THREE.DynamicDrawUsage` via `.setUsage()`,
     * if you are planning to update the attribute data per frame.
     *
     * @type {number}
     * @default StaticDrawUsage
     */
    usage: number;
    /**
     * Whether the attribute is instanced or not.
     *
     * @type {boolean}
     * @default false
     */
    instanced: boolean;
    /**
     * A reference to the buffer attribute.
     *
     * @type {?BufferAttribute}
     * @default null
     */
    attribute: BufferAttribute | null;
    /**
     * This method is overwritten since the attribute data might be shared
     * and thus the hash should be shared as well.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The hash.
     */
    getHash(builder: NodeBuilder): string;
    /**
     * This method is overwritten since the node type is inferred from
     * the buffer attribute.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    getNodeType(builder: NodeBuilder): string;
    /**
     * Depending on which value was passed to the node, `setup()` behaves
     * differently. If no instance of `BufferAttribute` was passed, the method
     * creates an internal attribute and configures it respectively.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setup(builder: NodeBuilder): void;
    /**
     * Generates the code snippet of the buffer attribute node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated code snippet.
     */
    generate(builder: NodeBuilder): string;
    name: any;
    /**
     * Overwrites the default implementation to return a fixed value `'bufferAttribute'`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(): string;
    /**
     * Sets the `usage` property to the given value.
     *
     * @param {number} value - The usage to set.
     * @return {BufferAttributeNode} A reference to this node.
     */
    setUsage(value: number): BufferAttributeNode;
    /**
     * Sets the `instanced` property to the given value.
     *
     * @param {boolean} value - The value to set.
     * @return {BufferAttributeNode} A reference to this node.
     */
    setInstanced(value: boolean): BufferAttributeNode;
}
import { InterleavedBuffer } from '../../core/InterleavedBuffer.js';
import InputNode from '../core/InputNode.js';
