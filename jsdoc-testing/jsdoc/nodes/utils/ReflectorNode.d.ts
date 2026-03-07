export function reflector(parameters?: {
    target?: Object3D | undefined;
    resolution?: number | undefined;
    generateMipmaps?: boolean | undefined;
    bounces?: boolean | undefined;
    depth?: boolean | undefined;
    samples?: number | undefined;
    defaultTexture?: TextureNode | undefined;
    reflector?: ReflectorBaseNode | undefined;
}): ReflectorNode;
export default ReflectorNode;
import { Object3D } from '../../core/Object3D.js';
import TextureNode from '../accessors/TextureNode.js';
/**
 * Holds the actual implementation of the reflector.
 *
 * TODO: Explain why `ReflectorBaseNode`. Originally the entire logic was implemented
 * in `ReflectorNode`, see #29619.
 *
 * @private
 * @augments Node
 */
declare class ReflectorBaseNode extends Node {
    /**
     * Constructs a new reflector base node.
     *
     * @param {TextureNode} textureNode - Represents the rendered reflections as a texture node.
     * @param {Object} [parameters={}] - An object holding configuration parameters.
     * @param {Object3D} [parameters.target=new Object3D()] - The 3D object the reflector is linked to.
     * @param {number} [parameters.resolutionScale=1] - The resolution scale.
     * @param {boolean} [parameters.generateMipmaps=false] - Whether mipmaps should be generated or not.
     * @param {boolean} [parameters.bounces=true] - Whether reflectors can render other reflector nodes or not.
     * @param {boolean} [parameters.depth=false] - Whether depth data should be generated or not.
     * @param {number} [parameters.samples] - Anti-Aliasing samples of the internal render-target.
     */
    constructor(textureNode: TextureNode, parameters?: {
        target?: Object3D | undefined;
        resolutionScale?: number | undefined;
        generateMipmaps?: boolean | undefined;
        bounces?: boolean | undefined;
        depth?: boolean | undefined;
        samples?: number | undefined;
    });
    /**
     * Represents the rendered reflections as a texture node.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * The 3D object the reflector is linked to.
     *
     * @type {Object3D}
     * @default {new Object3D()}
     */
    target: Object3D;
    /**
     * The resolution scale.
     *
     * @type {number}
     * @default {1}
     */
    resolutionScale: number;
    /**
     * Whether mipmaps should be generated or not.
     *
     * @type {boolean}
     * @default {false}
     */
    generateMipmaps: boolean;
    /**
     * Whether reflectors can render other reflector nodes or not.
     *
     * @type {boolean}
     * @default {true}
     */
    bounces: boolean;
    /**
     * Whether depth data should be generated or not.
     *
     * @type {boolean}
     * @default {false}
     */
    depth: boolean;
    /**
     * The number of anti-aliasing samples for the render-target
     *
     * @type {number}
     * @default {0}
     */
    samples: number;
    /**
     * Weak map for managing virtual cameras.
     *
     * @type {WeakMap<Camera, Camera>}
     */
    virtualCameras: WeakMap<Camera, Camera>;
    /**
     * Weak map for managing render targets.
     *
     * @type {Map<Camera, RenderTarget>}
     */
    renderTargets: Map<Camera, RenderTarget>;
    /**
     * Force render even if reflector is facing away from camera.
     *
     * @type {boolean}
     * @default {false}
     */
    forceUpdate: boolean;
    /**
     * Whether the reflector has been rendered or not.
     *
     * When the reflector is facing away from the camera,
     * this flag is set to `false` and the texture will be empty(black).
     *
     * @type {boolean}
     * @default {false}
     */
    hasOutput: boolean;
    /**
     * Updates the resolution of the internal render target.
     *
     * @private
     * @param {RenderTarget} renderTarget - The render target to resize.
     * @param {Renderer} renderer - The renderer that is used to determine the new size.
     */
    private _updateResolution;
    setup(builder: any): Node | null;
    /**
     * Returns a virtual camera for the given camera. The virtual camera is used to
     * render the scene from the reflector's view so correct reflections can be produced.
     *
     * @param {Camera} camera - The scene's camera.
     * @return {Camera} The corresponding virtual camera.
     */
    getVirtualCamera(camera: Camera): Camera;
    /**
     * Returns a render target for the given camera. The reflections are rendered
     * into this render target.
     *
     * @param {Camera} camera - The scene's camera.
     * @return {RenderTarget} The render target.
     */
    getRenderTarget(camera: Camera): RenderTarget;
    updateBefore(frame: any): false | undefined;
    set resolution(value: number);
    /**
     * The resolution scale.
     *
     * @deprecated
     * @type {number}
     * @default {1}
     */
    get resolution(): number;
}
/**
 * This node can be used to implement mirror-like flat reflective surfaces.
 *
 * ```js
 * const groundReflector = reflector();
 * material.colorNode = groundReflector;
 *
 * const plane = new Mesh( geometry, material );
 * plane.add( groundReflector.target );
 * ```
 *
 * @augments TextureNode
 */
declare class ReflectorNode extends TextureNode {
    /**
     * Constructs a new reflector node.
     *
     * @param {Object} [parameters={}] - An object holding configuration parameters.
     * @param {Object3D} [parameters.target=new Object3D()] - The 3D object the reflector is linked to.
     * @param {number} [parameters.resolutionScale=1] - The resolution scale.
     * @param {boolean} [parameters.generateMipmaps=false] - Whether mipmaps should be generated or not.
     * @param {boolean} [parameters.bounces=true] - Whether reflectors can render other reflector nodes or not.
     * @param {boolean} [parameters.depth=false] - Whether depth data should be generated or not.
     * @param {number} [parameters.samples] - Anti-Aliasing samples of the internal render-target.
     * @param {TextureNode} [parameters.defaultTexture] - The default texture node.
     * @param {ReflectorBaseNode} [parameters.reflector] - The reflector base node.
     */
    constructor(parameters?: {
        target?: Object3D | undefined;
        resolutionScale?: number | undefined;
        generateMipmaps?: boolean | undefined;
        bounces?: boolean | undefined;
        depth?: boolean | undefined;
        samples?: number | undefined;
        defaultTexture?: TextureNode | undefined;
        reflector?: ReflectorBaseNode | undefined;
    });
    /**
     * A reference to the internal reflector base node which holds the actual implementation.
     *
     * @private
     * @type {ReflectorBaseNode}
     * @default ReflectorBaseNode
     */
    private _reflectorBaseNode;
    /**
     * A reference to the internal depth node.
     *
     * @private
     * @type {?Node}
     * @default null
     */
    private _depthNode;
    /**
     * A reference to the internal reflector node.
     *
     * @type {ReflectorBaseNode}
     */
    get reflector(): ReflectorBaseNode;
    /**
     * A reference to 3D object the reflector is linked to.
     *
     * @type {Object3D}
     */
    get target(): Object3D;
    /**
     * Returns a node representing the mirror's depth. That can be used
     * to implement more advanced reflection effects like distance attenuation.
     *
     * @return {Node} The depth node.
     */
    getDepthNode(): Node;
    setup(builder: any): void;
    clone(): any;
}
import Node from '../core/Node.js';
import { RenderTarget } from '../../core/RenderTarget.js';
