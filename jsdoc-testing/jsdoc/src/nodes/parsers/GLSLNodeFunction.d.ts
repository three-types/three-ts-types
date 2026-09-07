export default GLSLNodeFunction;
/**
 * This class represents a GLSL node function.
 *
 * @augments NodeFunction
 */
declare class GLSLNodeFunction extends NodeFunction {
    /**
     * Constructs a new GLSL node function.
     *
     * @param {string} source - The GLSL source.
     */
    constructor(source: string);
    inputsCode: any;
    blockCode: any;
    headerCode: any;
    /**
     * This method returns the GLSL code of the node function.
     *
     * @param {string} [name=this.name] - The function's name.
     * @return {string} The shader code.
     */
    getCode(name?: string): string;
}
import NodeFunction from '../core/NodeFunction.js';
