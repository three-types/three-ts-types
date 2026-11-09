import { instanceIndex, ivec4, storage, uniform } from "three/tsl";
import { Matrix4, Node, StorageBufferAttribute } from "three/webgpu";

// A matrix uniform yields its column vectors.
export const column: Node<"vec4"> = uniform(new Matrix4()).element(0);

// A variable holding an array yields the array's elements, and those yield their components.
const lightIndexes = ivec4(0).toArray(4).toVar();
export const chunk: Node<"ivec4"> = lightIndexes.element(0);
export const lightIndex: Node<"int"> = lightIndexes.element(0).element(1);

// An element of a vector storage buffer yields its components.
const positions = storage(new StorageBufferAttribute(4, 4), "vec4");
export const position: Node<"vec4"> = positions.element(instanceIndex);
export const component: Node<"float"> = positions.element(instanceIndex).element(0);

// An element of a matrix storage buffer yields its column vectors.
const matrices = storage(new StorageBufferAttribute(4, 16), "mat4");
export const matrixColumn: Node<"vec4"> = matrices.element(instanceIndex).element(0);
