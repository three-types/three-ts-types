import ArrayNode from "../core/ArrayNode.js";
import Node from "../core/Node.js";

interface ArrayElementNodeInterface<TNodeType> {
    node: ArrayNode<TNodeType>;
    indexNode: Node;
}

declare const ArrayElementNode: {
    new<TNodeType>(node: ArrayNode<TNodeType>, indexNode: Node): ArrayElementNode<TNodeType>;
};

type ArrayElementNode<TNodeType> = Node<TNodeType> & ArrayElementNodeInterface<TNodeType> & ElementAccess<TNodeType>;

export default ArrayElementNode;

/**
 * Maps a node type to the type returned by `NodeBuilder.getElementType()`: a matrix yields its column vector and a
 * vector yields its component.
 */
interface NodeElementTypes {
    vec2: "float";
    ivec2: "int";
    uvec2: "uint";
    bvec2: "bool";
    vec3: "float";
    ivec3: "int";
    uvec3: "uint";
    bvec3: "bool";
    vec4: "float";
    ivec4: "int";
    uvec4: "uint";
    bvec4: "bool";
    mat2: "vec2";
    mat3: "vec3";
    mat4: "vec4";
}

interface ElementAccessor<TNodeType extends keyof NodeElementTypes> {
    element: (indexNode: Node | number) => ArrayElementNode<NodeElementTypes[TNodeType]>;
}

/**
 * Adds `element()` to a node whose value is a single vector or matrix.
 */
export type ElementAccess<TNodeType> = TNodeType extends keyof NodeElementTypes ? ElementAccessor<TNodeType> : {};
