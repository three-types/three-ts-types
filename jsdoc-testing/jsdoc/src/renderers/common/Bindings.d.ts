export default Bindings;
/**
 * This renderer module manages the bindings of the renderer.
 *
 * @private
 * @augments DataMap
 */
declare class Bindings extends DataMap {
    /**
     * Constructs a new bindings management component.
     *
     * @param {Backend} backend - The renderer's backend.
     * @param {NodeManager} nodes - Renderer component for managing nodes related logic.
     * @param {Textures} textures - Renderer component for managing textures.
     * @param {Attributes} attributes - Renderer component for managing attributes.
     * @param {Pipelines} pipelines - Renderer component for managing pipelines.
     * @param {Info} info - Renderer component for managing metrics and monitoring data.
     */
    constructor(backend: Backend, nodes: NodeManager, textures: Textures, attributes: Attributes, pipelines: Pipelines, info: Info);
    /**
     * The renderer's backend.
     *
     * @type {Backend}
     */
    backend: Backend;
    /**
     * Renderer component for managing textures.
     *
     * @type {Textures}
     */
    textures: Textures;
    /**
     * Renderer component for managing pipelines.
     *
     * @type {Pipelines}
     */
    pipelines: Pipelines;
    /**
     * Renderer component for managing attributes.
     *
     * @type {Attributes}
     */
    attributes: Attributes;
    /**
     * Renderer component for managing nodes related logic.
     *
     * @type {NodeManager}
     */
    nodes: NodeManager;
    /**
     * Renderer component for managing metrics and monitoring data.
     *
     * @type {Info}
     */
    info: Info;
    /**
     * Shared bind groups per render context.
     *
     * @private
     * @type {WeakMap<RenderContext|Renderer,Map<number,BindGroup>>}
     */
    private _sharedBindGroups;
    /**
     * Returns the bind groups for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {Array<BindGroup>} The bind groups.
     */
    getForRender(renderObject: RenderObject): Array<BindGroup>;
    /**
     * Returns the bind groups for the given compute node.
     *
     * @param {Node} computeNode - The compute node.
     * @return {Array<BindGroup>} The bind groups.
     */
    getForCompute(computeNode: Node): Array<BindGroup>;
    /**
     * Returns the shared bind group for the given bindings and the current render context.
     * If it does not exist yet, it is created with the given name and bindings.
     *
     * @param {string} name - The bind group's name.
     * @param {Array<Binding>} bindings - An array of bindings.
     * @return {BindGroup} The shared bind group.
     */
    getSharedBindGroup(name: string, bindings: Array<Binding>): BindGroup;
    /**
     * Updates the bindings for the given compute node.
     *
     * @param {Node} computeNode - The compute node.
     */
    updateForCompute(computeNode: Node): void;
    /**
     * Updates the bindings for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    updateForRender(renderObject: RenderObject): void;
    /**
     * Updates only the shared uniform buffers of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    updateSharedForRender(renderObject: RenderObject): void;
    /**
     * Deletes the bindings for the given compute node.
     *
     * @param {Node} computeNode - The compute node.
     */
    deleteForCompute(computeNode: Node): void;
    /**
     * Deletes the bindings for the given renderObject node.
     *
     * @param {RenderObject} renderObject - The renderObject.
     */
    deleteForRender(renderObject: RenderObject): void;
    /**
     * Creates the bindings for the given array of bindings.
     *
     * @param {Array<BindGroup>} bindings - The bind groups.
     */
    _createBindings(bindings: Array<BindGroup>): void;
    /**
     * Deletes the given array of bindings.
     *
     * @param {Array<BindGroup>} bindings - The bind groups.
     */
    _destroyBindings(bindings: Array<BindGroup>): void;
    /**
     * Updates the given array of bindings.
     *
     * @param {Array<BindGroup>} bindings - The bind groups.
     */
    _updateBindings(bindings: Array<BindGroup>): void;
    /**
     * Updates the given bind group.
     *
     * @param {BindGroup} bindGroup - The bind group to update.
     * @param {Array<BindGroup>} bindings - The bind groups.
     */
    _update(bindGroup: BindGroup, bindings: Array<BindGroup>): void;
}
import DataMap from './DataMap.js';
import BindGroup from './BindGroup.js';
