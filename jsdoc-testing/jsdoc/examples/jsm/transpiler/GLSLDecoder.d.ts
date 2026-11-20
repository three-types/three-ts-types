export default GLSLDecoder;
declare class GLSLDecoder {
    index: number;
    tokenizer: Tokenizer | null;
    keywords: any[];
    structTypes: Map<any, any>;
    addPolyfill(name: any, polyfill: any): this;
    get tokens(): any[];
    readToken(): any;
    getTokenPosition(token: any): string;
    getToken(offset?: number): any;
    getTokensUntil(str: any, tokens: any, offset?: number): any[];
    readTokensUntil(str: any): any[];
    parseExpressionFromTokens(tokens: any): any;
    parseAccessorElementsFromTokens(tokens: any): any;
    parseFunctionParametersFromTokens(tokens: any): any;
    parseExpression(): any;
    parseFunctionParams(tokens: any): FunctionParameter[];
    parseFunction(): any;
    parseVariablesFromToken(tokens: any, type: any): any;
    parseVariables(): any;
    parseUniform(): Uniform;
    parseVarying(): Varying;
    parseStructDefinition(): StructDefinition;
    parseReturn(): Return;
    parseWhile(): any;
    parseDoWhile(): any;
    parseFor(): any;
    parseSwitch(): any;
    parseSwitchCases(): any;
    parseIf(): any;
    parseBlock(): any;
    evaluateCondition(expr: any, macros: any): boolean;
    extractMacroArgs(str: any): string[];
    expandMacros(line: any, macros: any): any;
    preprocess(source: any): string;
    parse(source: any): Program;
}
declare class Tokenizer {
    constructor(source: any);
    source: any;
    position: number;
    tokens: any[];
    tokenize(): this;
    skip(...params: any[]): any;
    nextToken(): Token | undefined;
    readToken(): Token | undefined;
}
import { FunctionParameter } from './AST.js';
import { Uniform } from './AST.js';
import { Varying } from './AST.js';
import { StructDefinition } from './AST.js';
import { Return } from './AST.js';
import { Program } from './AST.js';
declare class Token {
    constructor(tokenizer: any, type: any, str: any, pos: any);
    tokenizer: any;
    type: any;
    str: any;
    pos: any;
    isTag: boolean;
    tags: any;
    get endPos(): any;
    get isNumber(): boolean;
    get isString(): boolean;
    get isLiteral(): boolean;
    get isOperator(): boolean;
}
declare namespace Token {
    let LINE: string;
    let COMMENT: string;
    let NUMBER: string;
    let STRING: string;
    let LITERAL: string;
    let OPERATOR: string;
}
