import { expect, test } from 'vitest';
import {
    bool,
    bvec2,
    bvec3,
    bvec4,
    color,
    float,
    int,
    ivec2,
    ivec3,
    ivec4,
    mat2,
    mat3,
    mat4,
    nodeObject,
    uint,
    uvec2,
    uvec3,
    uvec4,
    vec2,
    vec3,
    vec4,
} from 'three/tsl';
import * as THREE from 'three/webgpu';

const renderer = new THREE.WebGPURenderer();
const nodeBuilder: THREE.NodeBuilder = renderer.backend.createNodeBuilder(null!, renderer);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();

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

    scene.backgroundNode = node.debug();
    renderer.render(scene, camera);
}

function assertConvertNode<TNodeType>(node: THREE.VarNode<TNodeType, THREE.ConvertNode<TNodeType>>, nodeType: string) {
    expect(node).toBeInstanceOf(THREE.VarNode);
    expect(node.getNodeType(nodeBuilder)).toBe(nodeType);
    expect(node.node).toBeInstanceOf(THREE.ConvertNode);
    expect(node.node.getNodeType(nodeBuilder)).toBe(nodeType);

    scene.backgroundNode = node.debug();
    renderer.render(scene, camera);
}

function assertJoinNode<TNodeType>(node: THREE.VarNode<TNodeType, THREE.JoinNode<TNodeType>>, nodeType: string) {
    expect(node).toBeInstanceOf(THREE.VarNode);
    expect(node.getNodeType(nodeBuilder)).toBe(nodeType);
    expect(node.node).toBeInstanceOf(THREE.JoinNode);
    expect(node.node.getNodeType(nodeBuilder)).toBe(nodeType);

    scene.backgroundNode = node.debug();
    renderer.render(scene, camera);
}

test('color', async () => {
    await renderer.init();

    let node: THREE.VarNode<'color', THREE.ConstNode<'color', THREE.Color>> = color();
    assertConstNode(node, 'color', THREE.Color);

    node = color('red');
    assertConstNode(node, 'color', THREE.Color);

    node = color(0xff0000);
    assertConstNode(node, 'color', THREE.Color);

    node = color(new THREE.Color());
    assertConstNode(node, 'color', THREE.Color);

    node = color(new THREE.Vector3(1, 0, 0.5));
    assertConstNode(node, 'color', THREE.Vector3);

    node = color(0, 0.5, 1);
    assertConstNode(node, 'color', THREE.Color);

    let convertNode: THREE.VarNode<'color', THREE.ConvertNode<'color'>> = color(float(0.5));
    assertConvertNode(convertNode, 'color');

    convertNode = color(vec3(1, 0, 0.5));
    assertConvertNode(convertNode, 'color');

    let joinNode: THREE.VarNode<'vec3', THREE.JoinNode<'vec3'>> = color(float(1), 0, 0.5);
    assertJoinNode(joinNode, 'vec3');

    joinNode = color(new THREE.Vector2(), float(1));
    assertJoinNode(joinNode, 'vec3');

    joinNode = color(new THREE.Vector2(), 0.5);
    assertJoinNode(joinNode, 'vec3');

    joinNode = color(1, vec2(0, 0.5));
    assertJoinNode(joinNode, 'vec3');
});

