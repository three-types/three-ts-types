export default StructTypeNode;
/**
 * Represents a struct type node in the node-based system.
 * This class is used to define and manage the layout and types of struct members.
 * It extends the base Node class and provides methods to get the length of the struct,
 * retrieve member types, and generate the struct type for a builder.
 *
 * @augments Node
 */
declare class StructTypeNode extends Node {
    /**
     * Creates an instance of StructTypeNode.
     *
     * @param {Object} membersLayout - The layout of the members for the struct.
     * @param {?string} [name=null] - The optional name of the struct.
     */
    constructor(membersLayout: Object, name?: string | null);
    /**
     * The layout of the members for the struct
     *
     * @type {Array.<{name: string, type: string, atomic: boolean}>}
     */
    membersLayout: Array<{
        name: string;
        type: string;
        atomic: boolean;
    }>;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStructLayoutNode: boolean;
    /**
     * Returns the length of the struct.
     * The length is calculated by summing the lengths of the struct's members.
     *
     * @returns {number} The length of the struct.
     */
    getLength(): number;
    getMemberType(builder: any, name: any): string;
    getNodeType(builder: any): any;
    setup(builder: any): void;
    generate(builder: any): any;
}
import Node from './Node.js';
