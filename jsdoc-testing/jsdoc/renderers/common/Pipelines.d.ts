export default Pipelines;
/**
 * This renderer module manages the pipelines of the renderer.
 *
 * @private
 * @augments DataMap
 */
declare class Pipelines extends DataMap {
    /**
     * Constructs a new pipeline management component.
     *
     * @param {Backend} backend - The renderer's backend.
     * @param {Nodes} nodes - Renderer component for managing nodes related logic.
     */
    constructor(backend: Backend, nodes: Nodes);
    /**
     * The renderer's backend.
     *
     * @type {Backend}
     */
    backend: Backend;
    /**
     * Renderer component for managing nodes related logic.
     *
     * @type {Nodes}
     */
    nodes: Nodes;
    /**
     * A references to the bindings management component.
     * This reference will be set inside the `Bindings`
     * constructor.
     *
     * @type {?Bindings}
     * @default null
     */
    bindings: Bindings | null;
    /**
     * Internal cache for maintaining pipelines.
     * The key of the map is a cache key, the value the pipeline.
     *
     * @type {Map<string,Pipeline>}
     */
    caches: Map<string, Pipeline>;
    /**
     * This dictionary maintains for each shader stage type (vertex,
     * fragment and compute) the programmable stage objects which
     * represent the actual shader code.
     *
     * @type {Object<string,Map<string, ProgrammableStage>>}
     */
    programs: {
        [x: string]: Map<string, ProgrammableStage>;
    };
    /**
     * Returns a compute pipeline for the given compute node.
     *
     * @param {Node} computeNode - The compute node.
     * @param {Array<BindGroup>} bindings - The bindings.
     * @return {ComputePipeline} The compute pipeline.
     */
    getForCompute(computeNode: Node, bindings: Array<BindGroup>): ComputePipeline;
    /**
     * Returns a render pipeline for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @param {?Array<Promise>} [promises=null] - An array of compilation promises which is only relevant in context of `Renderer.compileAsync()`.
     * @return {RenderObjectPipeline} The render pipeline.
     */
    getForRender(renderObject: RenderObject, promises?: Array<Promise<any>> | null): RenderObjectPipeline;
    /**
     * Deletes the pipeline for the given render object.
     *
     * @param {RenderObject} object - The render object.
     * @return {?Object} The deleted dictionary.
     */
    delete(object: RenderObject): Object | null;
    /**
     * Updates the pipeline for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    updateForRender(renderObject: RenderObject): void;
    /**
     * Returns a compute pipeline for the given parameters.
     *
     * @private
     * @param {Node} computeNode - The compute node.
     * @param {ProgrammableStage} stageCompute - The programmable stage representing the compute shader.
     * @param {string} cacheKey - The cache key.
     * @param {Array<BindGroup>} bindings - The bindings.
     * @return {ComputePipeline} The compute pipeline.
     */
    private _getComputePipeline;
    /**
     * Returns a render pipeline for the given parameters.
     *
     * @private
     * @param {RenderObject} renderObject - The render object.
     * @param {ProgrammableStage} stageVertex - The programmable stage representing the vertex shader.
     * @param {ProgrammableStage} stageFragment - The programmable stage representing the fragment shader.
     * @param {string} cacheKey - The cache key.
     * @param {?Array<Promise>} promises - An array of compilation promises which is only relevant in context of `Renderer.compileAsync()`.
     * @return {RenderObjectPipeline} The render pipeline.
     */
    private _getRenderPipeline;
    /**
     * Computes a cache key representing a compute pipeline.
     *
     * @private
     * @param {Node} computeNode - The compute node.
     * @param {ProgrammableStage} stageCompute - The programmable stage representing the compute shader.
     * @return {string} The cache key.
     */
    private _getComputeCacheKey;
    /**
     * Computes a cache key representing a render pipeline.
     *
     * @private
     * @param {RenderObject} renderObject - The render object.
     * @param {ProgrammableStage} stageVertex - The programmable stage representing the vertex shader.
     * @param {ProgrammableStage} stageFragment - The programmable stage representing the fragment shader.
     * @return {string} The cache key.
     */
    private _getRenderCacheKey;
    /**
     * Releases the given pipeline.
     *
     * @private
     * @param {Pipeline} pipeline - The pipeline to release.
     */
    private _releasePipeline;
    /**
     * Releases the shader program.
     *
     * @private
     * @param {Object} program - The shader program to release.
     */
    private _releaseProgram;
    /**
     * Returns `true` if the compute pipeline for the given compute node requires an update.
     *
     * @private
     * @param {Node} computeNode - The compute node.
     * @return {boolean} Whether the compute pipeline for the given compute node requires an update or not.
     */
    private _needsComputeUpdate;
    /**
     * Returns `true` if the render pipeline for the given render object requires an update.
     *
     * @private
     * @param {RenderObject} renderObject - The render object.
     * @return {boolean} Whether the render object for the given render object requires an update or not.
     */
    private _needsRenderUpdate;
}
import DataMap from './DataMap.js';
import ProgrammableStage from './ProgrammableStage.js';
import ComputePipeline from './ComputePipeline.js';
import RenderObjectPipeline from './RenderObjectPipeline.js';
