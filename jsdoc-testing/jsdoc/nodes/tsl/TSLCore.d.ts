export function addMethodChaining(name: any, nodeElement: any): void;
export function ShaderNode(jsFunc: any, nodeType: any): ShaderNodeInternal;
export function Fn(jsFunc: any, layout?: null): () => void;
/**
 * Add the given node to the current stack.
 *
 * @param {Node} node - The node to add.
 * @returns {Node} The node that was added to the stack.
 */
export function Stack(node: Node): Node;
export function defined(v: any): any;
export function getConstNodeType(value: any): any;
export function nodeObject(val: any, altType?: null): any;
export function nodeObjectIntent(val: any, altType?: null): any;
export function nodeObjects(val: any, altType?: null): any;
export function nodeArray(val: any, altType?: null): any;
export function nodeProxy(NodeClass: any, scope?: null, factor?: null, settings?: null): any;
export function nodeImmutable(NodeClass: any, ...params: any[]): any;
export function nodeProxyIntent(NodeClass: any, scope?: null, factor?: null, settings?: {}): any;
export function setCurrentStack(stack: any): void;
export function getCurrentStack(): any;
export function If(...params: any[]): StackNode;
export function Switch(...params: any[]): StackNode;
export const color: any;
export const float: any;
export const int: any;
export const uint: any;
export const bool: any;
export const vec2: any;
export const ivec2: any;
export const uvec2: any;
export const bvec2: any;
export const vec3: any;
export const ivec3: any;
export const uvec3: any;
export const bvec3: any;
export const vec4: any;
export const ivec4: any;
export const uvec4: any;
export const bvec4: any;
export const mat2: any;
export const mat3: any;
export const mat4: any;
export function string(value?: string): any;
export function arrayBuffer(value: any): any;
export const element: any;
export function convert(node: any, types: any): any;
export function split(node: any, channels: any): any;
export function append(node: Node): Function;
declare class ShaderNodeInternal extends Node {
    constructor(jsFunc: any, nodeType: any);
    jsFunc: any;
    layout: any;
    once: boolean;
    setLayout(layout: any): this;
    getLayout(): any;
    call(rawInputs?: null): ShaderCallNodeInternal;
    setup(): ShaderCallNodeInternal;
}
import Node from '../core/Node.js';
declare class ShaderCallNodeInternal extends Node {
    constructor(shaderNode: any, rawInputs: any);
    shaderNode: any;
    rawInputs: any;
    isShaderCallNodeInternal: boolean;
    getNodeType(builder: any): any;
    getMemberType(builder: any, name: any): any;
    call(builder: any): any;
    setupOutput(builder: any): any;
    getOutputNode(builder: any): any;
    build(builder: any, output?: null): any;
}
export {};
