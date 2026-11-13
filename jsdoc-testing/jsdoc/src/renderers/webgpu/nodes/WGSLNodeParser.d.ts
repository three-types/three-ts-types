export default WGSLNodeParser;
/**
 * A WGSL node parser.
 *
 * @augments NodeParser
 */
declare class WGSLNodeParser extends NodeParser {
    /**
     * The method parses the given WGSL code an returns a node function.
     *
     * @param {string} source - The WGSL code.
     * @return {WGSLNodeFunction} A node function.
     */
    parseFunction(source: string): WGSLNodeFunction;
}
import NodeParser from '../../../nodes/core/NodeParser.js';
import WGSLNodeFunction from './WGSLNodeFunction.js';
