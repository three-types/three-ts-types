export default ComputePipeline;
/**
 * Class for representing compute pipelines.
 *
 * @private
 * @augments Pipeline
 */
declare class ComputePipeline extends Pipeline {
    /**
     * Constructs a new compute pipeline.
     *
     * @param {string} cacheKey - The pipeline's cache key.
     * @param {ProgrammableStage} computeProgram - The pipeline's compute shader.
     * @param {?Array<Object>} [transforms=null] - The transforms (only relevant for WebGL 2 which uses Transform Feedback).
     * @param {?Array<Object>} [attributes=null] - The attributes (only relevant for WebGL 2 which uses Transform Feedback).
     */
    constructor(cacheKey: string, computeProgram: ProgrammableStage, transforms?: Array<Object> | null, attributes?: Array<Object> | null);
    /**
     * The pipeline's compute shader.
     *
     * @type {ProgrammableStage}
     */
    computeProgram: ProgrammableStage;
    /**
     * The transforms (only relevant for WebGL 2 which uses Transform Feedback).
     *
     * @type {?Array<Object>}
     */
    transforms: Array<Object> | null;
    /**
     * The attributes (only relevant for WebGL 2 which uses Transform Feedback).
     *
     * @type {?Array<Object>}
     */
    attributes: Array<Object> | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isComputePipeline: boolean;
}
import Pipeline from './Pipeline.js';
