export class ASTNode {
    isASTNode: boolean;
    linker: {
        reference: null;
        accesses: never[];
        assignments: never[];
    };
    parent: any;
    get isNumericExpression(): boolean;
    get hasAssignment(): any;
    getType(): any;
    getProgram(): this | null;
    getParent(parents?: any[]): any;
    initialize(): void;
}
export class Comment extends ASTNode {
    constructor(comment: any);
    comment: any;
    isComment: boolean;
}
export class Program extends ASTNode {
    constructor(body?: any[]);
    body: any[];
    structTypes: Map<any, any>;
    isProgram: boolean;
}
export class VariableDeclaration extends ASTNode {
    constructor(type: any, name: any, value?: null, next?: null, immutable?: boolean);
    type: any;
    name: any;
    value: any;
    next: any;
    immutable: boolean;
    isVariableDeclaration: boolean;
    get isAssignment(): boolean;
}
export class Uniform extends ASTNode {
    constructor(type: any, name: any);
    type: any;
    name: any;
    isUniform: boolean;
}
export class Varying extends ASTNode {
    constructor(type: any, name: any);
    type: any;
    name: any;
    isVarying: boolean;
}
export class FunctionParameter extends ASTNode {
    constructor(type: any, name: any, qualifier?: null, immutable?: boolean);
    type: any;
    name: any;
    qualifier: any;
    immutable: boolean;
    isFunctionParameter: boolean;
}
export class FunctionDeclaration extends ASTNode {
    constructor(type: any, name: any, params?: any[], body?: any[]);
    type: any;
    name: any;
    params: any[];
    body: any[];
    isFunctionDeclaration: boolean;
}
export class Expression extends ASTNode {
    constructor(expression: any);
    expression: any;
    isExpression: boolean;
}
export class Ternary extends ASTNode {
    constructor(cond: any, left: any, right: any);
    cond: any;
    left: any;
    right: any;
    isTernary: boolean;
}
export class Operator extends ASTNode {
    constructor(type: any, left: any, right: any);
    type: any;
    left: any;
    right: any;
    isOperator: boolean;
    get isAssignment(): boolean;
}
export class Unary extends ASTNode {
    constructor(type: any, expression: any, after?: boolean);
    type: any;
    expression: any;
    after: boolean;
    isUnary: boolean;
    get isAssignment(): boolean;
}
export class Number extends ASTNode {
    constructor(value: any, type?: string);
    type: string;
    value: any;
    isNumber: boolean;
}
export class String extends ASTNode {
    constructor(value: any);
    value: any;
    isString: boolean;
}
export class Conditional extends ASTNode {
    constructor(cond?: null, body?: any[]);
    cond: any;
    body: any[];
    elseConditional: any;
    isConditional: boolean;
}
export class FunctionCall extends ASTNode {
    constructor(name: any, params?: any[]);
    name: any;
    params: any[];
    isFunctionCall: boolean;
}
export class Return extends ASTNode {
    constructor(value: any);
    value: any;
    isReturn: boolean;
}
export class Discard extends ASTNode {
    isDiscard: boolean;
}
export class Continue extends ASTNode {
    isContinue: boolean;
}
export class Break extends ASTNode {
    isBreak: boolean;
}
export class Accessor extends ASTNode {
    constructor(property: any);
    property: any;
    isAccessor: boolean;
}
export class StaticElement extends ASTNode {
    constructor(value: any);
    value: any;
    isStaticElement: boolean;
}
export class DynamicElement extends ASTNode {
    constructor(value: any);
    value: any;
    isDynamicElement: boolean;
}
export class AccessorElements extends ASTNode {
    constructor(object: any, elements?: any[]);
    object: any;
    elements: any[];
    isAccessorElements: boolean;
}
export class For extends ASTNode {
    constructor(initialization: any, condition: any, afterthought: any, body?: any[]);
    initialization: any;
    condition: any;
    afterthought: any;
    body: any[];
    isFor: boolean;
}
export class While extends ASTNode {
    constructor(condition: any, body?: any[]);
    condition: any;
    body: any[];
    isWhile: boolean;
}
export class Switch extends ASTNode {
    constructor(discriminant: any, cases: any);
    discriminant: any;
    cases: any;
    isSwitch: boolean;
}
export class SwitchCase extends ASTNode {
    constructor(body: any, conditions?: null);
    body: any;
    conditions: any;
    isDefault: boolean;
    isSwitchCase: boolean;
}
export class StructMember {
    constructor(type: any, name: any);
    type: any;
    name: any;
    isStructMember: boolean;
}
export class StructDefinition extends ASTNode {
    constructor(name: any, members?: any[]);
    name: any;
    members: any[];
    isStructDefinition: boolean;
}
