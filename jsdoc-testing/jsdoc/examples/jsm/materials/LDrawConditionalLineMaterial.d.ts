/**
 * A special line material for meshes loaded via {@link LDrawLoader}.
 *
 * This module can only be used with {@link WebGLRenderer}. When using {@link WebGPURenderer},
 * import the class from `LDrawConditionalLineNodeMaterial.js`.
 *
 * @augments ShaderMaterial
 * @three_import import { LDrawConditionalLineMaterial } from 'three/addons/materials/LDrawConditionalLineMaterial.js';
 */
export class LDrawConditionalLineMaterial extends ShaderMaterial {
    static get type(): string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLDrawConditionalLineMaterial: boolean;
}
import { ShaderMaterial } from 'three';
