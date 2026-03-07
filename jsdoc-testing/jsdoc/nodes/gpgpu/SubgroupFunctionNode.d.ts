export default SubgroupFunctionNode;
/**
 * Returns true if this invocation has the lowest subgroup_invocation_id
 * among active invocations in the subgroup.
 *
 * @tsl
 * @method
 * @return {bool} The result of the computation.
 */
export const subgroupElect: any;
/**
 * Returns a set of bitfields where the bit corresponding to subgroup_invocation_id
 * is 1 if pred is true for that active invocation and 0 otherwise.
 *
 * @tsl
 * @method
 * @param {bool} pred - A boolean that sets the bit corresponding to the invocations subgroup invocation id.
 * @return {vec4<u32>}- A bitfield corresponding to the pred value of each subgroup invocation.
 */
export const subgroupBallot: any;
/**
 * A reduction that adds e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The accumulated result of the reduction operation.
 */
export const subgroupAdd: any;
/**
 * An inclusive scan returning the sum of e for all active invocations with subgroup_invocation_id less than or equal to this invocation.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the inclusive scan by the current invocation.
 * @return {number} The accumulated result of the inclusive scan operation.
 */
export const subgroupInclusiveAdd: any;
/**
 * An exclusive scan that returns the sum of e for all active invocations with subgroup_invocation_id less than this invocation.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the exclusive scan by the current invocation.
 * @return {number} The accumulated result of the exclusive scan operation.
 */
export const subgroupExclusiveAdd: any;
/**
 * A reduction that multiplies e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The accumulated result of the reduction operation.
 */
export const subgroupMul: any;
/**
 * An inclusive scan returning the product of e for all active invocations with subgroup_invocation_id less than or equal to this invocation.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the inclusive scan by the current invocation.
 * @return {number} The accumulated result of the inclusive scan operation.
 */
export const subgroupInclusiveMul: any;
/**
 * An exclusive scan that returns the product of e for all active invocations with subgroup_invocation_id less than this invocation.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the exclusive scan by the current invocation.
 * @return {number} The accumulated result of the exclusive scan operation.
 */
export const subgroupExclusiveMul: any;
/**
 * A reduction that performs a bitwise and of e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The result of the reduction operation.
 */
export const subgroupAnd: any;
/**
 * A reduction that performs a bitwise or of e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The result of the reduction operation.
 */
export const subgroupOr: any;
/**
 * A reduction that performs a bitwise xor of e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The result of the reduction operation.
 */
export const subgroupXor: any;
/**
 * A reduction that performs a min of e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The result of the reduction operation.
 */
export const subgroupMin: any;
/**
 * A reduction that performs a max of e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The result of the reduction operation.
 */
export const subgroupMax: any;
/**
 * Returns true if e is true for all active invocations in the subgroup.
 *
 * @tsl
 * @method
 * @return {bool} The result of the computation.
 */
export const subgroupAll: any;
/**
 * Returns true if e is true for any active invocation in the subgroup
 *
 * @tsl
 * @method
 * @return {bool} The result of the computation.
 */
export const subgroupAny: any;
/**
 * Broadcasts e from the active invocation with the lowest subgroup_invocation_id in the subgroup to all other active invocations.
 *
 * @tsl
 * @method
 * @param {number} e - The value to broadcast from the lowest subgroup invocation.
 * @param {number} id - The subgroup invocation to broadcast from.
 * @return {number} The broadcast value.
 */
export const subgroupBroadcastFirst: any;
/**
 * Swaps e between invocations in the quad in the X direction.
 *
 * @tsl
 * @method
 * @param {number} e - The value to swap from the current invocation.
 * @return {number} The value received from the swap operation.
 */
export const quadSwapX: any;
/**
 * Swaps e between invocations in the quad in the Y direction.
 *
 * @tsl
 * @method
 * @param {number} e - The value to swap from the current invocation.
 * @return {number} The value received from the swap operation.
 */
export const quadSwapY: any;
/**
 * Swaps e between invocations in the quad diagonally.
 *
 * @tsl
 * @method
 * @param {number} e - The value to swap from the current invocation.
 * @return {number} The value received from the swap operation.
 */
export const quadSwapDiagonal: any;
/**
 * Broadcasts e from the invocation whose subgroup_invocation_id matches id, to all active invocations.
 *
 * @tsl
 * @method
 * @param {number} e - The value to broadcast from subgroup invocation 'id'.
 * @param {number} id - The subgroup invocation to broadcast from.
 * @return {number} The broadcast value.
 */
