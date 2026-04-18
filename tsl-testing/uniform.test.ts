import { expect, test } from 'vitest';
import { uniform } from 'three/tsl';
import * as THREE from 'three/webgpu';

const renderer = new THREE.WebGPURenderer();
const nodeBuilder: THREE.NodeBuilder = renderer.backend.createNodeBuilder(null!, renderer);

function assertUniformNode(node: THREE.UniformNode<string, unknown>, nodeType: string) {
    expect(node).toBeInstanceOf(THREE.UniformNode);
    expect(node.getNodeType(nodeBuilder)).toBe(nodeType);
}

test('uniform("float")', () => {
    const node: THREE.UniformNode<'float', number> = uniform('float');
    assertUniformNode(node, 'float');
    const value: number = node.value;
    expect(value).toBeTypeOf('number');
});

test('uniform("int")', () => {
    const node: THREE.UniformNode<'int', number> = uniform('int');
    assertUniformNode(node, 'int');
    const value: number = node.value;
    expect(value).toBeTypeOf('number');
});

test('uniform("uint")', () => {
    const node: THREE.UniformNode<'uint', number> = uniform('uint');
    assertUniformNode(node, 'uint');
    const value: number = node.value;
    expect(value).toBeTypeOf('number');
});

test('uniform("bool")', () => {
    const node: THREE.UniformNode<'bool', boolean> = uniform('bool');
    assertUniformNode(node, 'bool');
    const value: boolean = node.value;
    expect(value).toBeTypeOf('boolean');
});

test('uniform("vec2")', () => {
    const node: THREE.UniformNode<'vec2', THREE.Vector2> = uniform('vec2');
    assertUniformNode(node, 'vec2');
    const value: THREE.Vector2 = node.value;
    expect(value).toBeInstanceOf(THREE.Vector2);
});

test('uniform("vec3")', () => {
    const node: THREE.UniformNode<'vec3', THREE.Vector3> = uniform('vec3');
    assertUniformNode(node, 'vec3');
    const value: THREE.Vector3 = node.value;
    expect(value).toBeInstanceOf(THREE.Vector3);
});

test('uniform("vec4")', () => {
    const node: THREE.UniformNode<'vec4', THREE.Vector4> = uniform('vec4');
    assertUniformNode(node, 'vec4');
    const value: THREE.Vector4 = node.value;
    expect(value).toBeInstanceOf(THREE.Vector4);
});

test('uniform("color")', () => {
    const node: THREE.UniformNode<'color', THREE.Color> = uniform('color');
    assertUniformNode(node, 'color');
    const value: THREE.Color = node.value;
    expect(value).toBeInstanceOf(THREE.Color);
});

test('uniform("mat3")', () => {
    const node: THREE.UniformNode<'mat3', THREE.Matrix3> = uniform('mat3');
    assertUniformNode(node, 'mat3');
    const value: THREE.Matrix3 = node.value;
    expect(value).toBeInstanceOf(THREE.Matrix3);
});

test('uniform("mat4")', () => {
    const node: THREE.UniformNode<'mat4', THREE.Matrix4> = uniform('mat4');
    assertUniformNode(node, 'mat4');
    const value: THREE.Matrix4 = node.value;
    expect(value).toBeInstanceOf(THREE.Matrix4);
});

test('uniform(number)', () => {
    const node: THREE.UniformNode<'float', number> = uniform(1.0);
    assertUniformNode(node, 'float');
    const value: number = node.value;
    expect(value).toBe(1.0);
});

test('uniform(boolean)', () => {
    const node: THREE.UniformNode<'bool', boolean> = uniform(true);
    assertUniformNode(node, 'bool');
    const value: boolean = node.value;
    expect(value).toBe(true);
});

test('uniform(Vector2)', () => {
    const v = new THREE.Vector2(1, 2);
    const node: THREE.UniformNode<'vec2', THREE.Vector2> = uniform(v);
    assertUniformNode(node, 'vec2');
    const value: THREE.Vector2 = node.value;
    expect(value).toBeInstanceOf(THREE.Vector2);
    expect(value).toBe(v);
});

test('uniform(Vector3)', () => {
    const v = new THREE.Vector3(1, 2, 3);
    const node: THREE.UniformNode<'vec3', THREE.Vector3> = uniform(v);
    assertUniformNode(node, 'vec3');
    const value: THREE.Vector3 = node.value;
    expect(value).toBeInstanceOf(THREE.Vector3);
    expect(value).toBe(v);
});

test('uniform(Vector4)', () => {
    const v = new THREE.Vector4(1, 2, 3, 4);
    const node: THREE.UniformNode<'vec4', THREE.Vector4> = uniform(v);
    assertUniformNode(node, 'vec4');
    const value: THREE.Vector4 = node.value;
    expect(value).toBeInstanceOf(THREE.Vector4);
    expect(value).toBe(v);
});

test('uniform(Color)', () => {
    const c = new THREE.Color(0xff0000);
    const node: THREE.UniformNode<'color', THREE.Color> = uniform(c);
    assertUniformNode(node, 'color');
    const value: THREE.Color = node.value;
    expect(value).toBeInstanceOf(THREE.Color);
    expect(value).toBe(c);
});

test('uniform(Matrix3)', () => {
    const m = new THREE.Matrix3();
    const node: THREE.UniformNode<'mat3', THREE.Matrix3> = uniform(m);
    assertUniformNode(node, 'mat3');
    const value: THREE.Matrix3 = node.value;
    expect(value).toBeInstanceOf(THREE.Matrix3);
    expect(value).toBe(m);
});

test('uniform(Matrix4)', () => {
    const m = new THREE.Matrix4();
    const node: THREE.UniformNode<'mat4', THREE.Matrix4> = uniform(m);
    assertUniformNode(node, 'mat4');
    const value: THREE.Matrix4 = node.value;
    expect(value).toBeInstanceOf(THREE.Matrix4);
    expect(value).toBe(m);
});
