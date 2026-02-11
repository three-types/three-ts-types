export default PassNode;
export function pass(scene: Scene, camera: Camera, options: Object): PassNode;
export function passTexture(pass: PassNode, texture: Texture): PassTextureNode;
export function depthPass(scene: Scene, camera: Camera, options: Object): PassNode;
/**
 * Represents a render pass (sometimes called beauty pass) in context of post processing.
 * This pass produces a render for the given scene and camera and can provide multiple outputs
 * via MRT for further processing.
 *
 * ```js
 * const postProcessing = new RenderPipeline( renderer );
 *
 * const scenePass = pass( scene, camera );
 *
 * postProcessing.outputNode = scenePass;
 * ```
 *
 * @augments TempNode
 */
declare class PassNode extends TempNode {
    /**
     * Constructs a new pass node.
     *
     * @param {('color'|'depth')} scope - The scope of the pass. The scope determines whether the node outputs color or depth.
     * @param {Scene} scene - A reference to the scene.
     * @param {Camera} camera - A reference to the camera.
     * @param {Object} options - Options for the internal render target.
     */
    constructor(scope: ("color" | "depth"), scene: Scene, camera: Camera, options?: Object);
    /**
     * The scope of the pass. The scope determines whether the node outputs color or depth.
     *
     * @type {('color'|'depth')}
     */
    scope: ("color" | "depth");
    /**
     * A reference to the scene.
     *
     * @type {Scene}
     */
    scene: Scene;
    /**
     * A reference to the camera.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * Options for the internal render target.
     *
     * @type {Object}
     */
    options: Object;
    /**
     * The pass's pixel ratio. Will be kept automatically kept in sync with the renderer's pixel ratio.
     *
     * @private
     * @type {number}
     * @default 1
     */
    private _pixelRatio;
    /**
     * The pass's pixel width. Will be kept automatically kept in sync with the renderer's width.
     * @private
     * @type {number}
     * @default 1
     */
    private _width;
    /**
     * The pass's pixel height. Will be kept automatically kept in sync with the renderer's height.
     * @private
     * @type {number}
     * @default 1
     */
    private _height;
    /**
     * The pass's render target.
     *
     * @type {RenderTarget}
     */
    renderTarget: RenderTarget;
    /**
     * An optional override material for the pass.
     *
     * @type {Material|null}
     */
    overrideMaterial: Material | null;
    /**
     * Whether the pass is transparent.
     *
     * @type {boolean}
     * @default false
     */
    transparent: boolean;
    /**
     * Whether the pass is opaque.
     *
     * @type {boolean}
     * @default true
     */
    opaque: boolean;
    /**
     * An optional global context for the pass.
     *
     * @type {ContextNode|null}
     */
    contextNode: ContextNode | null;
    /**
     * A cache for the context node.
     *
     * @private
     * @type {?Object}
     * @default null
     */
    private _contextNodeCache;
    /**
     * A dictionary holding the internal result textures.
     *
     * @private
     * @type {Object<string, Texture>}
     */
    private _textures;
    /**
     * A dictionary holding the internal texture nodes.
     *
     * @private
     * @type {Object<string, TextureNode>}
     */
    private _textureNodes;
    /**
     * A dictionary holding the internal depth nodes.
     *
     * @private
     * @type {Object}
     */
    private _linearDepthNodes;
    /**
     * A dictionary holding the internal viewZ nodes.
     *
     * @private
     * @type {Object}
     */
    private _viewZNodes;
    /**
     * A dictionary holding the texture data of the previous frame.
     * Used for computing velocity/motion vectors.
     *
     * @private
     * @type {Object<string, Texture>}
     */
    private _previousTextures;
    /**
     * A dictionary holding the texture nodes of the previous frame.
     * Used for computing velocity/motion vectors.
     *
     * @private
     * @type {Object<string, TextureNode>}
     */
    private _previousTextureNodes;
    /**
     * The `near` property of the camera as a uniform.
     *
     * @private
     * @type {UniformNode}
     */
    private _cameraNear;
    /**
     * The `far` property of the camera as a uniform.
     *
     * @private
     * @type {UniformNode}
     */
    private _cameraFar;
    /**
     * A MRT node configuring the MRT settings.
     *
     * @private
     * @type {?MRTNode}
     * @default null
     */
    private _mrt;
    /**
     * Layer object for configuring the camera that is used
     * to produce the pass.
     *
     * @private
     * @type {?Layers}
     * @default null
     */
    private _layers;
    /**
     * Scales the resolution of the internal render target.
     *
     * @private
     * @type {number}
     * @default 1
     */
    private _resolutionScale;
    /**
     * Custom viewport definition.
     *
     * @private
     * @type {?Vector4}
     * @default null
     */
    private _viewport;
    /**
     * Custom scissor definition.
     *
     * @private
     * @type {?Vector4}
     * @default null
     */
    private _scissor;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPassNode: boolean;
    /**
     * Sets the resolution scale for the pass.
     * The resolution scale is a factor that is multiplied with the renderer's width and height.
     *
     * @param {number} resolutionScale - The resolution scale to set. A value of `1` means full resolution.
     * @return {PassNode} A reference to this pass.
     */
    setResolutionScale(resolutionScale: number): PassNode;
    /**
     * Gets the current resolution scale of the pass.
     *
     * @return {number} The current resolution scale. A value of `1` means full resolution.
     */
    getResolutionScale(): number;
    /**
     * Sets the resolution for the pass.
     * The resolution is a factor that is multiplied with the renderer's width and height.
     *
     * @param {number} resolution - The resolution to set. A value of `1` means full resolution.
     * @return {PassNode} A reference to this pass.
     * @deprecated since r181. Use {@link PassNode#setResolutionScale `setResolutionScale()`} instead.
     */
    setResolution(resolution: number): PassNode;
    /**
     * Gets the current resolution of the pass.
     *
     * @return {number} The current resolution. A value of `1` means full resolution.
     * @deprecated since r181. Use {@link PassNode#getResolutionScale `getResolutionScale()`} instead.
     */
    getResolution(): number;
    /**
     * Sets the layer configuration that should be used when rendering the pass.
     *
     * @param {Layers} layers - The layers object to set.
     * @return {PassNode} A reference to this pass.
     */
    setLayers(layers: Layers): PassNode;
    /**
     * Gets the current layer configuration of the pass.
     *
     * @return {?Layers} .
     */
    getLayers(): Layers | null;
    /**
     * Sets the given MRT node to setup MRT for this pass.
     *
     * @param {MRTNode} mrt - The MRT object.
     * @return {PassNode} A reference to this pass.
     */
    setMRT(mrt: MRTNode): PassNode;
    /**
     * Returns the current MRT node.
     *
     * @return {MRTNode} The current MRT node.
     */
    getMRT(): MRTNode;
    /**
     * Returns the texture for the given output name.
     *
     * @param {string} name - The output name to get the texture for.
     * @return {Texture} The texture.
     */
    getTexture(name: string): Texture;
    /**
     * Returns the texture holding the data of the previous frame for the given output name.
     *
     * @param {string} name - The output name to get the texture for.
     * @return {Texture} The texture holding the data of the previous frame.
     */
    getPreviousTexture(name: string): Texture;
    /**
     * Switches current and previous textures for the given output name.
     *
     * @param {string} name - The output name.
     */
    toggleTexture(name: string): void;
    /**
     * Returns the texture node for the given output name.
     *
     * @param {string} [name='output'] - The output name to get the texture node for.
     * @return {TextureNode} The texture node.
     */
    getTextureNode(name?: string): TextureNode;
    /**
     * Returns the previous texture node for the given output name.
     *
     * @param {string} [name='output'] - The output name to get the previous texture node for.
     * @return {TextureNode} The previous texture node.
     */
    getPreviousTextureNode(name?: string): TextureNode;
    /**
     * Returns a viewZ node of this pass.
     *
     * @param {string} [name='depth'] - The output name to get the viewZ node for. In most cases the default `'depth'` can be used however the parameter exists for custom depth outputs.
     * @return {Node} The viewZ node.
     */
    getViewZNode(name?: string): Node;
    /**
     * Returns a linear depth node of this pass.
     *
     * @param {string} [name='depth'] - The output name to get the linear depth node for. In most cases the default `'depth'` can be used however the parameter exists for custom depth outputs.
     * @return {Node} The linear depth node.
     */
    getLinearDepthNode(name?: string): Node;
    /**
     * Precompiles the pass.
     *
     * Note that this method must be called after the pass configuration is complete.
     * So calls like `setMRT()` and `getTextureNode()` must proceed the precompilation.
     *
     * @async
     * @param {Renderer} renderer - The renderer.
     * @return {Promise} A Promise that resolves when the compile has been finished.
     * @see {@link Renderer#compileAsync}
     */
    compileAsync(renderer: Renderer): Promise<any>;
    setup({ renderer }: {
        renderer: any;
    }): Node | TextureNode;
    updateBefore(frame: any): void;
    /**
     * Sets the size of the pass's render target. Honors the pixel ratio.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
    /**
     * This method allows to define the pass's scissor rectangle. By default, the scissor rectangle is kept
     * in sync with the pass's dimensions. To reverse the process and use auto-sizing again, call the method
     * with `null` as the single argument.
     *
     * @param {?(number | Vector4)} x - The horizontal coordinate for the lower left corner of the box in logical pixel unit.
     * Instead of passing four arguments, the method also works with a single four-dimensional vector.
     * @param {number} y - The vertical coordinate for the lower left corner of the box in logical pixel unit.
     * @param {number} width - The width of the scissor box in logical pixel unit.
     * @param {number} height - The height of the scissor box in logical pixel unit.
     */
    setScissor(x: (number | Vector4) | null, y: number, width: number, height: number): void;
    /**
     * This method allows to define the pass's viewport. By default, the viewport is kept in sync
     * with the pass's dimensions. To reverse the process and use auto-sizing again, call the method
     * with `null` as the single argument.
     *
     * @param {number | Vector4} x - The horizontal coordinate for the lower left corner of the viewport origin in logical pixel unit.
     * @param {number} y - The vertical coordinate for the lower left corner of the viewport origin  in logical pixel unit.
     * @param {number} width - The width of the viewport in logical pixel unit.
     * @param {number} height - The height of the viewport in logical pixel unit.
     */
    setViewport(x: number | Vector4, y: number, width: number, height: number): void;
    /**
     * Sets the pixel ratio the pass's render target and updates the size.
     *
     * @param {number} pixelRatio - The pixel ratio to set.
     */
    setPixelRatio(pixelRatio: number): void;
}
declare namespace PassNode {
    let COLOR: "color";
    let DEPTH: "depth";
}
/**
 * Represents the texture of a pass node.
 *
 * @augments TextureNode
 */
declare class PassTextureNode extends TextureNode {
    /**
     * Constructs a new pass texture node.
     *
     * @param {PassNode} passNode - The pass node.
     * @param {Texture} texture - The output texture.
     */
    constructor(passNode: PassNode, texture: Texture);
    /**
     * A reference to the pass node.
     *
     * @type {PassNode}
     */
    passNode: PassNode;
    setup(builder: any): void;
    clone(): any;
}
import TempNode from '../core/TempNode.js';
import { RenderTarget } from '../../core/RenderTarget.js';
import { default as TextureNode } from '../accessors/TextureNode.js';
import { Vector4 } from '../../math/Vector4.js';
