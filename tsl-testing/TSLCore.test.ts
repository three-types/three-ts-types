import { expect, test } from 'vitest';
import { bool, color, float, int, ivec2, mat2, mat3, mat4, nodeObject, uint, vec2, vec3, vec4 } from 'three/tsl';
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

function assertConstructorNode<TNodeType>(
    node: THREE.VarNode<TNodeType, THREE.ConstNode<TNodeType, unknown>>,
    nodeType: string,
    valueClass?: unknown,
) {
    expect(node).toBeInstanceOf(THREE.VarNode);
    expect(node.getNodeType(nodeBuilder)).toBe(nodeType);
    expect(node.node).toBeInstanceOf(THREE.ConstNode);
    expect(node.node.getNodeType(nodeBuilder)).toBe(nodeType);
    if (valueClass) expect(node.node.value).toBeInstanceOf(valueClass);
}

test('color', () => {
    let node: THREE.VarNode<'color', THREE.ConstNode<'color', THREE.Color>> = color();
    assertConstructorNode(node, 'color', THREE.Color);

    node = color('red');
    assertConstructorNode(node, 'color', THREE.Color);

    node = color(0xff0000);
    assertConstructorNode(node, 'color', THREE.Color);

    node = color(new THREE.Color());
    assertConstructorNode(node, 'color', THREE.Color);

    node = color(0, 100, 255);
    assertConstructorNode(node, 'color', THREE.Color);
});

test('float', () => {
    let node: THREE.VarNode<'float', THREE.ConstNode<'float', number>> = float();
    assertConstructorNode(node, 'float');
    expect(node.node.value).toBeTypeOf('number');

    node = float(5);
    assertConstructorNode(node, 'float');
    expect(node.node.value).toBeTypeOf('number');
});

test('int', () => {
    let node: THREE.VarNode<'int', THREE.ConstNode<'int', number>> = int();
    assertConstructorNode(node, 'int');
    expect(node.node.value).toBeTypeOf('number');

    node = int(5);
    assertConstructorNode(node, 'int');
    expect(node.node.value).toBeTypeOf('number');
});

test('uint', () => {
    let node: THREE.VarNode<'uint', THREE.ConstNode<'uint', number>> = uint();
    assertConstructorNode(node, 'uint');
    expect(node.node.value).toBeTypeOf('number');

    node = uint(5);
    assertConstructorNode(node, 'uint');
    expect(node.node.value).toBeTypeOf('number');
});

test('bool', () => {
    let node: THREE.VarNode<'bool', THREE.ConstNode<'bool', boolean>> = bool();
    assertConstructorNode(node, 'bool');
    expect(node.node.value).toBeTypeOf('boolean');

    node = bool(true);
    assertConstructorNode(node, 'bool');
    expect(node.node.value).toBeTypeOf('boolean');
});

test('vec2', () => {
    let node: THREE.VarNode<'vec2', THREE.ConstNode<'vec2', THREE.Vector2>> = vec2();
    assertConstructorNode(node, 'vec2', THREE.Vector2);

    node = vec2(1);
    assertConstructorNode(node, 'vec2', THREE.Vector2);

    node = vec2(1, 2);
    assertConstructorNode(node, 'vec2', THREE.Vector2);

    node = vec2(new THREE.Vector2());
    assertConstructorNode(node, 'vec2', THREE.Vector2);
});

test('ivec2', () => {
    let node: THREE.VarNode<'ivec2', THREE.ConstNode<'ivec2', THREE.Vector2>> = ivec2(1, 2);
    assertConstructorNode(node, 'ivec2', THREE.Vector2);
});

test('vec3', () => {
    let node: THREE.VarNode<'vec3', THREE.ConstNode<'vec3', THREE.Vector3>> = vec3();
    assertConstructorNode(node, 'vec3', THREE.Vector3);

    node = vec3(1);
    assertConstructorNode(node, 'vec3', THREE.Vector3);

    node = vec3(1, 2);
    assertConstructorNode(node, 'vec3', THREE.Vector3);

    node = vec3(1, 2, 3);
    assertConstructorNode(node, 'vec3', THREE.Vector3);

    node = vec3(new THREE.Vector3());
    assertConstructorNode(node, 'vec3', THREE.Vector3);
});

test('vec4', () => {
    let node: THREE.VarNode<'vec4', THREE.ConstNode<'vec4', THREE.Vector4>> = vec4();
    assertConstructorNode(node, 'vec4', THREE.Vector4);

    node = vec4(1);
    assertConstructorNode(node, 'vec4', THREE.Vector4);

    node = vec4(1, 2);
    assertConstructorNode(node, 'vec4', THREE.Vector4);

    node = vec4(1, 2, 3);
    assertConstructorNode(node, 'vec4', THREE.Vector4);

    node = vec4(1, 2, 3, 4);
    assertConstructorNode(node, 'vec4', THREE.Vector4);

    node = vec4(new THREE.Vector4());
    assertConstructorNode(node, 'vec4', THREE.Vector4);
});

test('mat2', () => {
    let node: THREE.VarNode<'mat2', THREE.ConstNode<'mat2', THREE.Matrix2>> = mat2(new THREE.Matrix2());
    assertConstructorNode(node, 'mat2', THREE.Matrix2);
});

test('mat3', () => {
    let node: THREE.VarNode<'mat3', THREE.ConstNode<'mat3', THREE.Matrix3>> = mat3(new THREE.Matrix3());
    assertConstructorNode(node, 'mat3', THREE.Matrix3);

    node = mat3();
    assertConstructorNode(node, 'mat3', THREE.Matrix3);
});

test('mat4', () => {
    let node: THREE.VarNode<'mat4', THREE.ConstNode<'mat4', THREE.Matrix4>> = mat4(new THREE.Matrix4());
    assertConstructorNode(node, 'mat4', THREE.Matrix4);

    node = mat4();
    assertConstructorNode(node, 'mat4', THREE.Matrix4);
});
