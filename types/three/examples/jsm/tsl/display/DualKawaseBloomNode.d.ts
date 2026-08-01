import { Node, TempNode, TextureNode, UniformNode } from "three/webgpu";

/**
 * Post processing node for creating a bloom effect.
 *
 * The bloom is produced with a Dual Kawase blur: the bright areas are
 * progressively downsampled with a 5-tap filter and then upsampled with an
 * 8-tap filter, accumulating the levels back together.
 * ```js
 * const renderPipeline = new THREE.RenderPipeline( renderer );
 *
 * const scenePass = pass( scene, camera );
 * const scenePassColor = scenePass.getTextureNode( 'output' );
 *
 * const bloomPass = dualKawaseBloom( scenePassColor );
 *
 * renderPipeline.outputNode = scenePassColor.add( bloomPass );
 * ```
 * By default, the node affects the entire image. For a selective bloom,
 * use the `emissive` material property to control which objects should
 * contribute to bloom or not. This can be achieved via MRT.
 * ```js
 * const renderPipeline = new THREE.RenderPipeline( renderer );
 *
 * const scenePass = pass( scene, camera );
 * scenePass.setMRT( mrt( {
 * 	output,
 * 	emissive
 * } ) );
 *
 * const scenePassColor = scenePass.getTextureNode( 'output' );
 * const emissivePass = scenePass.getTextureNode( 'emissive' );
 *
 * const bloomPass = dualKawaseBloom( emissivePass );
 * renderPipeline.outputNode = scenePassColor.add( bloomPass );
 * ```
 * @augments TempNode
 * @three_import import { dualKawaseBloom } from 'three/addons/tsl/display/DualKawaseBloomNode.js';
 */
declare class DualKawaseBloomNode extends TempNode<"vec4"> {
    /**
     * Constructs a new bloom node.
     *
     * @param {Node<vec4>} inputNode - The node that represents the input of the effect.
     * @param {number} [strength=1] - The strength of the bloom.
     * @param {number} [radius=0] - The radius of the bloom.
     * @param {number} [threshold=0] - The luminance threshold limits which bright areas contribute to the bloom effect.
     */
    constructor(
        inputNode: Node<"vec4">,
        strength?: UniformNode<"float", number> | number,
        radius?: UniformNode<"float", number> | number,
        threshold?: UniformNode<"float", number> | number,
    );
    /**
     * The node that represents the input of the effect.
     *
     * @type {Node<vec4>}
     */
    inputNode: Node<"vec4">;
    /**
     * The strength of the bloom.
     *
     * @type {UniformNode<float>}
     */
    strength: UniformNode<"float", number>;
    /**
     * The radius of the bloom. Must be in the range `[0,1]`.
     *
     * @type {UniformNode<float>}
     */
    radius: UniformNode<"float", number>;
    /**
     * The luminance threshold limits which bright areas contribute to the bloom effect.
     *
     * @type {UniformNode<float>}
     */
    threshold: UniformNode<"float", number>;
    /**
     * Can be used to tweak the extracted luminance from the scene.
     *
     * @type {UniformNode<float>}
     */
    smoothWidth: UniformNode<"float", number>;
    /**
     * Can be used to inject a custom high pass filter (e.g., for anamorphic effects).
     *
     * @type {Function}
     */
    highPassFn: (
        params: {
            input: Node<"vec4">;
            threshold: UniformNode<"float", number>;
            smoothWidth: UniformNode<"float", number>;
        },
    ) => void;
    /**
     * Returns the result of the effect as a texture node.
     *
     * @return {PassTextureNode} A texture node that represents the result of the effect.
     */
    getTextureNode(): TextureNode;
    /**
     * Sets the resolution scale for the pass.
     * The resolution scale is a factor that is multiplied with the renderer's width and height.
     *
     * @param {number} resolutionScale - The resolution scale to set. A value of `1` means full resolution.
     * @return {DualKawaseBloomNode} A reference to this node.
     */
    setResolutionScale(resolutionScale: number): this;
    /**
     * Gets the current resolution scale of the pass.
     *
     * @return {number} The current resolution scale. A value of `1` means full resolution.
     */
    getResolutionScale(): number;
    /**
     * Sets the size of the effect.
     *
     * @param {number} width - The width of the effect.
     * @param {number} height - The height of the effect.
     */
    setSize(width: number, height: number): void;
}

export default DualKawaseBloomNode;

export function dualKawaseBloom(
    node: Node<"vec4">,
    strength?: UniformNode<"float", number> | number,
    radius?: UniformNode<"float", number> | number,
    threshold?: UniformNode<"float", number> | number,
): DualKawaseBloomNode;
