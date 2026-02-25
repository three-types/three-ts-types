import { expect, test } from 'vitest';
import {
    bool,
    bvec2,
    color,
    float,
    int,
    ivec2,
    mat2,
    mat3,
    mat4,
    nodeObject,
    uint,
    uvec2,
    vec2,
    vec3,
    vec4,
} from 'three/tsl';
import * as THREE from 'three/webgpu';

const renderer = new THREE.WebGPURenderer();
const nodeBuilder: THREE.NodeBuilder = renderer.backend.createNodeBuilder(null!, renderer);

test('nodeObject(Node)', () => {
    const testVec3 = vec3(1, 0, 2);
    const result: typeof testVec3 = nodeObject(testVec3);
    expect(result).toStrictEqual(testVec3);
});

test('nodeObject(number)', () => {
    const result: THREE.Node<'float'> = nodeObject(5);
    expect(result).toBeInstanceOf(THREE.Node);
    expect(result.getNodeType(nodeBuilder)).toBe('float');
});

test('nodeObject(boolean)', () => {
    const result: THREE.Node<'bool'> = nodeObject(true);
    expect(result).toBeInstanceOf(THREE.Node);
    expect(result.getNodeType(nodeBuilder)).toBe('bool');
});

test('nodeObject(string)', () => {
    const stringValue = 'test';
    const result: string = nodeObject(stringValue);
    expect(result).toStrictEqual(stringValue);
});

test('nodeObject(Vector2)', () => {
    const result: THREE.Node<'vec2'> = nodeObject(new THREE.Vector2());
    expect(result).toBeInstanceOf(THREE.Node);
    expect(result.getNodeType(nodeBuilder)).toBe('vec2');
});

test('nodeObject(Vector3)', () => {
    const result: THREE.Node<'vec3'> = nodeObject(new THREE.Vector3());
    expect(result).toBeInstanceOf(THREE.Node);
    expect(result.getNodeType(nodeBuilder)).toBe('vec3');
});

test('nodeObject(Vector4)', () => {
    const result: THREE.Node<'vec4'> = nodeObject(new THREE.Vector4());
    expect(result).toBeInstanceOf(THREE.Node);
    expect(result.getNodeType(nodeBuilder)).toBe('vec4');
});

test('nodeObject(Matrix2)', () => {
    const result: THREE.Node<'mat2'> = nodeObject(new THREE.Matrix2());
    expect(result).toBeInstanceOf(THREE.Node);
    expect(result.getNodeType(nodeBuilder)).toBe('mat2');
});

test('nodeObject(Matrix3)', () => {
    const result: THREE.Node<'mat3'> = nodeObject(new THREE.Matrix3());
    expect(result).toBeInstanceOf(THREE.Node);
    expect(result.getNodeType(nodeBuilder)).toBe('mat3');
});

test('nodeObject(Matrix4)', () => {
    const result: THREE.Node<'mat4'> = nodeObject(new THREE.Matrix4());
    expect(result).toBeInstanceOf(THREE.Node);
    expect(result.getNodeType(nodeBuilder)).toBe('mat4');
});

test('nodeObject(Color)', () => {
    const result: THREE.Node<'color'> = nodeObject(new THREE.Color());
    expect(result).toBeInstanceOf(THREE.Node);
    expect(result.getNodeType(nodeBuilder)).toBe('color');
});

test('nodeObject(ArrayBuffer)', () => {
    const result: THREE.Node<'ArrayBuffer'> = nodeObject(new ArrayBuffer(8));
    expect(result).toBeInstanceOf(THREE.Node);
    expect(result.getNodeType(nodeBuilder)).toBe('ArrayBuffer');
});

test('nodeObject(object)', () => {
    const randomObject = { test: 5 };
    const result: typeof randomObject = nodeObject(randomObject);
    expect(result).toStrictEqual(randomObject);
});

function assertConstNode<TNodeType>(
    node: THREE.VarNode<TNodeType, THREE.ConstNode<TNodeType, unknown>>,
    nodeType: string,
    expectedType?: unknown,
) {
    expect(node).toBeInstanceOf(THREE.VarNode);
    expect(node.getNodeType(nodeBuilder)).toBe(nodeType);
    expect(node.node).toBeInstanceOf(THREE.ConstNode);
    expect(node.node.getNodeType(nodeBuilder)).toBe(nodeType);
    if (typeof expectedType === 'string') expect(node.node.value).toBeTypeOf(expectedType as 'string');
    else expect(node.node.value).toBeInstanceOf(expectedType);
}

