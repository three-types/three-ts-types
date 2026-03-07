export default ComputeBuiltinNode;
/**
 * Represents the number of workgroups dispatched by the compute shader.
 * ```js
 * // Run 512 invocations/threads with a workgroup size of 128.
 * const computeFn = Fn(() => {
 *
 *     // numWorkgroups.x = 4
 *     storageBuffer.element(0).assign(numWorkgroups.x)
 *
 * })().compute(512, [128]);
 *
 * // Run 512 invocations/threads with the default workgroup size of 64.
 * const computeFn = Fn(() => {
 *
 *     // numWorkgroups.x = 8
 *     storageBuffer.element(0).assign(numWorkgroups.x)
 *
 * })().compute(512);
 * ```
 *
 * @tsl
 * @type {ComputeBuiltinNode<uvec3>}
 */
export const numWorkgroups: ComputeBuiltinNode<uvec3>;
/**
 * Represents the 3-dimensional index of the workgroup the current compute invocation belongs to.
 * ```js
 * // Execute 12 compute threads with a workgroup size of 3.
 * const computeFn = Fn( () => {
 *
 * 	If( workgroupId.x.mod( 2 ).equal( 0 ), () => {
 *
 * 		storageBuffer.element( instanceIndex ).assign( instanceIndex );
 *
 * 	} ).Else( () => {
 *
 * 		storageBuffer.element( instanceIndex ).assign( 0 );
 *
 * 	} );
 *
 * } )().compute( 12, [ 3 ] );
 *
 * // workgroupId.x =  [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3];
 * // Buffer Output =  [0, 1, 2, 0, 0, 0, 6, 7, 8, 0, 0, 0];
 * ```
 *
 * @tsl
 * @type {ComputeBuiltinNode<uvec3>}
 */
export const workgroupId: ComputeBuiltinNode<uvec3>;
/**
 * A non-linearized 3-dimensional representation of the current invocation's position within a 3D global grid.
 *
 * @tsl
 * @type {ComputeBuiltinNode<uvec3>}
 */
export const globalId: ComputeBuiltinNode<uvec3>;
/**
 * A non-linearized 3-dimensional representation of the current invocation's position within a 3D workgroup grid.
 *
 * @tsl
 * @type {ComputeBuiltinNode<uvec3>}
 */
export const localId: ComputeBuiltinNode<uvec3>;
/**
 * A device dependent variable that exposes the size of the current invocation's subgroup.
 *
 * @tsl
 * @type {ComputeBuiltinNode<uint>}
 */
export const subgroupSize: ComputeBuiltinNode<uint>;
/**
 * `ComputeBuiltinNode` represents a compute-scope builtin value that expose information
 * about the currently running dispatch and/or the device it is running on.
 *
 * This node can only be used with a WebGPU backend.
 *
 * @augments Node
 */
declare class ComputeBuiltinNode extends Node {
    /**
     * Constructs a new compute builtin node.
     *
     * @param {string} builtinName - The built-in name.
     * @param {string} nodeType - The node type.
     */
    constructor(builtinName: string, nodeType: string);
    /**
     * The built-in name.
     *
     * @private
     * @type {string}
     */
    private _builtinName;
    /**
     * This method is overwritten since hash is derived from the built-in name.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The hash.
     */
    getHash(builder: NodeBuilder): string;
    /**
     * This method is overwritten since the node type is simply derived from `nodeType`..
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    getNodeType(): string;
    /**
     * Sets the builtin name.
     *
     * @param {string} builtinName - The built-in name.
     * @return {ComputeBuiltinNode} A reference to this node.
     */
    setBuiltinName(builtinName: string): ComputeBuiltinNode;
    /**
     * Returns the builtin name.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The builtin name.
     */
    getBuiltinName(): string;
    /**
     * Whether the current node builder has the builtin or not.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {boolean} Whether the builder has the builtin or not.
     */
    hasBuiltin(builder: NodeBuilder): boolean;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
import Node from '../core/Node.js';
