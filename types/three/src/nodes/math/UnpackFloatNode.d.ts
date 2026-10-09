import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import VarNode from "../core/VarNode.js";
import { PackFloatNodeEncoding, PackFloatNodeLayout } from "./PackFloatNode.js";

interface UnpackFloatNodeInterface {
    uintNode: Node;
    encoding: PackFloatNodeEncoding;
    layout: PackFloatNodeLayout;

    readonly isUnpackFloatNode: true;
}

declare const UnpackFloatNode: {
    new(encoding: PackFloatNodeEncoding, uintNode: Node): UnpackFloatNode<"vec2">;
};

type UnpackFloatNode<TNodeType extends "vec2" | "vec4" = "vec2"> =
    & TempNode<TNodeType>
    & UnpackFloatNodeInterface;

export default UnpackFloatNode;

export const unpackSnorm2x16: (value: Node) => VarNode<"vec2", UnpackFloatNode<"vec2">>;
export const unpackUnorm2x16: (value: Node) => VarNode<"vec2", UnpackFloatNode<"vec2">>;
export const unpackHalf2x16: (value: Node) => VarNode<"vec2", UnpackFloatNode<"vec2">>;
export const unpackSnorm4x8: (value: Node) => VarNode<"vec4", UnpackFloatNode<"vec4">>;
export const unpackUnorm4x8: (value: Node) => VarNode<"vec4", UnpackFloatNode<"vec4">>;
