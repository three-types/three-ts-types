export default AnaglyphPassNode;
export function anaglyphPass(scene: Scene, camera: Camera): AnaglyphPassNode;
/**
 * A render pass node that creates an anaglyph effect using physically-correct
 * off-axis stereo projection.
 *
 * This implementation uses CameraUtils.frameCorners() to align stereo
 * camera frustums to a virtual screen plane, providing accurate depth
 * perception with zero parallax at the plane distance.
 *
 * @augments StereoCompositePassNode
 * @three_import import { anaglyphPass, AnaglyphAlgorithm, AnaglyphColorMode } from 'three/addons/tsl/display/AnaglyphPassNode.js';
 */
declare class AnaglyphPassNode extends StereoCompositePassNode {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isAnaglyphPassNode: boolean;
    /**
     * The interpupillary distance (eye separation) in world units.
     * Typical human IPD is 0.064 meters (64mm).
     *
     * @type {number}
     * @default 0.064
     */
    eyeSep: number;
    /**
     * The distance in world units from the viewer to the virtual
     * screen plane where zero parallax (screen depth) occurs.
     * Objects at this distance appear at the screen surface.
     * Objects closer appear in front of the screen (negative parallax).
     * Objects further appear behind the screen (positive parallax).
     *
     * The screen dimensions are derived from the camera's FOV and aspect ratio
     * at this distance, ensuring the stereo view matches the camera's field of view.
     *
     * @type {number}
     * @default 0.5
     */
    planeDistance: number;
    /**
     * The current anaglyph algorithm.
     *
     * @private
     * @type {string}
     * @default 'dubois'
     */
    private _algorithm;
    /**
     * The current color mode.
     *
     * @private
     * @type {string}
     * @default 'redCyan'
     */
    private _colorMode;
    /**
     * Color matrix node for the left eye.
     *
     * @private
     * @type {UniformNode<mat3>}
     */
    private _colorMatrixLeft;
    /**
     * Color matrix node for the right eye.
     *
     * @private
     * @type {UniformNode<mat3>}
     */
    private _colorMatrixRight;
    /**
     * Sets the anaglyph algorithm.
     *
     * @type {string}
     */
    set algorithm(value: string);
    /**
     * Gets the current anaglyph algorithm.
     *
     * @type {string}
     */
    get algorithm(): string;
    /**
     * Sets the color mode.
     *
     * @type {string}
     */
    set colorMode(value: string);
    /**
     * Gets the current color mode.
     *
     * @type {string}
     */
    get colorMode(): string;
    /**
     * Updates the color matrices based on current algorithm and color mode.
     *
     * @private
     */
    private _updateMatrices;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {PassTextureNode}
     */
    setup(builder: NodeBuilder): PassTextureNode;
}
/**
 * Anaglyph algorithm types.
 */
export type AnaglyphAlgorithm = string;
export namespace AnaglyphAlgorithm {
    let TRUE: string;
    let GREY: string;
    let COLOUR: string;
    let HALF_COLOUR: string;
    let DUBOIS: string;
    let OPTIMISED: string;
    let COMPROMISE: string;
}
/**
 * Anaglyph color modes.
 */
export type AnaglyphColorMode = string;
export namespace AnaglyphColorMode {
    let RED_CYAN: string;
    let MAGENTA_CYAN: string;
    let MAGENTA_GREEN: string;
}
import StereoCompositePassNode from './StereoCompositePassNode.js';
