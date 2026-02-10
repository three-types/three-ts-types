export default FunctionNode;
export function glslFn(code: any, includes: any): {
    (...params: any[]): any;
    functionNode: FunctionNode;
};
export function wgslFn(code: any, includes: any): {
    (...params: any[]): any;
    functionNode: FunctionNode;
};
/**
 * This class represents a native shader function. It can be used to implement
 * certain aspects of a node material with native shader code. There are two predefined
 * TSL functions for easier usage.
 *
 * - `wgslFn`: Creates a WGSL function node.
 * - `glslFn`: Creates a GLSL function node.
 *
 * A basic example with one include looks like so:
 *
 * ```js
 * const desaturateWGSLFn = wgslFn( `
 *	fn desaturate( color:vec3<f32> ) -> vec3<f32> {
 *		let lum = vec3<f32>( 0.299, 0.587, 0.114 );
 *		return vec3<f32>( dot( lum, color ) );
 *	}`
 *);
 * const someWGSLFn = wgslFn( `
 *	fn someFn( color:vec3<f32> ) -> vec3<f32> {
 * 		return desaturate( color );
 * 	}
 * `, [ desaturateWGSLFn ] );
 * material.colorNode = someWGSLFn( { color: texture( map ) } );
 *```
 * @augments CodeNode
 */
declare class FunctionNode extends CodeNode {
    /**
     * Constructs a new function node.
     *
     * @param {string} [code=''] - The native code.
     * @param {Array<Node>} [includes=[]] - An array of includes.
     * @param {('js'|'wgsl'|'glsl')} [language=''] - The used language.
     */
    constructor(code?: string, includes?: Array<Node>, language?: ("js" | "wgsl" | "glsl"));
    /**
     * Returns the type of a member of this function node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} name - The name of the member.
     * @return {string} The type of the member.
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    /**
     * Returns the inputs of this function node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Array<NodeFunctionInput>} The inputs.
     */
    getInputs(builder: NodeBuilder): Array<NodeFunctionInput>;
    /**
     * Returns the node function for this function node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {NodeFunction} The node function.
     */
    getNodeFunction(builder: NodeBuilder): NodeFunction;
    generate(builder: any, output: any): any;
}
import CodeNode from './CodeNode.js';
