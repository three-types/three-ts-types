export default GodraysNode;
export function godrays(depthNode: TextureNode, camera: Camera, light: (DirectionalLight | PointLight)): GodraysNode;
/**
 * Post-Processing node for apply Screen-space raymarched godrays to a scene.
 *
 * After the godrays have been computed, it's recommened to apply a Bilateral
 * Blur to the result to mitigate raymarching and noise artifacts.
 *
 * The composite with the scene pass is ideally done with `depthAwareBlend()`,
 * which mitigates aliasing and light leaking.
 *
 * ```js
 * const godraysPass = godrays( scenePassDepth, camera, light );
 *
 * const blurPass = bilateralBlur( godraysPassColor ); // optional blur
 *
 * const outputBlurred = depthAwareBlend( scenePassColor, blurPassColor, scenePassDepth, camera, { blendColor, edgeRadius, edgeStrength } ); // composite
 * ```
 *
 * Limitations:
 *
 * - Only point and directional lights are currently supported.
 * - The effect requires a full shadow setup. Meaning shadows must be enabled in the renderer,
 * 3D objects must cast and receive shadows and the main light must cast shadows.
 *
 * Reference: This Node is a part of [three-good-godrays](https://github.com/Ameobea/three-good-godrays).
 *
 * @augments TempNode
 * @three_import import { godrays } from 'three/addons/tsl/display/GodraysNode.js';
 */
declare class GodraysNode extends TempNode {
    /**
     * Constructs a new Godrays node.
     *
     * @param {TextureNode} depthNode - A texture node that represents the scene's depth.
     * @param {Camera} camera - The camera the scene is rendered with.
     * @param {(DirectionalLight|PointLight)} light - The light the godrays are rendered for.
     */
    constructor(depthNode: TextureNode, camera: Camera, light: (DirectionalLight | PointLight));
    /**
     * A node that represents the beauty pass's depth.
     *
     * @type {TextureNode}
     */
    depthNode: TextureNode;
    /**
     * The number of raymarching steps
     *
     * @type {UniformNode<uint>}
     * @default 60
     */
    raymarchSteps: UniformNode<any>;
    /**
     * The rate of accumulation for the godrays.  Higher values roughly equate to more humid air/denser fog.
     *
     * @type {UniformNode<float>}
     * @default 0.7
     */
    density: UniformNode<any>;
    /**
     * The maximum density of the godrays.  Limits the maximum brightness of the godrays.
     *
     * @type {UniformNode<float>}
     * @default 0.5
     */
    maxDensity: UniformNode<any>;
    /**
     * Higher values decrease the accumulation of godrays the further away they are from the light source.
     *
     * @type {UniformNode<float>}
     * @default 2
     */
    distanceAttenuation: UniformNode<any>;
    /**
     * The resolution scale.
     *
     * @type {number}
     */
    resolutionScale: number;
    /**
     * Represents the world matrix of the scene's camera.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _cameraMatrixWorld;
    /**
     * Represents the inverse projection matrix of the scene's camera.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _cameraProjectionMatrixInverse;
    /**
     * Represents the inverse projection matrix of the scene's camera.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _premultipliedLightCameraMatrix;
    /**
     * Represents the world position of the scene's camera.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _cameraPosition;
    /**
     * Represents the near value of the scene's camera.
     *
     * @private
     * @type {ReferenceNode<float>}
     */
    private _cameraNear;
    /**
     * Represents the far value of the scene's camera.
     *
     * @private
     * @type {ReferenceNode<float>}
     */
    private _cameraFar;
    /**
     * The near value of the shadow camera.
     *
     * @private
     * @type {ReferenceNode<float>}
     */
    private _shadowCameraNear;
    /**
     * The far value of the shadow camera.
     *
     * @private
     * @type {ReferenceNode<float>}
     */
    private _shadowCameraFar;
    _fNormals: import("three/webgpu").UniformArrayNode;
    _fConstants: import("three/webgpu").UniformArrayNode;
    /**
     * The light the godrays are rendered for.
     *
     * @private
     * @type {(DirectionalLight|PointLight)}
     */
    private _light;
    /**
     * The camera the scene is rendered with.
     *
     * @private
     * @type {Camera}
     */
    private _camera;
    /**
     * The render target the godrays are rendered into.
     *
     * @private
     * @type {RenderTarget}
     */
    private _godraysRenderTarget;
    /**
     * The material that is used to render the effect.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _material;
    /**
     * The result of the effect is represented as a separate texture node.
     *
     * @private
     * @type {PassTextureNode}
     */
    private _textureNode;
    /**
     * Returns the result of the effect as a texture node.
     *
     * @return {PassTextureNode} A texture node that represents the result of the effect.
     */
    getTextureNode(): PassTextureNode;
    /**
     * Sets the size of the effect.
     *
     * @param {number} width - The width of the effect.
     * @param {number} height - The height of the effect.
     */
    setSize(width: number, height: number): void;
    /**
     * This method is used to render the effect once per frame.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    updateBefore(frame: NodeFrame): void;
    _updateLightParams(): void;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {PassTextureNode}
     */
    setup(builder: NodeBuilder): PassTextureNode;
}
import { TempNode } from 'three/webgpu';
