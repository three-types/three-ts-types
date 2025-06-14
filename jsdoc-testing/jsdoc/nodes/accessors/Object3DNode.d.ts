export default Object3DNode;
/**
 * TSL function for creating an object 3D node that represents the object's direction in world space.
 *
 * @tsl
 * @function
 * @param {?Object3D} [object3d] - The 3D object.
 * @returns {Object3DNode<vec3>}
 */
export const objectDirection: any;
/**
 * TSL function for creating an object 3D node that represents the object's world matrix.
 *
 * @tsl
 * @function
 * @param {?Object3D} [object3d] - The 3D object.
 * @returns {Object3DNode<mat4>}
 */
export const objectWorldMatrix: any;
/**
 * TSL function for creating an object 3D node that represents the object's position in world space.
 *
 * @tsl
 * @function
 * @param {?Object3D} [object3d] - The 3D object.
 * @returns {Object3DNode<vec3>}
 */
export const objectPosition: any;
/**
 * TSL function for creating an object 3D node that represents the object's scale in world space.
 *
 * @tsl
 * @function
 * @param {?Object3D} [object3d] - The 3D object.
 * @returns {Object3DNode<vec3>}
 */
export const objectScale: any;
/**
 * TSL function for creating an object 3D node that represents the object's position in view/camera space.
 *
 * @tsl
 * @function
 * @param {?Object3D} [object3d] - The 3D object.
 * @returns {Object3DNode<vec3>}
 */
export const objectViewPosition: any;
/**
 * TSL function for creating an object 3D node that represents the object's radius.
 *
 * @tsl
 * @function
 * @param {?Object3D} [object3d] - The 3D object.
 * @returns {Object3DNode<float>}
 */
export const objectRadius: any;
/**
 * This node can be used to access transformation related metrics of 3D objects.
 * Depending on the selected scope, a different metric is represented as a uniform
 * in the shader. The following scopes are supported:
 *
 * - `POSITION`: The object's position in world space.
 * - `VIEW_POSITION`: The object's position in view/camera space.
 * - `DIRECTION`: The object's direction in world space.
 * - `SCALE`: The object's scale in world space.
 * - `WORLD_MATRIX`: The object's matrix in world space.
 *
 * @augments Node
 */
declare class Object3DNode extends Node {
    /**
     * Constructs a new object 3D node.
     *
     * @param {('position'|'viewPosition'|'direction'|'scale'|'worldMatrix')} scope - The node represents a different type of transformation depending on the scope.
     * @param {?Object3D} [object3d=null] - The 3D object.
     */
    constructor(scope: ("position" | "viewPosition" | "direction" | "scale" | "worldMatrix"), object3d?: Object3D | null);
    /**
     * The node reports a different type of transformation depending on the scope.
     *
     * @type {('position'|'viewPosition'|'direction'|'scale'|'worldMatrix')}
     */
    scope: ("position" | "viewPosition" | "direction" | "scale" | "worldMatrix");
    /**
     * The 3D object.
     *
     * @type {?Object3D}
     * @default null
     */
    object3d: Object3D | null;
    /**
     * Holds the value of the node as a uniform.
     *
     * @type {UniformNode}
     */
    uniformNode: UniformNode;
    /**
     * Overwritten since the node type is inferred from the scope.
     *
     * @return {string} The node type.
     */
    getNodeType(): string;
    /**
     * Updates the uniform value depending on the scope.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    update(frame: NodeFrame): void;
    /**
     * Generates the code snippet of the uniform node. The node type of the uniform
     * node also depends on the selected scope.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated code snippet.
     */
    generate(builder: NodeBuilder): string;
    serialize(data: any): void;
    deserialize(data: any): void;
}
declare namespace Object3DNode {
    let WORLD_MATRIX: string;
    let POSITION: string;
    let SCALE: string;
    let VIEW_POSITION: string;
    let DIRECTION: string;
    let RADIUS: string;
}
import Node from '../core/Node.js';
import UniformNode from '../core/UniformNode.js';