test('float', async () => {
    await renderer.init();

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

test('int', async () => {
    await renderer.init();

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

test('uint', async () => {
    await renderer.init();

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

test('bool', async () => {
    await renderer.init();

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

test('vec2', async () => {
    await renderer.init();

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

test('ivec2', async () => {
    await renderer.init();

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

test('uvec2', async () => {
    await renderer.init();

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
    await renderer.init();

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

test('vec3', async () => {
    await renderer.init();

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

    let convertNode: THREE.VarNode<'vec3', THREE.ConvertNode<'vec3'>> = vec3(float(5));
    assertConvertNode(convertNode, 'vec3');

    convertNode = vec3(vec3(1, 2, 3));
    assertConvertNode(convertNode, 'vec3');

    convertNode = vec3(ivec3(1, 2, 3));
    assertConvertNode(convertNode, 'vec3');

    convertNode = vec3(uvec3(1, 2, 3));
    assertConvertNode(convertNode, 'vec3');

    convertNode = vec3(bvec3(false, true, false));
    assertConvertNode(convertNode, 'vec3');

    let joinNode: THREE.VarNode<'vec3', THREE.JoinNode<'vec3'>> = vec3(float(5), 3, 1);
    assertJoinNode(joinNode, 'vec3');

    joinNode = vec3(uint(5), 1, 3);
    assertJoinNode(joinNode, 'vec3');

    joinNode = vec3(bool(false), true, false);
    assertJoinNode(joinNode, 'vec3');

    joinNode = vec3(new THREE.Vector2(), float(5));
    assertJoinNode(joinNode, 'vec3');

    joinNode = vec3(new THREE.Vector2(), 5);
    assertJoinNode(joinNode, 'vec3');

    joinNode = vec3(5, vec2(1, 2));
    assertJoinNode(joinNode, 'vec3');
});

test('ivec3', async () => {
    await renderer.init();

    let node: THREE.VarNode<'ivec3', THREE.ConstNode<'ivec3', THREE.Vector3>> = ivec3();
    assertConstNode(node, 'ivec3', THREE.Vector3);

    node = ivec3(1);
    assertConstNode(node, 'ivec3', THREE.Vector3);

    node = ivec3(1, 2);
    assertConstNode(node, 'ivec3', THREE.Vector3);

    node = ivec3(1, 2, 3);
    assertConstNode(node, 'ivec3', THREE.Vector3);

    node = ivec3(new THREE.Vector3());
    assertConstNode(node, 'ivec3', THREE.Vector3);

    let convertNode: THREE.VarNode<'ivec3', THREE.ConvertNode<'ivec3'>> = ivec3(int(5));
    assertConvertNode(convertNode, 'ivec3');

    convertNode = ivec3(vec3(1, 2, 3));
    assertConvertNode(convertNode, 'ivec3');

    convertNode = ivec3(ivec3(1, 2, 3));
    assertConvertNode(convertNode, 'ivec3');

    convertNode = ivec3(uvec3(1, 2, 3));
    assertConvertNode(convertNode, 'ivec3');

    convertNode = ivec3(bvec3(false, true, false));
    assertConvertNode(convertNode, 'ivec3');

    let joinNode: THREE.VarNode<'ivec3', THREE.JoinNode<'ivec3'>> = ivec3(int(5), 3, 1);
    assertJoinNode(joinNode, 'ivec3');

    joinNode = ivec3(new THREE.Vector2(), int(5));
    assertJoinNode(joinNode, 'ivec3');

    joinNode = ivec3(new THREE.Vector2(), 5);
    assertJoinNode(joinNode, 'ivec3');

    joinNode = ivec3(5, ivec2(1, 2));
    assertJoinNode(joinNode, 'ivec3');
});

test('uvec3', async () => {
    await renderer.init();

    let node: THREE.VarNode<'uvec3', THREE.ConstNode<'uvec3', THREE.Vector3>> = uvec3();
    assertConstNode(node, 'uvec3', THREE.Vector3);

    node = uvec3(1);
    assertConstNode(node, 'uvec3', THREE.Vector3);

    node = uvec3(1, 2);
    assertConstNode(node, 'uvec3', THREE.Vector3);

    node = uvec3(1, 2, 3);
    assertConstNode(node, 'uvec3', THREE.Vector3);

    node = uvec3(new THREE.Vector3());
    assertConstNode(node, 'uvec3', THREE.Vector3);

    let convertNode: THREE.VarNode<'uvec3', THREE.ConvertNode<'uvec3'>> = uvec3(uint(5));
    assertConvertNode(convertNode, 'uvec3');

    convertNode = uvec3(vec3(1, 2, 3));
    assertConvertNode(convertNode, 'uvec3');

    convertNode = uvec3(ivec3(1, 2, 3));
    assertConvertNode(convertNode, 'uvec3');

    convertNode = uvec3(uvec3(1, 2, 3));
    assertConvertNode(convertNode, 'uvec3');

    convertNode = uvec3(bvec3(false, true, false));
    assertConvertNode(convertNode, 'uvec3');

    let joinNode: THREE.VarNode<'uvec3', THREE.JoinNode<'uvec3'>> = uvec3(uint(5), 3, 1);
    assertJoinNode(joinNode, 'uvec3');

    joinNode = uvec3(new THREE.Vector2(), uint(5));
    assertJoinNode(joinNode, 'uvec3');

    joinNode = uvec3(new THREE.Vector2(), 5);
    assertJoinNode(joinNode, 'uvec3');

    joinNode = uvec3(5, uvec2(1, 2));
    assertJoinNode(joinNode, 'uvec3');
});

test('bvec3', async () => {
    await renderer.init();

    let node: THREE.VarNode<'bvec3', THREE.ConstNode<'bvec3', THREE.Vector3>> = bvec3();
    assertConstNode(node, 'bvec3', THREE.Vector3);

    node = bvec3(false);
    assertConstNode(node, 'bvec3', THREE.Vector3);

    node = bvec3(false, true);
    assertConstNode(node, 'bvec3', THREE.Vector3);

    node = bvec3(false, true, false);
    assertConstNode(node, 'bvec3', THREE.Vector3);

    node = bvec3(new THREE.Vector3());
    assertConstNode(node, 'bvec3', THREE.Vector3);

    let convertNode: THREE.VarNode<'bvec3', THREE.ConvertNode<'bvec3'>> = bvec3(bool(true));
    assertConvertNode(convertNode, 'bvec3');

    convertNode = bvec3(vec3(1, 2, 3));
    assertConvertNode(convertNode, 'bvec3');

    convertNode = bvec3(ivec3(1, 2, 3));
    assertConvertNode(convertNode, 'bvec3');

    convertNode = bvec3(uvec3(1, 2, 3));
    assertConvertNode(convertNode, 'bvec3');

    convertNode = bvec3(bvec3(false, true, false));
    assertConvertNode(convertNode, 'bvec3');

    let joinNode: THREE.VarNode<'bvec3', THREE.JoinNode<'bvec3'>> = bvec3(bool(false), true, false);
    assertJoinNode(joinNode, 'bvec3');

    joinNode = bvec3(new THREE.Vector2(), bool(true));
    assertJoinNode(joinNode, 'bvec3');

    joinNode = bvec3(new THREE.Vector2(), true);
    assertJoinNode(joinNode, 'bvec3');

    joinNode = bvec3(false, bvec2(true, false));
    assertJoinNode(joinNode, 'bvec3');
});

test('vec4', async () => {
    await renderer.init();

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

    let convertNode: THREE.VarNode<'vec4', THREE.ConvertNode<'vec4'>> = vec4(float(5));
    assertConvertNode(convertNode, 'vec4');

    convertNode = vec4(vec4(1, 2, 3, 4));
    assertConvertNode(convertNode, 'vec4');

    convertNode = vec4(ivec4(1, 2, 3, 4));
    assertConvertNode(convertNode, 'vec4');

    convertNode = vec4(uvec4(1, 2, 3, 4));
    assertConvertNode(convertNode, 'vec4');

    convertNode = vec4(bvec4(false, true, false, true));
    assertConvertNode(convertNode, 'vec4');

    let joinNode: THREE.VarNode<'vec4', THREE.JoinNode<'vec4'>> = vec4(float(5), 3, 1, 2);
    assertJoinNode(joinNode, 'vec4');

    joinNode = vec4(uint(5), 1, 3, 2);
    assertJoinNode(joinNode, 'vec4');

    joinNode = vec4(bool(false), true, false, false);
    assertJoinNode(joinNode, 'vec4');

    joinNode = vec4(3, new THREE.Vector2(), float(5));
    assertJoinNode(joinNode, 'vec4');

    joinNode = vec4(3, 5, new THREE.Vector2());
    assertJoinNode(joinNode, 'vec4');

    joinNode = vec4(vec2(3, 5), new THREE.Vector2());
    assertJoinNode(joinNode, 'vec4');

    joinNode = vec4(vec2(3, 5), 1, 2);
    assertJoinNode(joinNode, 'vec4');

    joinNode = vec4(new THREE.Vector3(), 3);
    assertJoinNode(joinNode, 'vec4');

    joinNode = vec4(5, vec3(1, 2, 3));
    assertJoinNode(joinNode, 'vec4');

    joinNode = vec4(1, color(1, 0.5, 0));
    assertJoinNode(joinNode, 'vec4');

    joinNode = vec4(new THREE.Color(1, 0.5, 0), 1);
    assertJoinNode(joinNode, 'vec4');
});

test('ivec4', async () => {
    await renderer.init();

    let node: THREE.VarNode<'ivec4', THREE.ConstNode<'ivec4', THREE.Vector4>> = ivec4();
    assertConstNode(node, 'ivec4', THREE.Vector4);

    node = ivec4(1);
    assertConstNode(node, 'ivec4', THREE.Vector4);

    node = ivec4(1, 2);
    assertConstNode(node, 'ivec4', THREE.Vector4);

    node = ivec4(1, 2, 3);
    assertConstNode(node, 'ivec4', THREE.Vector4);

    node = ivec4(1, 2, 3, 4);
    assertConstNode(node, 'ivec4', THREE.Vector4);

    node = ivec4(new THREE.Vector4());
    assertConstNode(node, 'ivec4', THREE.Vector4);

    let convertNode: THREE.VarNode<'ivec4', THREE.ConvertNode<'ivec4'>> = ivec4(int(5));
    assertConvertNode(convertNode, 'ivec4');

    convertNode = ivec4(vec4(1, 2, 3, 4));
    assertConvertNode(convertNode, 'ivec4');

    convertNode = ivec4(ivec4(1, 2, 3, 4));
    assertConvertNode(convertNode, 'ivec4');

    convertNode = ivec4(uvec4(1, 2, 3, 4));
    assertConvertNode(convertNode, 'ivec4');

    convertNode = ivec4(bvec4(false, true, false, true));
    assertConvertNode(convertNode, 'ivec4');

    let joinNode: THREE.VarNode<'ivec4', THREE.JoinNode<'ivec4'>> = ivec4(int(5), 3, 1, 2);
    assertJoinNode(joinNode, 'ivec4');

    joinNode = ivec4(3, new THREE.Vector2(), int(5));
    assertJoinNode(joinNode, 'ivec4');

    joinNode = ivec4(3, 5, new THREE.Vector2());
    assertJoinNode(joinNode, 'ivec4');

    joinNode = ivec4(ivec2(3, 5), new THREE.Vector2());
    assertJoinNode(joinNode, 'ivec4');

    joinNode = ivec4(ivec2(3, 5), 1, 2);
    assertJoinNode(joinNode, 'ivec4');

    joinNode = ivec4(new THREE.Vector3(), 3);
    assertJoinNode(joinNode, 'ivec4');

    joinNode = ivec4(5, ivec3(1, 2, 3));
    assertJoinNode(joinNode, 'ivec4');
});

test('uvec4', async () => {
    await renderer.init();

    let node: THREE.VarNode<'uvec4', THREE.ConstNode<'uvec4', THREE.Vector4>> = uvec4();
    assertConstNode(node, 'uvec4', THREE.Vector4);

    node = uvec4(1);
    assertConstNode(node, 'uvec4', THREE.Vector4);

    node = uvec4(1, 2);
    assertConstNode(node, 'uvec4', THREE.Vector4);

    node = uvec4(1, 2, 3);
    assertConstNode(node, 'uvec4', THREE.Vector4);

    node = uvec4(1, 2, 3, 4);
    assertConstNode(node, 'uvec4', THREE.Vector4);

    node = uvec4(new THREE.Vector4());
    assertConstNode(node, 'uvec4', THREE.Vector4);

    let convertNode: THREE.VarNode<'uvec4', THREE.ConvertNode<'uvec4'>> = uvec4(uint(5));
    assertConvertNode(convertNode, 'uvec4');

    convertNode = uvec4(vec4(1, 2, 3, 4));
    assertConvertNode(convertNode, 'uvec4');

    convertNode = uvec4(ivec4(1, 2, 3, 4));
    assertConvertNode(convertNode, 'uvec4');

    convertNode = uvec4(uvec4(1, 2, 3, 4));
    assertConvertNode(convertNode, 'uvec4');

    convertNode = uvec4(bvec4(false, true, false, true));
    assertConvertNode(convertNode, 'uvec4');

    let joinNode: THREE.VarNode<'uvec4', THREE.JoinNode<'uvec4'>> = uvec4(uint(5), 3, 1, 2);
    assertJoinNode(joinNode, 'uvec4');

    joinNode = uvec4(3, new THREE.Vector2(), uint(5));
    assertJoinNode(joinNode, 'uvec4');

    joinNode = uvec4(3, 5, new THREE.Vector2());
    assertJoinNode(joinNode, 'uvec4');

    joinNode = uvec4(uvec2(3, 5), new THREE.Vector2());
    assertJoinNode(joinNode, 'uvec4');

    joinNode = uvec4(uvec2(3, 5), 1, 2);
    assertJoinNode(joinNode, 'uvec4');

    joinNode = uvec4(new THREE.Vector3(), 3);
    assertJoinNode(joinNode, 'uvec4');

    joinNode = uvec4(5, uvec3(1, 2, 3));
    assertJoinNode(joinNode, 'uvec4');
});

test('bvec4', async () => {
    await renderer.init();

    let node: THREE.VarNode<'bvec4', THREE.ConstNode<'bvec4', THREE.Vector4>> = bvec4();
    assertConstNode(node, 'bvec4', THREE.Vector4);

    node = bvec4(false);
    assertConstNode(node, 'bvec4', THREE.Vector4);

    node = bvec4(false, true);
    assertConstNode(node, 'bvec4', THREE.Vector4);

    node = bvec4(false, true, false);
    assertConstNode(node, 'bvec4', THREE.Vector4);

    node = bvec4(false, true, false, true);
    assertConstNode(node, 'bvec4', THREE.Vector4);

    node = bvec4(new THREE.Vector4());
    assertConstNode(node, 'bvec4', THREE.Vector4);

    let convertNode: THREE.VarNode<'bvec4', THREE.ConvertNode<'bvec4'>> = bvec4(bool(true));
    assertConvertNode(convertNode, 'bvec4');

    convertNode = bvec4(vec4(1, 2, 3, 4));
    assertConvertNode(convertNode, 'bvec4');

    convertNode = bvec4(ivec4(1, 2, 3, 4));
    assertConvertNode(convertNode, 'bvec4');

    convertNode = bvec4(uvec4(1, 2, 3, 4));
    assertConvertNode(convertNode, 'bvec4');

    convertNode = bvec4(bvec4(false, true, false, true));
    assertConvertNode(convertNode, 'bvec4');

    let joinNode: THREE.VarNode<'bvec4', THREE.JoinNode<'bvec4'>> = bvec4(bool(true), false, true, false);
    assertJoinNode(joinNode, 'bvec4');

    joinNode = bvec4(false, new THREE.Vector2(), bool(true));
    assertJoinNode(joinNode, 'bvec4');

    joinNode = bvec4(false, true, new THREE.Vector2());
    assertJoinNode(joinNode, 'bvec4');

    joinNode = bvec4(bvec2(false, true), new THREE.Vector2());
    assertJoinNode(joinNode, 'bvec4');

    joinNode = bvec4(bvec2(false, true), true, false);
    assertJoinNode(joinNode, 'bvec4');

    joinNode = bvec4(new THREE.Vector3(), false);
    assertJoinNode(joinNode, 'bvec4');

    joinNode = bvec4(false, bvec3(true, false, false));
    assertJoinNode(joinNode, 'bvec4');
});

test('mat2', async () => {
    await renderer.init();

    let node: THREE.VarNode<'mat2', THREE.ConstNode<'mat2', THREE.Matrix2>> = mat2();
    assertConstNode(node, 'mat2', THREE.Matrix2);

    node = mat2(1, 0, 1, 0);
    assertConstNode(node, 'mat2', THREE.Matrix2);

    node = mat2(new THREE.Matrix2());
    assertConstNode(node, 'mat2', THREE.Matrix2);

    let convertNode: THREE.VarNode<'mat2', THREE.ConvertNode<'mat2'>> = mat2(mat2());
    assertConvertNode(convertNode, 'mat2');

    let joinNode: THREE.VarNode<'mat2', THREE.JoinNode<'mat2'>> = mat2(vec2(1, 0), new THREE.Vector2());
    assertJoinNode(joinNode, 'mat2');

    joinNode = mat2(1, 0, 1, float(0));
    assertJoinNode(joinNode, 'mat2');
});

test('mat3', async () => {
    await renderer.init();

    let node: THREE.VarNode<'mat3', THREE.ConstNode<'mat3', THREE.Matrix3>> = mat3();
    assertConstNode(node, 'mat3', THREE.Matrix3);

    node = mat3(1, 0, 0, 0, 1, 0, 0, 0, 1);
    assertConstNode(node, 'mat3', THREE.Matrix3);

    node = mat3(new THREE.Matrix3());
    assertConstNode(node, 'mat3', THREE.Matrix3);

    let convertNode: THREE.VarNode<'mat3', THREE.ConvertNode<'mat3'>> = mat3(mat3());
    assertConvertNode(convertNode, 'mat3');

    let joinNode: THREE.VarNode<'mat3', THREE.JoinNode<'mat3'>> = mat3(
        vec3(1, 0, 0),
        new THREE.Vector3(),
        new THREE.Vector3(),
    );
    assertJoinNode(joinNode, 'mat3');

    joinNode = mat3(1, 0, 0, 0, 1, float(0), 0, 0, 1);
    assertJoinNode(joinNode, 'mat3');
});

test('mat4', async () => {
    await renderer.init();

    let node: THREE.VarNode<'mat4', THREE.ConstNode<'mat4', THREE.Matrix4>> = mat4();
    assertConstNode(node, 'mat4', THREE.Matrix4);

    node = mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    assertConstNode(node, 'mat4', THREE.Matrix4);

    node = mat4(new THREE.Matrix4());
    assertConstNode(node, 'mat4', THREE.Matrix4);

    let convertNode: THREE.VarNode<'mat4', THREE.ConvertNode<'mat4'>> = mat4(mat4());
    assertConvertNode(convertNode, 'mat4');

    let joinNode: THREE.VarNode<'mat4', THREE.JoinNode<'mat4'>> = mat4(
        vec4(1, 0, 0, 0),
        new THREE.Vector4(),
        new THREE.Vector4(),
        new THREE.Vector4(),
    );
    assertJoinNode(joinNode, 'mat4');

    joinNode = mat4(1, 0, 0, 0, 0, 1, float(0), 0, 0, 0, 1, 0, 0, 0, 0, 1);
    assertJoinNode(joinNode, 'mat4');
});

test('conversions', async () => {
    await renderer.init();

    let colorNode: THREE.VarNode<'color', THREE.ConvertNode<'color'>> = color().toColor();
    assertConvertNode(colorNode, 'color');

    colorNode = vec3().toColor();
    assertConvertNode(colorNode, 'color');

    const vec2Node: THREE.VarNode<'vec2', THREE.ConvertNode<'vec2'>> = ivec2().toVec2();
    assertConvertNode(vec2Node, 'vec2');

    const ivec2Node: THREE.VarNode<'ivec2', THREE.ConvertNode<'ivec2'>> = vec2().toIVec2();
    assertConvertNode(ivec2Node, 'ivec2');

    const uvec2Node: THREE.VarNode<'uvec2', THREE.ConvertNode<'uvec2'>> = vec2().toUVec2();
    assertConvertNode(uvec2Node, 'uvec2');

    const bvec2Node: THREE.VarNode<'bvec2', THREE.ConvertNode<'bvec2'>> = vec2().toBVec2();
    assertConvertNode(bvec2Node, 'bvec2');

    const vec3Node: THREE.VarNode<'vec3', THREE.ConvertNode<'vec3'>> = ivec3().toVec3();
    assertConvertNode(vec3Node, 'vec3');

    const ivec3Node: THREE.VarNode<'ivec3', THREE.ConvertNode<'ivec3'>> = vec3().toIVec3();
    assertConvertNode(ivec3Node, 'ivec3');

    const uvec3Node: THREE.VarNode<'uvec3', THREE.ConvertNode<'uvec3'>> = vec3().toUVec3();
    assertConvertNode(uvec3Node, 'uvec3');

    const bvec3Node: THREE.VarNode<'bvec3', THREE.ConvertNode<'bvec3'>> = vec3().toBVec3();
    assertConvertNode(bvec3Node, 'bvec3');

    const vec4Node: THREE.VarNode<'vec4', THREE.ConvertNode<'vec4'>> = ivec4().toVec4();
    assertConvertNode(vec4Node, 'vec4');

    const uvec4Node: THREE.VarNode<'uvec4', THREE.ConvertNode<'uvec4'>> = vec4().toUVec4();
    assertConvertNode(uvec4Node, 'uvec4');

    const ivec4Node: THREE.VarNode<'ivec4', THREE.ConvertNode<'ivec4'>> = vec4().toIVec4();
    assertConvertNode(ivec4Node, 'ivec4');

    const bvec4Node: THREE.VarNode<'bvec4', THREE.ConvertNode<'bvec4'>> = vec4().toBVec4();
    assertConvertNode(bvec4Node, 'bvec4');

    const mat2Node: THREE.VarNode<'mat2', THREE.ConvertNode<'mat2'>> = mat2().toMat2();
    assertConvertNode(mat2Node, 'mat2');

    const mat3Node: THREE.VarNode<'mat3', THREE.ConvertNode<'mat3'>> = mat3().toMat3();
    assertConvertNode(mat3Node, 'mat3');

    const mat4Node: THREE.VarNode<'mat4', THREE.ConvertNode<'mat4'>> = mat4().toMat4();
    assertConvertNode(mat4Node, 'mat4');
});
