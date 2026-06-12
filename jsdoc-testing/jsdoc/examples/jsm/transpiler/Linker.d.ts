export default Linker;
declare class Linker {
    block: any;
    addBlock(node: any): void;
    removeBlock(node: any): void;
    processVariables(node: any): void;
    processUniform(node: any): void;
    processVarying(node: any): void;
    evalProperty(node: any): string;
    processExpression(node: any): void;
    processBody(body: any): void;
    processConditional(node: any): void;
    processForWhile(node: any): void;
    processSwitch(switchNode: any): void;
    processFunction(node: any): void;
    process(ast: any): void;
}
