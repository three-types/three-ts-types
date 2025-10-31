import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";

export type OperatorNodeOp =
    | "%"
    | "&"
    | "|"
    | "^"
    | ">>"
    | "<<"
    | "=="
    | "!="
    | "&&"
    | "||"
    | "^^"
    | "<"
    | ">"
    | "<="
    | ">="
    | "+"
    | "-"
    | "*"
    | "/";

export default class OperatorNode extends TempNode {
    aNode: Node;
    bNode: Node;
    op: OperatorNodeOp;

    readonly isOperatorNode: true;

    constructor(op: OperatorNodeOp, ...params: [Node, Node, ...Node[]]);
}

type OperatorNodeParameter = Node | number;

export const add: (
    a: Node<"float"> | number,
    b: Node<"float"> | number,
    ...params: (Node<"float"> | number)[]
) => Node<"float">;
export const sub: (
    a: Node<"float"> | number,
    b: Node<"float"> | number,
    ...params: (Node<"float"> | number)[]
) => Node<"float">;
export const mul: (
    a: Node<"float"> | number,
    b: Node<"float"> | number,
    ...params: (Node<"float"> | number)[]
) => Node<"float">;
export const div: (
    a: Node<"float"> | number,
    b: Node<"float"> | number,
    ...params: (Node<"float"> | number)[]
) => Node<"float">;
export const mod: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const equal: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const notEqual: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const lessThan: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const greaterThan: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const lessThanEqual: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const greaterThanEqual: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const and: (
    a: OperatorNodeParameter,
    b: OperatorNodeParameter,
    ...params: OperatorNodeParameter[]
) => OperatorNode;
export const or: (
    a: OperatorNodeParameter,
    b: OperatorNodeParameter,
    ...params: OperatorNodeParameter[]
) => OperatorNode;
export const not: (value: OperatorNodeParameter) => OperatorNode;
export const xor: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const bitAnd: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const bitNot: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const bitOr: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const bitXor: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const shiftLeft: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const shiftRight: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;

export const incrementBefore: (a: OperatorNodeParameter) => Node;
export const decrementBefore: (a: OperatorNodeParameter) => Node;
export const increment: (a: OperatorNodeParameter) => Node;
export const decrement: (a: OperatorNodeParameter) => Node;

interface MulFloat {
    (
        b: Node<"float"> | number,
        ...params: (Node<"float"> | number)[]
    ): Node<"float">;
    (
        b: Node<"color">,
    ): Node<"color">;
    (
        b: Node<"vec3">,
    ): Node<"vec3">;
}

interface MulMat3 {
    (
        b: Node<"mat3">,
    ): Node<"mat3">;
    (
        b: Node<"vec4">,
    ): Node<"vec3">;
}

interface MulMat4 {
    (
        b: Node<"mat4">,
    ): Node<"mat4">;
    (
        b: Node<"vec3"> | Node<"vec4">,
    ): Node<"vec4">;
}

declare module "../core/Node.js" {
    interface NodeElements {
        mod: (
            b: OperatorNodeParameter,
        ) => OperatorNode;
        modAssign: (
            b: OperatorNodeParameter,
        ) => this;

        and: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => OperatorNode;
        andAssign: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => this;

        or: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => OperatorNode;
        orAssign: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => this;

        not: () => OperatorNode;
        notAssign: () => this;

        xor: (
            b: OperatorNodeParameter,
        ) => OperatorNode;
        xorAssign: (
            b: OperatorNodeParameter,
        ) => this;

        bitAnd: (
            b: OperatorNodeParameter,
        ) => OperatorNode;
        bitAndAssign: (
            b: OperatorNodeParameter,
        ) => this;

        bitNot: (
            b: OperatorNodeParameter,
        ) => OperatorNode;
        bitNotAssign: (
            b: OperatorNodeParameter,
        ) => this;

        bitOr: (
            b: OperatorNodeParameter,
        ) => OperatorNode;
        bitOrAssign: (
            b: OperatorNodeParameter,
        ) => this;

        bitXor: (
            b: OperatorNodeParameter,
        ) => OperatorNode;
        bitXorAssign: (
            b: OperatorNodeParameter,
        ) => this;

        shiftLeft: (
            b: OperatorNodeParameter,
        ) => OperatorNode;
        shiftLeftAssign: (
            b: OperatorNodeParameter,
        ) => this;

        shiftRight: (
            b: OperatorNodeParameter,
        ) => OperatorNode;
        shiftRightAssign: (
            b: OperatorNodeParameter,
        ) => this;

        incrementBefore: () => OperatorNode;
        incrementBeforeAssign: () => this;

        decrementBefore: () => OperatorNode;
        decrementBeforeAssign: () => this;

        increment: () => OperatorNode;
        incrementAssign: () => this;

        decrement: () => OperatorNode;
        decrementAssign: () => this;
    }

    interface FloatExtensions {
        equal: (
            b: Node<"float"> | number,
        ) => Node<"bool">;
        equalAssign: (
            b: Node<"float"> | number,
        ) => this;

        notEqual: (
            b: Node<"float"> | number,
        ) => Node<"bool">;
        notEqualAssign: (
            b: Node<"float"> | number,
        ) => this;

        lessThan: (
            b: Node<"float"> | number,
        ) => Node<"bool">;
        lessThanAssign: (
            b: Node<"float"> | number,
        ) => this;

        greaterThan: (
            b: Node<"float"> | number,
        ) => Node<"bool">;
        greaterThanAssign: (
            b: Node<"float"> | number,
        ) => this;

        lessThanEqual: (
            b: Node<"float"> | number,
        ) => Node<"bool">;
        lessThanEqualAssign: (
            b: Node<"float"> | number,
        ) => this;