function assertConvertNode<TNodeType>(node: THREE.VarNode<TNodeType, THREE.ConvertNode<TNodeType>>, nodeType: string) {
    expect(node).toBeInstanceOf(THREE.VarNode);
    expect(node.getNodeType(nodeBuilder)).toBe(nodeType);
    expect(node.node).toBeInstanceOf(THREE.ConvertNode);
    expect(node.node.getNodeType(nodeBuilder)).toBe(nodeType);
}

function assertJoinNode<TNodeType>(node: THREE.VarNode<TNodeType, THREE.JoinNode<TNodeType>>, nodeType: string) {
    expect(node).toBeInstanceOf(THREE.VarNode);
    expect(node.getNodeType(nodeBuilder)).toBe(nodeType);
    expect(node.node).toBeInstanceOf(THREE.JoinNode);
    expect(node.node.getNodeType(nodeBuilder)).toBe(nodeType);
}

test('color', () => {
    let node: THREE.VarNode<'color', THREE.ConstNode<'color', THREE.Color>> = color();
    assertConstNode(node, 'color', THREE.Color);

    node = color('red');
    assertConstNode(node, 'color', THREE.Color);

    node = color(0xff0000);
    assertConstNode(node, 'color', THREE.Color);

    node = color(new THREE.Color());
    assertConstNode(node, 'color', THREE.Color);

    node = color(0, 100, 255);
    assertConstNode(node, 'color', THREE.Color);
});

test('float', () => {
    let node: THREE.VarNode<'float', THREE.ConstNode<'float', number>> = float();
    assertConstNode(node, 'float', 'number');

    node = float(5);
    assertConstNode(node, 'float', 'number');

    let convertNode: THREE.VarNode<'float', THREE.ConvertNode<'float'>> = float(float(5));
    assertConvertNode(convertNode, 'float');

    convertNode = float(int(5));
    assertConvertNode(convertNode, 'float');

    convertNode = float(uint(5));
    assertConvertNode(convertNode, 'float');

    convertNode = float(bool(true));
    assertConvertNode(convertNode, 'float');
});

test('int', () => {
    let node: THREE.VarNode<'int', THREE.ConstNode<'int', number>> = int();
    assertConstNode(node, 'int', 'number');

    node = int(5);
    assertConstNode(node, 'int', 'number');

    let convertNode: THREE.VarNode<'int', THREE.ConvertNode<'int'>> = int(float(5));
    assertConvertNode(convertNode, 'int');

    convertNode = int(int(5));
    assertConvertNode(convertNode, 'int');

    convertNode = int(uint(5));
    assertConvertNode(convertNode, 'int');

    convertNode = int(bool(true));
    assertConvertNode(convertNode, 'int');
});

test('uint', () => {
    let node: THREE.VarNode<'uint', THREE.ConstNode<'uint', number>> = uint();
    assertConstNode(node, 'uint', 'number');

    node = uint(5);
    assertConstNode(node, 'uint', 'number');

    let convertNode: THREE.VarNode<'uint', THREE.ConvertNode<'uint'>> = uint(float(5));
    assertConvertNode(convertNode, 'uint');

    convertNode = uint(int(5));
    assertConvertNode(convertNode, 'uint');

    convertNode = uint(uint(5));
    assertConvertNode(convertNode, 'uint');

    convertNode = uint(bool(true));
    assertConvertNode(convertNode, 'uint');
});

test('bool', () => {
    let node: THREE.VarNode<'bool', THREE.ConstNode<'bool', boolean>> = bool();
    assertConstNode(node, 'bool', 'boolean');

    node = bool(true);
    assertConstNode(node, 'bool', 'boolean');

    let convertNode: THREE.VarNode<'bool', THREE.ConvertNode<'bool'>> = bool(float(5));
    assertConvertNode(convertNode, 'bool');

    convertNode = bool(int(5));
    assertConvertNode(convertNode, 'bool');

    convertNode = bool(uint(5));
    assertConvertNode(convertNode, 'bool');

    convertNode = bool(bool(true));
    assertConvertNode(convertNode, 'bool');
});

