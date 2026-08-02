export default WGSLEncoder;
declare class WGSLEncoder {
    tab: string;
    functions: Map<any, any>;
    uniforms: any[];
    varyings: any[];
    structs: Map<any, any>;
    polyfills: Map<any, any>;
    groupIndex: number;
    getWgslType(type: any): any;
    emitExpression(node: any): any;
    emitTextureAccess(node: any): any;
    emitBody(body: any): string;
    emitConditional(node: any): any;
    emitFor(node: any): string;
    emitWhile(node: any): string;
    emitSwitch(node: any): any;
    emitVariables(node: any): string;
    emitStructDefinition(node: any): string;
    emitFunction(node: any): string;
    emitComment(statement: any, body: any): string;
    emitExtraLine(statement: any, body: any): "" | "\n";
    emit(ast: any): string;
}
