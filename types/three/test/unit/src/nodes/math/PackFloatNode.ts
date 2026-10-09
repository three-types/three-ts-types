import { packHalf2x16, packSnorm2x16, packSnorm4x8, packUnorm2x16, packUnorm4x8, vec2, vec4 } from "three/tsl";
import { Node, PackFloatNode, VarNode } from "three/webgpu";

const packedSnorm2x16: Node<"uint"> = packSnorm2x16(vec2(1));
const packedUnorm2x16: Node<"uint"> = packUnorm2x16(vec2(1));
const packedHalf2x16: Node<"uint"> = packHalf2x16(vec2(1));
const packedSnorm4x8: Node<"uint"> = packSnorm4x8(vec4(1));
const packedUnorm4x8: Node<"uint"> = packUnorm4x8(vec4(1));

const result = packHalf2x16(vec2(1));
const variable: VarNode<"uint", PackFloatNode> = result;
variable.node.isPackFloatNode; // $ExpectType true
result.add(1);

// @ts-expect-error A packped result cannot be assigned the opposite node type.
const wrong: Node<"vec2"> = result;

// @ts-expect-error The helper returns a VarNode; the underlying node owns this flag.
result.isPackFloatNode;

const direct: Node<"uint"> = new PackFloatNode("snorm", vec2(1));
