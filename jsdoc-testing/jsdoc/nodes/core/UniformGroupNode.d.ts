export default UniformGroupNode;
export function uniformGroup(name: string): UniformGroupNode;
export function sharedUniformGroup(name: string, order?: number): UniformGroupNode;
/**
 * TSL object that represents a shared uniform group node which is updated once per frame.
 *
 * @tsl
 * @type {UniformGroupNode}
 */
export const frameGroup: UniformGroupNode;
/**
 * TSL object that represents a shared uniform group node which is updated once per render.
 *
 * @tsl
 * @type {UniformGroupNode}
 */
export const renderGroup: UniformGroupNode;
/**
 * TSL object that represents a uniform group node which is updated once per object.
 *
 * @tsl
 * @type {UniformGroupNode}
 */
export const objectGroup: UniformGroupNode;
/**
 * This node can be used to group single instances of {@link UniformNode}
 * and manage them as a uniform buffer.
 *
 * In most cases, the predefined nodes `objectGroup`, `renderGroup` and `frameGroup`
 * will be used when defining the {@link UniformNode#groupNode} property.
 *
 * - `objectGroup`: Uniform buffer per object.
 * - `renderGroup`: Shared uniform buffer, updated once per render call.
 * - `frameGroup`: Shared uniform buffer, updated once per frame.
 *
 * @augments Node
 */
declare class UniformGroupNode extends Node {
    /**
     * Constructs a new uniform group node.
     *
     * @param {string} name - The name of the uniform group node.
     * @param {boolean} [shared=false] - Whether this uniform group node is shared or not.
     * @param {number} [order=1] - Influences the internal sorting.
     */
    constructor(name: string, shared?: boolean, order?: number);
    /**
     * The name of the uniform group node.
     *
     * @type {string}
     */
    name: string;
    /**
     * Whether this uniform group node is shared or not.
     *
     * @type {boolean}
     * @default false
     */
    shared: boolean;
    /**
     * Influences the internal sorting.
     * TODO: Add details when this property should be changed.
     *
     * @type {number}
     * @default 1
     */
    order: number;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isUniformGroup: boolean;
    serialize(data: any): void;
    deserialize(data: any): void;
}
import Node from './Node.js';
