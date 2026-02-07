export default ModelNode;
/**
 * TSL object that represents the object's direction in world space.
 *
 * @tsl
 * @type {ModelNode<vec3>}
 */
export const modelDirection: ModelNode<vec3>;
/**
 * TSL object that represents the object's world matrix.
 *
 * @tsl
 * @type {ModelNode<mat4>}
 */
export const modelWorldMatrix: ModelNode<mat4>;
/**
 * TSL object that represents the object's position in world space.
 *
 * @tsl
 * @type {ModelNode<vec3>}
 */
export const modelPosition: ModelNode<vec3>;
/**
 * TSL object that represents the object's scale in world space.
 *
 * @tsl
 * @type {ModelNode<vec3>}
 */
export const modelScale: ModelNode<vec3>;
/**
 * TSL object that represents the object's position in view/camera space.
 *
 * @tsl
 * @type {ModelNode<vec3>}
 */
export const modelViewPosition: ModelNode<vec3>;
/**
 * TSL object that represents the object's radius.
 *
 * @tsl
 * @type {ModelNode<float>}
 */
export const modelRadius: ModelNode<float>;
/**
 * TSL object that represents the object's normal matrix.
 *
 * @tsl
 * @type {UniformNode<mat3>}
 */
export const modelNormalMatrix: UniformNode<mat3>;
/**
 * TSL object that represents the object's inverse world matrix.
 *
 * @tsl
 * @type {UniformNode<mat4>}
 */
export const modelWorldMatrixInverse: UniformNode<mat4>;
/**
 * TSL object that represents the object's model view matrix.
 *
 * @tsl
 * @type {Node<mat4>}
 */
export const modelViewMatrix: Node<mat4>;
/**
 * TSL object that represents the object's model view in `mediump` precision.
 *
 * @tsl
 * @type {Node<mat4>}
 */
export const mediumpModelViewMatrix: Node<mat4>;
/**
 * TSL object that represents the object's model view in `highp` precision
 * which is achieved by computing the matrix in JS and not in the shader.
 *
 * @tsl
 * @type {Node<mat4>}
 */
export const highpModelViewMatrix: Node<mat4>;
/**
 * TSL object that represents the object's model normal view in `highp` precision
 * which is achieved by computing the matrix in JS and not in the shader.
 *
 * @tsl
 * @type {Node<mat3>}
 */
export const highpModelNormalViewMatrix: Node<mat3>;
/**
 * This type of node is a specialized version of `Object3DNode`
 * with larger set of model related metrics. Unlike `Object3DNode`,
 * `ModelNode` extracts the reference to the 3D object from the
 * current node frame state.
 *
 * @augments Object3DNode
 */
declare class ModelNode extends Object3DNode {
    /**
     * Constructs a new object model node.
     *
     * @param {('position'|'viewPosition'|'direction'|'scale'|'worldMatrix')} scope - The node represents a different type of transformation depending on the scope.
     */
    constructor(scope: ("position" | "viewPosition" | "direction" | "scale" | "worldMatrix"));
}
import Object3DNode from './Object3DNode.js';
