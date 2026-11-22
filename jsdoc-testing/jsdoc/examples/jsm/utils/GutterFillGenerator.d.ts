/**
 * Fills the gutters of a baked map: the texels outside the charts of a UV atlas, e.g. of a light map or an
 * ambient occlusion map. Texture filtering reads texels on both sides of the border of a chart, and the mip
 * levels of a map average whole blocks of texels, so empty gutters show up as dark outlines around the
 * charts, the more the farther away the map is seen. This fills every texel outside the charts with the
 * values of the nearest charts.
 *
 * The coverage of the map is read from its alpha: texels with an alpha above zero are covered, e.g. in a
 * light map of {@link LightMapper} or a map stitched by {@link SeamStitchGenerator}. The fill is a push-pull
 * in one chain of levels: the map is halved down to one texel, averaging the covered texels, then, from
 * the coarsest level to the finest, the uncovered texels of each level are filled from the level below,
 * upsampled with filtering. The covered texels keep their values, the filled texels have an alpha of zero.
 *
 * Like {@link PMREMGenerator}, the generator can fill many maps, and the caller owns the results.
 *
 * ```js
 * const gutterFill = new GutterFillGenerator( renderer );
 *
 * const renderTarget = new THREE.RenderTarget( size, size, { type: THREE.HalfFloatType, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
 * gutterFill.generate( lightMapper.texture, renderTarget );
 *
 * material.lightMap = renderTarget.texture;
 * ```
 *
 * This class can only be used with {@link WebGPURenderer} and a WebGPU backend.
 *
 * @three_import import { GutterFillGenerator } from 'three/addons/utils/GutterFillGenerator.js';
 */
export class GutterFillGenerator {
    /**
     * Constructs a new gutter fill generator.
     *
     * @param {WebGPURenderer} renderer - The renderer.
     */
    constructor(renderer: WebGPURenderer);
    /**
     * The renderer.
     *
     * @type {WebGPURenderer}
     */
    renderer: WebGPURenderer;
    _width: number;
    _height: number;
    _levels: any[];
    _passes: any[];
    _source: import("three/tsl").TextureNode;
    _firstLevel: import("three/tsl").TextureNode;
    _fill: NodeMaterial;
    /**
     * Fills the gutters of a map.
     *
     * @param {Texture} source - The map, with an alpha above zero at its covered texels.
     * @param {?RenderTarget} [renderTarget=null] - The render target of the filled map, resized to the map. The map
     * must not be its texture. By default, a new half float render target.
     * @return {RenderTarget} The render target of the filled map, with the UV channel of the map.
     */
    generate(source: Texture, renderTarget?: RenderTarget | null): RenderTarget;
    /**
     * Frees all internal resources.
     */
    dispose(): void;
    /**
     * Sizes the levels and collects the passes of a map size.
     *
     * @private
     * @param {number} width - The width of the map.
     * @param {number} height - The height of the map.
     */
    private _setSize;
    /**
     * Returns a pass of a level, created on first use, with one thread per texel of the level. The top level reads
     * the map, the others the level above.
     *
     * @private
     * @param {number} index - The level, counted from the coarsest one.
     * @param {boolean} top - Whether the level is the top one.
     * @param {boolean} isPull - Whether to return the pull pass, or the push pass.
     * @return {ComputeNode} The pass.
     */
    private _getPass;
    /**
     * Frees the levels and the passes.
     *
     * @private
     */
    private _disposeLevels;
}
import { NodeMaterial } from 'three/webgpu';
import { RenderTarget } from 'three/webgpu';
