export default TSLEncoder;
declare class TSLEncoder {
    tab: string;
    imports: Set<any>;
    global: Set<any>;
    overloadings: Map<any, any>;
    iife: boolean;
    reference: boolean;
    block: any;
    addImport(name: any): void;
    emitUniform(node: any): string;
    emitExpression(node: any, output?: null): any;
    emitBody(body: any): string;
    emitTernary(node: any): string;
    emitConditional(node: any): any;
    emitLoop(node: any): any;
    emitSwitch(switchNode: any): any;
    emitFor(node: any): any;
    emitForWhile(node: any): any;
    emitWhile(node: any): any;
    emitVariables(node: any, isRoot?: boolean): string;
    emitVarying(node: any): string;
    emitStructDefinition(node: any): string;
    emitOverloadingFunction(nodes: any): string;
    emitFunction(node: any): string;
    emitComment(statement: any, body: any): string;
    emitExtraLine(statement: any, body: any): "" | "\n";
    emit(ast: any): string;
}
