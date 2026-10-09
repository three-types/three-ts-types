import { int, uint, workgroupArray } from "three/tsl";
import { Node, WorkgroupInfoNode } from "three/webgpu";

const group = workgroupArray("uint", 4);
const element: Node<"uint"> = group.setName("scratch").toAtomic().element(uint(0));
group.setScope("Workgroup");
group.label("scratch");
group.getElementType(); // $ExpectType "uint"
group.getInputType(); // $ExpectType string
element.add(1);

const vector: Node<"vec3"> = workgroupArray("vec3", 4).element(int(0));
const direct: Node<"uint"> = new WorkgroupInfoNode("Workgroup", "uint", 4).element(uint(0));

// @ts-expect-error A uint workgroup element is not float.
const wrong: Node<"float"> = element;
// @ts-expect-error WorkgroupInfoNode.element forwards its index without converting JS numbers.
group.element(0);
