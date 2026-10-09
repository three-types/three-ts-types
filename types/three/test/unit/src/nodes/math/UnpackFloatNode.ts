import { uint, unpackHalf2x16, unpackSnorm2x16, unpackSnorm4x8, unpackUnorm2x16, unpackUnorm4x8 } from "three/tsl";
import { Node, UnpackFloatNode, VarNode } from "three/webgpu";

const unpackedSnorm2x16: Node<"vec2"> = unpackSnorm2x16(uint(0));
const unpackedUnorm2x16: Node<"vec2"> = unpackUnorm2x16(uint(0));
const unpackedHalf2x16: Node<"vec2"> = unpackHalf2x16(uint(0));
const unpackedSnorm4x8: Node<"vec4"> = unpackSnorm4x8(uint(0));
const unpackedUnorm4x8: Node<"vec4"> = unpackUnorm4x8(uint(0));

const result = unpackHalf2x16(uint(0));
const variable: VarNode<"vec2", UnpackFloatNode<"vec2">> = result;
variable.node.isUnpackFloatNode; // $ExpectType true
result.x.add(1);

// @ts-expect-error A unpackped result cannot be assigned the opposite node type.
const wrong: Node<"uint"> = result;

// @ts-expect-error The helper returns a VarNode; the underlying node owns this flag.
result.isUnpackFloatNode;

const direct: Node<"vec2"> = new UnpackFloatNode("float16", uint(0));
const node = new UnpackFloatNode("float16", uint(0));
node.isUnpackFloatNode; // $ExpectType true
// @ts-expect-error This is not a PackFloatNode.
node.isPackFloatNode;
