export default ConstNode;
/**
 * Class for representing a constant value in the shader.
 *
 * @augments InputNode
 */
declare class ConstNode extends InputNode {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isConstNode: boolean;
    /**
     * Generates the shader string of the value with the current node builder.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated value as a shader string.
     */
    generateConst(builder: NodeBuilder): string;
    generate(builder: any, output: any): any;
}
import InputNode from './InputNode.js';
