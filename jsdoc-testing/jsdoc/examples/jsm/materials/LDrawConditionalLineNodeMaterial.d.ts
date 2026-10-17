/**
 * A special line material for meshes loaded via {@link LDrawLoader}.
 *
 * This module can only be used with {@link WebGPURenderer}. When using {@link WebGLRenderer},
 * import the class from `LDrawConditionalLineMaterial.js`.
 *
 * @augments NodeMaterial
 * @three_import import { LDrawConditionalLineMaterial } from 'three/addons/materials/LDrawConditionalLineMaterial.js';
 */
export class LDrawConditionalLineMaterial extends NodeMaterial {
    /**
     * Constructs a new conditional line material.
     *
     * @param {Object} [parameters] - An object with one or more properties
     * defining the material's appearance. Any property of the material
     * (including any property from inherited materials) can be passed
     * in here. Color values can be passed any type of value accepted
     * by {@link Color#set}.
     */
    constructor(parameters?: Object);
    vertexNode: void;
    fragmentNode: void;
    _diffuseUniform: import("three/webgpu").UniformNode;
    _opacityUniform: import("three/webgpu").UniformNode;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLDrawConditionalLineMaterial: boolean;
}
import { NodeMaterial } from 'three/webgpu';
