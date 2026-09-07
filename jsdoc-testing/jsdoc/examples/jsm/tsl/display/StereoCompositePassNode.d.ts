export default StereoCompositePassNode;
/**
 * A special (abstract) render pass node that renders the scene
 * as a stereoscopic image. Unlike {@link StereoPassNode}, this
 * node merges the image for the left and right eye
 * into a single one. That is required for effects like
 * anaglyph or parallax barrier.
 *
 * @abstract
 * @augments PassNode
 * @three_import import { StereoCompositePassNode } from 'three/addons/tsl/display/StereoCompositePassNode.js';
 */
declare class StereoCompositePassNode extends PassNode {
    /**
     * Constructs a new stereo composite pass node.
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
    readonly isStereoCompositePassNode: boolean;
    /**
     * The internal stereo camera that is used to render the scene.
     *
     * @type {StereoCamera}
     */
    stereo: StereoCamera;
    /**
     * The render target for rendering the left eye's view.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetL;
    /**
     * The render target for rendering the right eye's view.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetR;
    /**
     * A texture node representing the left's eye view.
     *
     * @private
     * @type {TextureNode}
     */
    private _mapLeft;
    /**
     * A texture node representing the right's eye view.
     *
     * @private
     * @type {TextureNode}
     */
    private _mapRight;
    /**
     * The node material that implements the composite. All
     * derived effect passes must provide an instance for rendering.
     *
     * @private
     * @type {?NodeMaterial}
     * @default null
     */
    private _material;
    /**
     * Updates the internal stereo camera.
     *
     * @param {number} coordinateSystem - The current coordinate system.
     */
    updateStereoCamera(coordinateSystem: number): void;
    /**
     * This method is used to render the effect once per frame.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    updateBefore(frame: NodeFrame): void;
}
import { PassNode } from 'three/webgpu';
import { StereoCamera } from 'three/webgpu';
