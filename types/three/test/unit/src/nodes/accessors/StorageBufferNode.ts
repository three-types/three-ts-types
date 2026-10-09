import { storage, struct } from "three/tsl";
import {
    BufferAttribute,
    Node,
    StorageBufferAttribute,
    StorageBufferNode,
    StorageInstancedBufferAttribute,
} from "three/webgpu";

const attribute = new StorageBufferAttribute(new Uint32Array(4), 1);
const explicit: StorageBufferNode<"uint"> = storage(attribute, "uint");
const counted: StorageBufferNode<"uint"> = storage(attribute, "uint", 4);
const inferred: StorageBufferNode<unknown> = storage(attribute);
const nullable: StorageBufferNode<unknown> = storage(attribute, null);
const omitted: StorageBufferNode<unknown> = storage(attribute, undefined, 4);
const structure = struct({ value: "uint" });
const structured: StorageBufferNode<"struct"> = storage(attribute, structure);
const instanced: StorageBufferNode<"vec3"> = storage(new StorageInstancedBufferAttribute(4, 3), "vec3");
const regular = new BufferAttribute(new Float32Array(4), 1);
const direct = new StorageBufferNode(regular, "float");
const element: Node<"uint"> = explicit.setAtomic(true).toAtomic().element(0);

// @ts-expect-error The runtime method is spelled setAtomic.
explicit.setAtmoic(true);
// @ts-expect-error Counts must be numeric.
storage(attribute, "uint", "4");
// @ts-expect-error An omitted type cannot infer a specific scalar node type.
const wrongInferred: StorageBufferNode<"uint"> = storage(attribute);