        greaterThanEqual: (
            b: Node<"float"> | number,
        ) => Node<"bool">;
        greaterThanEqualAssign: (
            b: Node<"float"> | number,
        ) => this;

        add: (
            b: Node<"float"> | number,
            ...params: (Node<"float"> | number)[]
        ) => Node<"float">;
        addAssign: (
            b: Node<"float"> | number,
            ...params: (Node<"float"> | number)[]
        ) => this;

        sub: (
            b: Node<"float"> | number,
            ...params: (Node<"float"> | number)[]
        ) => Node<"float">;
        subAssign: (
            b: Node<"float"> | number,
            ...params: (Node<"float"> | number)[]
        ) => this;

        mul: MulFloat;
        mulAssign: (
            b: Node<"float"> | number,
            ...params: (Node<"float"> | number)[]
        ) => this;

        div: (
            b: Node<"float"> | number,
            ...params: (Node<"float"> | number)[]
        ) => Node<"float">;
        divAssign: (
            b: Node<"float"> | number,
            ...params: (Node<"float"> | number)[]
        ) => this;
    }

    interface UintExtensions {
        equal: (
            b: Node<"uint"> | number,
        ) => Node<"bool">;
        equalAssign: (
            b: Node<"uint"> | number,
        ) => this;

        notEqual: (
            b: Node<"uint"> | number,
        ) => Node<"bool">;
        notEqualAssign: (
            b: Node<"uint"> | number,
        ) => this;

        lessThan: (
            b: Node<"uint"> | number,
        ) => Node<"bool">;
        lessThanAssign: (
            b: Node<"uint"> | number,
        ) => this;

        greaterThan: (
            b: Node<"uint"> | number,
        ) => Node<"bool">;
        greaterThanAssign: (
            b: Node<"uint"> | number,
        ) => this;

        lessThanEqual: (
            b: Node<"uint"> | number,
        ) => Node<"bool">;
        lessThanEqualAssign: (
            b: Node<"uint"> | number,
        ) => this;

        greaterThanEqual: (
            b: Node<"uint"> | number,
        ) => Node<"bool">;
        greaterThanEqualAssign: (
            b: Node<"uint"> | number,
        ) => this;

        add: (
            b: Node<"uint"> | number,
            ...params: (Node<"uint"> | number)[]
        ) => Node<"uint">;
        addAssign: (
            b: Node<"uint"> | number,
            ...params: (Node<"uint"> | number)[]
        ) => this;

        sub: (
            b: Node<"uint"> | number,
            ...params: (Node<"uint"> | number)[]
        ) => Node<"uint">;
        subAssign: (
            b: Node<"uint"> | number,
            ...params: (Node<"uint"> | number)[]
        ) => this;

        mul: (
            b: Node<"uint"> | number,
            ...params: (Node<"uint"> | number)[]
        ) => Node<"uint">;
        mulAssign: (
            b: Node<"uint"> | number,
            ...params: (Node<"uint"> | number)[]
        ) => this;

        div: (
            b: Node<"uint"> | number,
            ...params: (Node<"uint"> | number)[]
        ) => Node<"uint">;
        divAssign: (
            b: Node<"uint"> | number,
            ...params: (Node<"uint"> | number)[]
        ) => this;
    }

    interface VectorExtensions<TValue> {
        add: (
            b: Node<TValue> | Node<"float"> | number,
            ...params: (Node<TValue> | Node<"float"> | number)[]
        ) => Node<TValue>;
        addAssign: (
            b: Node<TValue> | Node<"float"> | number,
            ...params: (Node<TValue> | Node<"float"> | number)[]
        ) => this;

        sub: (
            b: Node<TValue> | Node<"float"> | number,
            ...params: (Node<TValue> | Node<"float"> | number)[]
        ) => Node<TValue>;
        subAssign: (
            b: Node<TValue> | Node<"float"> | number,
            ...params: (Node<TValue> | Node<"float"> | number)[]
        ) => this;

        mul: (
            b: Node<TValue> | Node<"float"> | number,
            ...params: (Node<TValue> | Node<"float"> | number)[]
        ) => Node<TValue>;
        mulAssign: (
            b: Node<TValue> | Node<"float"> | number,
            ...params: (Node<TValue> | Node<"float"> | number)[]
        ) => this;

        div: (
            b: Node<TValue> | Node<"float"> | number,
            ...params: (Node<TValue> | Node<"float"> | number)[]
        ) => Node<TValue>;
        divAssign: (
            b: Node<TValue> | Node<"float"> | number,
            ...params: (Node<TValue> | Node<"float"> | number)[]
        ) => this;
    }

    interface Vector4Extensions {
        add: (
            b: Node<"color">,
        ) => Node<"vec4">;
        addAssign: (
            b: Node<"color">,
        ) => this;

        mul: (
            b: Node<"color">,
        ) => Node<"vec4">;
        mulAssign: (
            b: Node<"color">,
        ) => this;
    }

    interface Matrix3Extensions {
        mul: MulMat3;
    }

    interface Matrix4Extensions {
        mul: MulMat4;
        mulAssign: (
            b: Node<"vec3"> | Node<"vec4">,
        ) => this;
    }
}

/**
 * @deprecated "modInt()" is deprecated. Use "mod( int( ... ) )" instead.
 */
export const modInt: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;

declare module "../Nodes.js" {
    interface Nodes {
        /**
         * @deprecated "modInt()" is deprecated. Use "mod( int( ... ) )" instead.
         */
        modInt: (b: OperatorNodeParameter) => OperatorNode;
        /**
         * @deprecated "modInt()" is deprecated. Use "mod( int( ... ) )" instead.
         */
        modIntAssign: (b: OperatorNodeParameter) => this;
    }
}
