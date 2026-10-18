export default GLSLNodeParser;
/**
 * A GLSL node parser.
 *
 * @augments NodeParser
 */
declare class GLSLNodeParser extends NodeParser {
    /**
     * The method parses the given GLSL code an returns a node function.
     *
     * @param {string} source - The GLSL code.
     * @return {GLSLNodeFunction} A node function.
     */
    parseFunction(source: string): GLSLNodeFunction;
}
import NodeParser from '../core/NodeParser.js';
import GLSLNodeFunction from './GLSLNodeFunction.js';
