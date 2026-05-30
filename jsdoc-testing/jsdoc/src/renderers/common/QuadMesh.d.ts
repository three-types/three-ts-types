export default QuadMesh;
/**
 * This module is a helper for passes which need to render a full
 * screen effect which is quite common in context of post processing.
 *
 * The intended usage is to reuse a single quad mesh for rendering
 * subsequent passes by just reassigning the `material` reference.
 *
 * Note: This module can only be used with `WebGPURenderer`.
 *
 * @augments Mesh
 */
declare class QuadMesh extends Mesh {
    /**
     * Constructs a new quad mesh.
     *
     * @param {?Material} [material=null] - The material to render the quad mesh with.
     */
    constructor(material?: Material | null);
    /**
     * The camera to render the quad mesh with.
     *
     * @type {OrthographicCamera}
     * @readonly
     */
    readonly camera: OrthographicCamera;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isQuadMesh: boolean;
    /**
     * Async version of `render()`.
     *
     * @async
     * @deprecated
     * @param {Renderer} renderer - The renderer.
     * @return {Promise} A Promise that resolves when the render has been finished.
     */
    renderAsync(renderer: Renderer): Promise<any>;
    /**
     * Renders the quad mesh
     *
     * @param {Renderer} renderer - The renderer.
     */
    render(renderer: Renderer): void;
}
import { Mesh } from '../../objects/Mesh.js';
import { OrthographicCamera } from '../../cameras/OrthographicCamera.js';
