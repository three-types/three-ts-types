import { Program, Statement } from "./AST.js";

export default class TSLEncoder {
    constructor();

    tab: string;
    imports: Set<string>;
    global: Set<string>;
    overloadings: Map<string, string>;
    iife: boolean;
    uniqueNames: boolean;
    reference: boolean;

    addImport(name: string): void;
    emitUniform(node: Statement): string;
    emitExpression(node: Statement): string;
    emitBody(body: Statement): string;
    emitTernary(node: Statement): string;
    emitConditional(node: Statement): string;
    emitLoop(node: Statement): string;
    emitFor(node: Statement): string;
    emitForWhile(node: Statement): string;
    emitVariables(node: Statement, isRoot?: boolean): string;
    emitVarying(node: Statement): string;
    emitOverloadingFunction(nodes: Statement): string;
    emitFunction(node: Statement): string;
    setLastStatement(statement: Statement): void;
    emitExtraLine(statement: Statement): string;
    emit(ast: Program): string;
}
