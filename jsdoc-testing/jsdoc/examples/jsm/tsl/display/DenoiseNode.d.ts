export default DenoiseNode;
export function denoise(node: Node, depthNode: Node<any>, normalNode: Node<any> | null, camera: Camera): DenoiseNode;
/**
 * Post processing node for denoising data like raw screen-space ambient occlusion output.
 * Denoise can noticeably improve the quality of ambient occlusion but also add quite some
 * overhead to the post processing setup. It's best to make its usage optional (e.g. via
 * graphic settings).
 *
 * Reference: {@link https://openaccess.thecvf.com/content/WACV2021/papers/Khademi_Self-Supervised_Poisson-Gaussian_Denoising_WACV_2021_paper.pdf}.
 *
 * @augments TempNode
 * @three_import import { denoise } from 'three/addons/tsl/display/DenoiseNode.js';
 */
declare class DenoiseNode extends TempNode {
    /**
     * Constructs a new denoise node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the input of the effect (e.g. AO).
     * @param {Node<float>} depthNode - A node that represents the scene's depth.
     * @param {?Node<vec3>} normalNode - A node that represents the scene's normals.
     * @param {Camera} camera - The camera the scene is rendered with.
     */
    constructor(textureNode: TextureNode, depthNode: Node<any>, normalNode: Node<any> | null, camera: Camera);
    /**
     * The texture node that represents the input of the effect (e.g. AO).
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * A node that represents the scene's depth.
     *
     * @type {Node<float>}
     */
    depthNode: Node<any>;
    /**
     * A node that represents the scene's normals. If no normals are passed to the
     * constructor (because MRT is not available), normals can be automatically
     * reconstructed from depth values in the shader.
     *
     * @type {?Node<vec3>}
     */
    normalNode: Node<any> | null;
    /**
     * The node represents the internal noise texture.
     *
     * @type {TextureNode}
     */
    noiseNode: TextureNode;
    /**
     * The luma Phi value.
     *
     * @type {UniformNode<float>}
     */
    lumaPhi: UniformNode<any>;
    /**
     * The depth Phi value.
     *
     * @type {UniformNode<float>}
     */
    depthPhi: UniformNode<any>;
    /**
     * The normal Phi value.
     *
     * @type {UniformNode<float>}
     */
    normalPhi: UniformNode<any>;
    /**
     * The radius.
     *
     * @type {UniformNode<float>}
     */
    radius: UniformNode<any>;
    /**
     * The index.
     *
     * @type {UniformNode<float>}
     */
    index: UniformNode<any>;
    /**
     * The resolution of the effect.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _resolution;
    /**
     * An array of sample vectors.
     *
     * @private
     * @type {UniformArrayNode<vec3>}
     */
    private _sampleVectors;
    /**
     * Represents the inverse projection matrix of the scene's camera.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _cameraProjectionMatrixInverse;
    /**
     * This method is used to update internal uniforms once per frame.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    updateBefore(): void;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ShaderCallNodeInternal}
     */
    setup(): ShaderCallNodeInternal;
}
import { TempNode } from 'three/webgpu';