test('vec2', () => {
    let node: THREE.VarNode<'vec2', THREE.ConstNode<'vec2', THREE.Vector2>> = vec2();
    assertConstNode(node, 'vec2', THREE.Vector2);

    node = vec2(1);
    assertConstNode(node, 'vec2', THREE.Vector2);

    node = vec2(1, 2);
    assertConstNode(node, 'vec2', THREE.Vector2);

    node = vec2(new THREE.Vector2());
    assertConstNode(node, 'vec2', THREE.Vector2);

    let convertNode: THREE.VarNode<'vec2', THREE.ConvertNode<'vec2'>> = vec2(float(5));
    assertConvertNode(convertNode, 'vec2');

    convertNode = vec2(vec2(1, 2));
    assertConvertNode(convertNode, 'vec2');

    convertNode = vec2(ivec2(1, 2));
    assertConvertNode(convertNode, 'vec2');

    convertNode = vec2(uvec2(1, 2));
    assertConvertNode(convertNode, 'vec2');

    convertNode = vec2(bvec2(false, true));
    assertConvertNode(convertNode, 'vec2');

    let joinNode: THREE.VarNode<'vec2', THREE.JoinNode<'vec2'>> = vec2(float(5), 3);
    assertJoinNode(joinNode, 'vec2');

    joinNode = vec2(3, float(5));
    assertJoinNode(joinNode, 'vec2');

    joinNode = vec2(float(3), float(5));
    assertJoinNode(joinNode, 'vec2');
});

test('ivec2', () => {
    let node: THREE.VarNode<'ivec2', THREE.ConstNode<'ivec2', THREE.Vector2>> = ivec2();
    assertConstNode(node, 'ivec2', THREE.Vector2);

    node = ivec2(1);
    assertConstNode(node, 'ivec2', THREE.Vector2);

    node = ivec2(1, 2);
    assertConstNode(node, 'ivec2', THREE.Vector2);

    node = ivec2(new THREE.Vector2());
    assertConstNode(node, 'ivec2', THREE.Vector2);

    let convertNode: THREE.VarNode<'ivec2', THREE.ConvertNode<'ivec2'>> = ivec2(int(5));
    assertConvertNode(convertNode, 'ivec2');

    convertNode = ivec2(vec2(1, 2));
    assertConvertNode(convertNode, 'ivec2');

    convertNode = ivec2(ivec2(1, 2));
    assertConvertNode(convertNode, 'ivec2');

    convertNode = ivec2(uvec2(1, 2));
    assertConvertNode(convertNode, 'ivec2');

    convertNode = ivec2(bvec2(false, true));
    assertConvertNode(convertNode, 'ivec2');

    let joinNode: THREE.VarNode<'ivec2', THREE.JoinNode<'ivec2'>> = ivec2(int(5), 3);
    assertJoinNode(joinNode, 'ivec2');

    joinNode = ivec2(3, int(5));
    assertJoinNode(joinNode, 'ivec2');

    joinNode = ivec2(int(3), int(5));
    assertJoinNode(joinNode, 'ivec2');
});

test('uvec2', () => {
    let node: THREE.VarNode<'uvec2', THREE.ConstNode<'uvec2', THREE.Vector2>> = uvec2();
    assertConstNode(node, 'uvec2', THREE.Vector2);

    node = uvec2(1);
    assertConstNode(node, 'uvec2', THREE.Vector2);

    node = uvec2(1, 2);
    assertConstNode(node, 'uvec2', THREE.Vector2);

    node = uvec2(new THREE.Vector2());
    assertConstNode(node, 'uvec2', THREE.Vector2);

    let convertNode: THREE.VarNode<'uvec2', THREE.ConvertNode<'uvec2'>> = uvec2(uint(5));
    assertConvertNode(convertNode, 'uvec2');

    convertNode = uvec2(vec2(1, 2));
    assertConvertNode(convertNode, 'uvec2');

    convertNode = uvec2(ivec2(1, 2));
    assertConvertNode(convertNode, 'uvec2');

    convertNode = uvec2(uvec2(1, 2));
    assertConvertNode(convertNode, 'uvec2');

    convertNode = uvec2(bvec2(false, true));
    assertConvertNode(convertNode, 'uvec2');

    let joinNode: THREE.VarNode<'uvec2', THREE.JoinNode<'uvec2'>> = uvec2(uint(5), 3);
    assertJoinNode(joinNode, 'uvec2');

    joinNode = uvec2(3, uint(5));
    assertJoinNode(joinNode, 'uvec2');

    joinNode = uvec2(uint(3), uint(5));
    assertJoinNode(joinNode, 'uvec2');
});

