export default CodeNode;
/**
 * TSL function for creating a code node.
 *
 * @tsl
 * @function
 * @param {string} [code] - The native code.
 * @param {?Array<Node>} [includes=[]] - An array of includes.
 * @param {?('js'|'wgsl'|'glsl')} [language=''] - The used language.
 * @returns {CodeNode}
 */
export const code: any;
export function js(src: string, includes: Array<Node>): CodeNode;
export function wgsl(src: string, includes: Array<Node>): CodeNode;
export function glsl(src: string, includes: Array<Node>): CodeNode;
/**
 * This class represents native code sections. It is the base
 * class for modules like {@link FunctionNode} which allows to implement
 * functions with native shader languages.
 *
 * @augments Node
 */
declare class CodeNode extends Node {
    /**
     * Constructs a new code node.
     *
     * @param {string} [code=''] - The native code.
     * @param {Array<Node>} [includes=[]] - An array of includes.
     * @param {('js'|'wgsl'|'glsl')} [language=''] - The used language.
     */
    constructor(code?: string, includes?: Array<Node>, language?: ("js" | "wgsl" | "glsl"));
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCodeNode: boolean;
    /**
     * The native code.
     *
     * @type {string}
     * @default ''
     */
    code: string;
    /**
     * An array of includes
     *
     * @type {Array<Node>}
     * @default []
     */
    includes: Array<Node>;
    /**
     * The used language.
     *
     * @type {('js'|'wgsl'|'glsl')}
     * @default ''
     */
    language: ("js" | "wgsl" | "glsl");
    /**
     * Sets the includes of this code node.
     *
     * @param {Array<Node>} includes - The includes to set.
     * @return {CodeNode} A reference to this node.
     */
    setIncludes(includes: Array<Node>): CodeNode;
    /**
     * Returns the includes of this code node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Array<Node>} The includes.
     */
    getIncludes(): Array<Node>;
    generate(builder: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
import Node from '../core/Node.js';
