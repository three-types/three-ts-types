export default NodeFunctionInput;
/**
 * Describes the input of a {@link NodeFunction}.
 */
declare class NodeFunctionInput {
    /**
     * Constructs a new node function input.
     *
     * @param {string} type - The input type.
     * @param {string} name - The input name.
     * @param {?number} [count=null] - If the input is an Array, count will be the length.
     * @param {('in'|'out'|'inout')} [qualifier=''] - The parameter qualifier (only relevant for GLSL).
     * @param {boolean} [isConst=false] - Whether the input uses a const qualifier or not (only relevant for GLSL).
     */
    constructor(type: string, name: string, count?: number | null, qualifier?: ("in" | "out" | "inout"), isConst?: boolean);
    /**
     *  The input type.
     *
     * @type {string}
     */
    type: string;
    /**
     * The input name.
     *
     * @type {string}
     */
    name: string;
    /**
     * If the input is an Array, count will be the length.
     *
     * @type {?number}
     * @default null
     */
    count: number | null;
    /**
     *The parameter qualifier (only relevant for GLSL).
     *
     * @type {('in'|'out'|'inout')}
     * @default ''
     */
    qualifier: ("in" | "out" | "inout");
    /**
     * Whether the input uses a const qualifier or not (only relevant for GLSL).
     *
     * @type {boolean}
     * @default false
     */
    isConst: boolean;
}
declare namespace NodeFunctionInput {
    let isNodeFunctionInput: boolean;
}
