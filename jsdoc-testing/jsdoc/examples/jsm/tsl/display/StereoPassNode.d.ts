export default StereoPassNode;
export function stereoPass(scene: Scene, camera: Camera): StereoPassNode;
/**
 * A special render pass node that renders the scene as a stereoscopic image.
 *
 * @augments PassNode
 * @three_import import { stereoPass } from 'three/addons/tsl/display/StereoPassNode.js';
 */
declare class StereoPassNode extends PassNode {
    /**
     * Constructs a new stereo pass node.
     *
     * @param {Scene} scene - The scene to render.
     * @param {Camera} camera - The camera to render the scene with.
     */
    constructor(scene: Scene, camera: Camera);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStereoPassNode: boolean;
    /**
     * The internal stereo camera that is used to render the scene.
     *
     * @type {StereoCamera}
     */
    stereo: StereoCamera;
    /**
     * This method is used to render the stereo effect once per frame.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    updateBefore(frame: NodeFrame): void;
}
import { PassNode } from 'three/webgpu';
import { StereoCamera } from 'three/webgpu';
