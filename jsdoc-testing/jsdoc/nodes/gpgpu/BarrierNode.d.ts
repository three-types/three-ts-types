export default BarrierNode;
export function workgroupBarrier(): BarrierNode;
export function storageBarrier(): BarrierNode;
export function textureBarrier(): BarrierNode;
/**
 * Represents a GPU control barrier that synchronizes compute operations within a given scope.
 *
 * This node can only be used with a WebGPU backend.
 *
 * @augments Node
 */
declare class BarrierNode extends Node {
    /**
     * Constructs a new barrier node.
     *
     * @param {string} scope - The scope defines the behavior of the node.
     */
    constructor(scope: string);
    scope: string;
    generate(builder: any): void;
}
import Node from '../core/Node.js';
