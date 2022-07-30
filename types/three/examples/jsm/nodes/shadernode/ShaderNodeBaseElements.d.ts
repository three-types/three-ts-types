import TextureNode from '../accessors/TextureNode';
import Node from '../core/Node';

// shader node utils
import {
    ShaderNode,
    nodeObject,
    nodeObjects,
    nodeArray,
    nodeProxy,
    nodeImmutable,
    ConvertType,
    Swizzable,
    NodeRepresentation,
    NodeOrType,
} from './ShaderNode';
import { Material, Texture } from '../../../../src/Three';
import { NodeTypeOption } from '../core/constants';

// shader node base

export { ShaderNode, nodeObject, nodeObjects, nodeArray, nodeProxy, nodeImmutable, Swizzable };

export const color: ConvertType;

export const float: ConvertType;
export const int: ConvertType;
export const uint: ConvertType;
export const bool: ConvertType;

export const vec2: ConvertType;
export const ivec2: ConvertType;
export const uvec2: ConvertType;
export const bvec2: ConvertType;

export const vec3: ConvertType;
export const ivec3: ConvertType;
export const uvec3: ConvertType;
export const bvec3: ConvertType;

export const vec4: ConvertType;
export const ivec4: ConvertType;
export const uvec4: ConvertType;
export const bvec4: ConvertType;

export const mat3: ConvertType;
export const imat3: ConvertType;
export const umat3: ConvertType;
export const bmat3: ConvertType;

export const mat4: ConvertType;
export const imat4: ConvertType;
export const umat4: ConvertType;
export const bmat4: ConvertType;

export function func(code: string): ShaderNode<any>;

export function uniform(nodeOrType: any): Swizzable;

export function attribute(attributeName: string, nodeType: NodeTypeOption): Swizzable;
export function property(name: string, nodeOrType: Node | NodeTypeOption): Swizzable;

export function bypass(returnNode: NodeRepresentation, callNode: NodeRepresentation): Swizzable;
export function code(code: string, nodeType?: NodeTypeOption): Swizzable;
export function context(node: NodeRepresentation, context: any): Swizzable;
export function expression(snipped?: string, nodeType?: NodeTypeOption): Swizzable;

export function call(functionNode?: NodeRepresentation, parameters?: { [name: string]: Node }): Swizzable;

export const instanceIndex: Swizzable;
export function label(node: NodeRepresentation, name?: string): Swizzable;
export function temp(node: NodeRepresentation, name?: string): Swizzable;
export function vary(node: NodeRepresentation, name?: string): Swizzable;

// accesors

export function buffer(value: ArrayLike<number>, nodeOrType: NodeOrType, count: number): Swizzable;
export function storage(value: ArrayLike<number>, nodeOrType: NodeOrType, count: number): Swizzable;

export const cameraProjectionMatrix: Swizzable;
export const cameraViewMatrix: Swizzable;
export const cameraNormalMatrix: Swizzable;
export const cameraWorldMatrix: Swizzable;
export const cameraPosition: Swizzable;

export const materialAlphaTest: Swizzable;
export const materialColor: Swizzable;
export const materialEmissive: Swizzable;
export const materialOpacity: Swizzable;
export const materialRoughness: Swizzable;
export const materialMetalness: Swizzable;
export const materialRotation: Swizzable;

export const diffuseColor: Swizzable;
export const roughness: Swizzable;
export const metalness: Swizzable;
export const alphaTest: Swizzable;
export const specularColor: Swizzable;

export function reference(name: string, nodeOrType: NodeOrType, object: any): Swizzable;
export function materialReference(name: string, nodeOrType: NodeOrType, material: Material): Swizzable;
export function userData(name: string, inputType: NodeTypeOption, userData?: any): Swizzable;

export function modelViewProjection(position?: NodeRepresentation): Swizzable;

export const normalGeometry: Swizzable;
export const normalLocal: Swizzable;
export const normalWorld: Swizzable;
export const normalView: Swizzable;
export const transformedNormalView: Swizzable;

export const modelViewMatrix: Swizzable;
export const modelNormalMatrix: Swizzable;
export const modelWorldMatrix: Swizzable;
export const modelPosition: Swizzable;
export const modelViewPosition: Swizzable;

export const positionGeometry: Swizzable;
export const positionLocal: Swizzable;
export const positionWorld: Swizzable;
export const positionView: Swizzable;
export const positionViewDirection: Swizzable;

export function texture(value: Texture, uvNode?: NodeRepresentation, levelNode?: NodeRepresentation): Swizzable;
export function sampler(texture: Texture | TextureNode): Swizzable;
export function uv(index?: number): Swizzable;
export const pointUV: Swizzable;

// gpgpu

export function compute(node: NodeRepresentation, count: number, workgroupSize: number): Swizzable;

// math

export const EPSILON: Swizzable;
export const INFINITY: Swizzable;

export function cond(condNode: NodeRepresentation, ifNode: NodeRepresentation, elseNode: NodeRepresentation): Swizzable;

type Operator = (a: NodeRepresentation, b: NodeRepresentation, ...others: NodeRepresentation[]) => Swizzable;
type Unary = (a: NodeRepresentation) => Swizzable;
type Binary = (a: NodeRepresentation, b: NodeRepresentation) => Swizzable;
type Ternary = (a: NodeRepresentation, b: NodeRepresentation, c: NodeRepresentation) => Swizzable;

export const add: Operator;
export const sub: Operator;
export const mul: Operator;
export const div: Operator;
export const remainder: Operator;
export const equal: Operator;
export const assign: Operator;
export const lessThan: Operator;
export const greaterThan: Operator;
export const lessThanEqual: Operator;
export const greaterThanEqual: Operator;
export const and: Operator;
export const or: Operator;
export const xor: Operator;
export const bitAnd: Operator;
export const bitOr: Operator;
export const bitXor: Operator;
export const shiftLeft: Operator;
export const shiftRight: Operator;

export const radians: Unary;
export const degrees: Unary;
export const exp: Unary;
export const exp2: Unary;
export const log: Unary;
export const log2: Unary;
export const sqrt: Unary;
export const inversesqrt: Unary;
export const floor: Unary;
export const ceil: Unary;
export const normalize: Unary;
export const fract: Unary;
export const sin: Unary;
export const cos: Unary;
export const tan: Unary;
export const asin: Unary;
export const acos: Unary;
export const atan: Unary;
export const abs: Unary;
export const sign: Unary;
export const length: Unary;
export const negate: Unary;
export const invert: Unary;
export const dFdx: Unary;
export const dFdy: Unary;
export const saturate: Unary;
export const round: Unary;

export const atan2: Binary;
export const min: Binary;
export const max: Binary;
export const mod: Binary;
export const step: Binary;
export const reflect: Binary;
export const distance: Binary;
export const dot: Binary;
export const cross: Binary;
export const pow: Binary;
export const pow2: Binary;
export const pow3: Binary;
export const pow4: Binary;
export const transformDirection: Binary;

export const mix: Ternary;
export const clamp: Ternary;
export const refract: Ternary;
export const smoothstep: Ternary;
export const faceforward: Ternary;

// display

export const frontFacing: Swizzable;
export const faceDirection: Swizzable;

// lighting

// utils
export function element(node: NodeRepresentation, indexNode: NodeRepresentation): Swizzable;

// miscellaneous
export const dotNV: Swizzable;
export const transformedNormalWorld: Swizzable;