test('bvec2', async () => {
    let node: THREE.VarNode<'bvec2', THREE.ConstNode<'bvec2', THREE.Vector2>> = bvec2();
    assertConstNode(node, 'bvec2', THREE.Vector2);

    node = bvec2(true);
    assertConstNode(node, 'bvec2', THREE.Vector2);

    node = bvec2(false, true);
    assertConstNode(node, 'bvec2', THREE.Vector2);

    node = bvec2(new THREE.Vector2(1, -23));
    assertConstNode(node, 'bvec2', THREE.Vector2);

    let convertNode: THREE.VarNode<'bvec2', THREE.ConvertNode<'bvec2'>> = bvec2(bool(true));
    assertConvertNode(convertNode, 'bvec2');

    convertNode = bvec2(vec2(1, 2));
    assertConvertNode(convertNode, 'bvec2');

    convertNode = bvec2(ivec2(1, 2));
    assertConvertNode(convertNode, 'bvec2');

    convertNode = bvec2(uvec2(1, 2));
    assertConvertNode(convertNode, 'bvec2');

    convertNode = bvec2(bvec2(false, true));
    assertConvertNode(convertNode, 'bvec2');

    let joinNode: THREE.VarNode<'bvec2', THREE.JoinNode<'bvec2'>> = bvec2(bool(true), false);
    assertJoinNode(joinNode, 'bvec2');

    joinNode = bvec2(false, bool(true));
    assertJoinNode(joinNode, 'bvec2');

    joinNode = bvec2(bool(false), bool(true));
    assertJoinNode(joinNode, 'bvec2');
});

test('vec3', () => {
    let node: THREE.VarNode<'vec3', THREE.ConstNode<'vec3', THREE.Vector3>> = vec3();
    assertConstNode(node, 'vec3', THREE.Vector3);

    node = vec3(1);
    assertConstNode(node, 'vec3', THREE.Vector3);

    node = vec3(1, 2);
    assertConstNode(node, 'vec3', THREE.Vector3);

    node = vec3(1, 2, 3);
    assertConstNode(node, 'vec3', THREE.Vector3);

    node = vec3(new THREE.Vector3());
    assertConstNode(node, 'vec3', THREE.Vector3);
});

test('vec4', () => {
    let node: THREE.VarNode<'vec4', THREE.ConstNode<'vec4', THREE.Vector4>> = vec4();
    assertConstNode(node, 'vec4', THREE.Vector4);

    node = vec4(1);
    assertConstNode(node, 'vec4', THREE.Vector4);

    node = vec4(1, 2);
    assertConstNode(node, 'vec4', THREE.Vector4);

    node = vec4(1, 2, 3);
    assertConstNode(node, 'vec4', THREE.Vector4);

    node = vec4(1, 2, 3, 4);
    assertConstNode(node, 'vec4', THREE.Vector4);

    node = vec4(new THREE.Vector4());
    assertConstNode(node, 'vec4', THREE.Vector4);
});

test('mat2', () => {
    let node: THREE.VarNode<'mat2', THREE.ConstNode<'mat2', THREE.Matrix2>> = mat2(new THREE.Matrix2());
    assertConstNode(node, 'mat2', THREE.Matrix2);
});

test('mat3', () => {
    let node: THREE.VarNode<'mat3', THREE.ConstNode<'mat3', THREE.Matrix3>> = mat3(new THREE.Matrix3());
    assertConstNode(node, 'mat3', THREE.Matrix3);

    node = mat3();
    assertConstNode(node, 'mat3', THREE.Matrix3);
});

test('mat4', () => {
    let node: THREE.VarNode<'mat4', THREE.ConstNode<'mat4', THREE.Matrix4>> = mat4(new THREE.Matrix4());
    assertConstNode(node, 'mat4', THREE.Matrix4);

    node = mat4();
    assertConstNode(node, 'mat4', THREE.Matrix4);
});
