export default Transpiler;
/**
 * A class that transpiles shader code from one language into another.
 *
 * `Transpiler` can only be used to convert GLSL into TSL right now. It is intended
 * to support developers when they want to migrate their custom materials from the
 * current to the new node-based material system.
 *
 * @three_import import Transpiler from 'three/addons/transpiler/Transpiler.js';
 */
declare class Transpiler {
    /**
     * Constructs a new transpiler.
     *
     * @param {GLSLDecoder} decoder - The GLSL decoder.
     * @param {TSLEncoder} encoder - The TSL encoder.
     */
    constructor(decoder: GLSLDecoder, encoder: TSLEncoder);
    /**
     * The GLSL decoder. This component parse GLSL and produces
     * a language-independent AST for further processing.
     *
     * @type {GLSLDecoder}
     */
    decoder: GLSLDecoder;
    /**
     * The TSL encoder. It takes the AST and emits TSL code.
     *
     * @type {TSLEncoder}
     */
    encoder: TSLEncoder;
    /**
     * The linker. It processes the AST and resolves
     * variable and function references, ensuring that all
     * dependencies are properly linked.
     *
     * @type {Linker}
     */
    linker: Linker;
    /**
     * Parses the given GLSL source and returns TSL syntax.
     *
     * @param {string} source - The GLSL source.
     * @return {string} The TSL code.
     */
    parse(source: string): string;
}
import Linker from './Linker.js';
