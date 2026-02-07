export default EventNode;
export function OnObjectUpdate(callback: Function): EventNode;
export function OnMaterialUpdate(callback: Function): EventNode;
export function OnBeforeObjectUpdate(callback: Function): EventNode;
export function OnBeforeMaterialUpdate(callback: Function): EventNode;
/**
 * EventNode is a node that executes a callback during specific update phases.
 *
 * @augments Node
 */
declare class EventNode extends Node {
    /**
     * Creates an EventNode.
     *
     * @param {string} eventType - The type of event
     * @param {Function} callback - The callback to execute on update.
     */
    constructor(eventType: string, callback: Function);
    eventType: string;
    callback: Function;
    update(frame: any): void;
    updateBefore(frame: any): void;
}
declare namespace EventNode {
    let OBJECT: string;
    let MATERIAL: string;
    let BEFORE_OBJECT: string;
    let BEFORE_MATERIAL: string;
}
import Node from '../core/Node.js';
