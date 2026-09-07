/**
 * A utility class for the WebXR Plane Detection Module. If planes
 * are detected by WebXR, this class will automatically add them
 * as thin box meshes to the scene when below code snippet is used.
 *
 * ```js
 * const planes = new XRPlanes( renderer );
 * scene.add( planes );
 * ```
 *
 * @augments Object3D
 * @three_import import { XRPlanes } from 'three/addons/webxr/XRPlanes.js';
 */
export class XRPlanes extends Object3D {
    /**
     * Constructs a new XR plane container.
     *
     * @param {WebGLRenderer|WebGPURenderer} renderer - The renderer.
     */
    constructor(renderer: WebGLRenderer | WebGPURenderer);
}
import { Object3D } from 'three';
