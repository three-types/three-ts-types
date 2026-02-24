import { expect, test } from 'vitest';
import { color, float, nodeObject, vec3 } from 'three/tsl';
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

test('color', () => {
    let varNodeColor: THREE.VarNode<"color", THREE.ConstNode<"color", THREE.Color>> = color();
    expect(varNodeColor).toBeInstanceOf(THREE.Node);
    expect(varNodeColor.getNodeType(nodeBuilder)).toBe('color');
    expect(varNodeColor.node).toBeInstanceOf(THREE.ConstNode);
    expect(varNodeColor.node.getNodeType(nodeBuilder)).toBe('color');

    varNodeColor = color('red');
    expect(varNodeColor).toBeInstanceOf(THREE.Node);
    expect(varNodeColor.getNodeType(nodeBuilder)).toBe('color');
    expect(varNodeColor.node).toBeInstanceOf(THREE.ConstNode);
    expect(varNodeColor.node.getNodeType(nodeBuilder)).toBe('color');

    varNodeColor = color(0xff0000);
    expect(varNodeColor).toBeInstanceOf(THREE.Node);
    expect(varNodeColor.getNodeType(nodeBuilder)).toBe('color');
    expect(varNodeColor.node).toBeInstanceOf(THREE.ConstNode);
    expect(varNodeColor.node.getNodeType(nodeBuilder)).toBe('color');

    varNodeColor = color(new THREE.Color());
    expect(varNodeColor).toBeInstanceOf(THREE.Node);
    expect(varNodeColor.getNodeType(nodeBuilder)).toBe('color');
    expect(varNodeColor.node).toBeInstanceOf(THREE.ConstNode);
    expect(varNodeColor.node.getNodeType(nodeBuilder)).toBe('color');

    varNodeColor = color(0, 100, 255);
    expect(varNodeColor).toBeInstanceOf(THREE.Node);
    expect(varNodeColor.getNodeType(nodeBuilder)).toBe('color');
    expect(varNodeColor.node).toBeInstanceOf(THREE.ConstNode);
    expect(varNodeColor.node.getNodeType(nodeBuilder)).toBe('color');
});

test('float', () => {
    let varNodeFloat: THREE.VarNode<"float", THREE.ConstNode<"float", number>> = float();
    expect(varNodeFloat).toBeInstanceOf(THREE.Node);
    expect(varNodeFloat.getNodeType(nodeBuilder)).toBe('float');
    expect(varNodeFloat.node).toBeInstanceOf(THREE.ConstNode);
    expect(varNodeFloat.node.getNodeType(nodeBuilder)).toBe('float');

    varNodeFloat = float(5);
    expect(varNodeFloat).toBeInstanceOf(THREE.Node);
    expect(varNodeFloat.getNodeType(nodeBuilder)).toBe('float');
    expect(varNodeFloat.node).toBeInstanceOf(THREE.ConstNode);
    expect(varNodeFloat.node.getNodeType(nodeBuilder)).toBe('float');
});
