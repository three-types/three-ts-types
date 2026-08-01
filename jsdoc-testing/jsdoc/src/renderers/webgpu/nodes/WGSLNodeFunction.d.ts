export default WGSLNodeFunction;
/**
 * This class represents a WSL node function.
 *
 * @augments NodeFunction
 */
declare class WGSLNodeFunction extends NodeFunction {
    /**
     * Constructs a new WGSL node function.
     *
     * @param {string} source - The WGSL source.
     */
    constructor(source: string);
    inputsCode: any;
    blockCode: any;
    outputType: any;
    /**
     * This method returns the WGSL code of the node function.
     *
     * @param {string} [name=this.name] - The function's name.
     * @return {string} The shader code.
     */
    getCode(name?: string): string;
}
import NodeFunction from '../../../nodes/core/NodeFunction.js';