export const subgroupBroadcast: any;
/**
 * Returns v from the active invocation whose subgroup_invocation_id matches id
 *
 * @tsl
 * @method
 * @param {number} v - The value to return from subgroup invocation id^mask.
 * @param {number} id - The subgroup invocation which returns the value v.
 * @return {number} The broadcast value.
 */
export const subgroupShuffle: any;
/**
 * Returns v from the active invocation whose subgroup_invocation_id matches subgroup_invocation_id ^ mask.
 *
 * @tsl
 * @method
 * @param {number} v - The value to return from subgroup invocation id^mask.
 * @param {number} mask - A bitmask that determines the target invocation via a XOR operation.
 * @return {number} The broadcast value.
 */
export const subgroupShuffleXor: any;
/**
 * Returns v from the active invocation whose subgroup_invocation_id matches subgroup_invocation_id - delta
 *
 * @tsl
 * @method
 * @param {number} v - The value to return from subgroup invocation id^mask.
 * @param {number} delta - A value that offsets the current in.
 * @return {number} The broadcast value.
 */
export const subgroupShuffleUp: any;
/**
 * Returns v from the active invocation whose subgroup_invocation_id matches subgroup_invocation_id + delta
 *
 * @tsl
 * @method
 * @param {number} v - The value to return from subgroup invocation id^mask.
 * @param {number} delta - A value that offsets the current subgroup invocation.
 * @return {number} The broadcast value.
 */
export const subgroupShuffleDown: any;
/**
 * Broadcasts e from the quad invocation with id equal to id.
 *
 * @tsl
 * @method
 * @param {number} e - The value to broadcast.
 * @return {number} The broadcast value.
 */
export const quadBroadcast: any;
/**
 * This class represents a set of built in WGSL shader functions that sync
 * synchronously execute an operation across a subgroup, or 'warp', of compute
 * or fragment shader invocations within a workgroup. Typically, these functions
 * will synchronously execute an operation using data from all active invocations
 * within the subgroup, then broadcast that result to all active invocations. In
 * other graphics APIs, subgroup functions are also referred to as wave intrinsics
 * (DirectX/HLSL) or warp intrinsics (CUDA).
 *
 * @augments TempNode
 */
declare class SubgroupFunctionNode extends TempNode {
    /**
     * Constructs a new function node.
     *
     * @param {string} method - The subgroup/wave intrinsic method to construct.
     * @param {Node} [aNode=null] - The method's first argument.
     * @param {Node} [bNode=null] - The method's second argument.
     */
    constructor(method: string, aNode?: Node, bNode?: Node);
    /**
     * The subgroup/wave intrinsic method to construct.
     *
     * @type {string}
     */
    method: string;
    /**
     * The method's first argument.
     *
     * @type {Node}
     */
    aNode: Node;
    /**
     * The method's second argument.
     *
     * @type {Node}
     */
    bNode: Node;
    getInputType(builder: any): any;
    getNodeType(builder: any): any;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
declare namespace SubgroupFunctionNode {
    let SUBGROUP_ELECT: string;
    let SUBGROUP_BALLOT: string;
    let SUBGROUP_ADD: string;
    let SUBGROUP_INCLUSIVE_ADD: string;
    let SUBGROUP_EXCLUSIVE_AND: string;
    let SUBGROUP_MUL: string;
    let SUBGROUP_INCLUSIVE_MUL: string;
    let SUBGROUP_EXCLUSIVE_MUL: string;
    let SUBGROUP_AND: string;
    let SUBGROUP_OR: string;
    let SUBGROUP_XOR: string;
    let SUBGROUP_MIN: string;
    let SUBGROUP_MAX: string;
    let SUBGROUP_ALL: string;
    let SUBGROUP_ANY: string;
    let SUBGROUP_BROADCAST_FIRST: string;
    let QUAD_SWAP_X: string;
    let QUAD_SWAP_Y: string;
    let QUAD_SWAP_DIAGONAL: string;
    let SUBGROUP_BROADCAST: string;
    let SUBGROUP_SHUFFLE: string;
    let SUBGROUP_SHUFFLE_XOR: string;
    let SUBGROUP_SHUFFLE_UP: string;
    let SUBGROUP_SHUFFLE_DOWN: string;
    let QUAD_BROADCAST: string;
}
import TempNode from '../core/TempNode.js';
