export function pixelationPass(scene: Scene, camera: Camera, pixelSize?: Node<any> | number, normalEdgeStrength?: Node<any> | number, depthEdgeStrength?: Node<any> | number): PixelationPassNode;
export default PixelationPassNode;
/**
 * A special render pass node that renders the scene with a pixelation effect.
 *
 * @augments PassNode
 * @three_import import { pixelationPass } from 'three/addons/tsl/display/PixelationPassNode.js';
 */
declare class PixelationPassNode extends PassNode {
    /**
     * Constructs a new pixelation pass node.
     *
     * @param {Scene} scene - The scene to render.
     * @param {Camera} camera - The camera to render the scene with.
     * @param {Node<float> | number} [pixelSize=6] - The pixel size.
     * @param {Node<float> | number} [normalEdgeStrength=0.3] - The normal edge strength.
     * @param {Node<float> | number} [depthEdgeStrength=0.4] - The depth edge strength.
     */
    constructor(scene: Scene, camera: Camera, pixelSize?: Node<any> | number, normalEdgeStrength?: Node<any> | number, depthEdgeStrength?: Node<any> | number);
    /**
     * The pixel size.
     *
     * @type {number}
     * @default 6
     */
    pixelSize: number;
    /**
     * The normal edge strength.
     *
     * @type {number}
     * @default 0.3
     */
    normalEdgeStrength: number;
    /**
     * The depth edge strength.
     *
     * @type {number}
     * @default 0.4
     */
    depthEdgeStrength: number;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPixelationPassNode: boolean;
    _mrt: any;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {PixelationNode}
     */
    setup(): PixelationNode;
}
import { PassNode } from 'three/webgpu';
/**
 * A inner node definition that implements the actual pixelation TSL code.
 *
 * @inner
 * @augments TempNode
 */
declare class PixelationNode extends TempNode {
    /**
     * Constructs a new pixelation node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the beauty pass.
     * @param {TextureNode} depthNode - The texture that represents the beauty's depth.
     * @param {TextureNode} normalNode - The texture that represents the beauty's normals.
     * @param {Node<float>} pixelSize - The pixel size.
     * @param {Node<float>} normalEdgeStrength - The normal edge strength.
     * @param {Node<float>} depthEdgeStrength - The depth edge strength.
     */
    constructor(textureNode: TextureNode, depthNode: TextureNode, normalNode: TextureNode, pixelSize: Node<any>, normalEdgeStrength: Node<any>, depthEdgeStrength: Node<any>);
    /**
     * The texture node that represents the beauty pass.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * The texture that represents the beauty's depth.
     *
     * @type {TextureNode}
     */
    depthNode: TextureNode;
    /**
     * The texture that represents the beauty's normals.
     *
     * @type {TextureNode}
     */
    normalNode: TextureNode;
    /**
     * The pixel size.
     *
     * @type {Node<float>}
     */
    pixelSize: Node<any>;
    /**
     * The pixel size.
     *
     * @type {Node<float>}
     */
    normalEdgeStrength: Node<any>;
    /**
     * The depth edge strength.
     *
     * @type {Node<float>}
     */
    depthEdgeStrength: Node<any>;
    /**
     * Uniform node that represents the resolution.
     *
     * @private
     * @type {Node<vec4>}
     */
    private _resolution;
    /**
     * This method is used to update uniforms once per frame.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    update(): void;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ShaderCallNodeInternal}
     */
    setup(): ShaderCallNodeInternal;
}
import { TempNode } from 'three/webgpu';
