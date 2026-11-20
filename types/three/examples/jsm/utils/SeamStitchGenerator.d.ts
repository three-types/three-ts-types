/**
 * Stitches the seams of a baked map, e.g. of a light map or an ambient occlusion map. Where a smooth surface is
 * cut into two charts of the UV atlas, bilinear filtering on both sides of the cut reads different texels, so the
 * map shows a discontinuity. This finds the mesh edges whose two triangles meet in 3D, with similar normals, but
 * lie at different places of the atlas, and solves a least-squares problem for the texels around them: the bilinear
 * samples along both sides of each seam should be equal, while the texels change as little as possible, the
 * texels outside the charts more freely than the covered ones. The solver runs damped Jacobi iterations on the GPU
 * and keeps each texel within the values that its seams sample on both sides.
 *
 * The coverage of the map is read from its alpha: texels with an alpha above zero are covered, e.g. in a light
 * map of {@link LightMapper}. The stitched map has the covered and the stitched texels in alpha, 1, and 0
 * elsewhere, so {@link GutterFillGenerator} can fill the gutters around them.
 *
 * Finding the seams runs on the CPU, so {@link SeamStitchGenerator#setGeometry} is called once per atlas,
 * then the generator can stitch many maps of it. Like {@link PMREMGenerator}, the caller owns the results.
 *
 * ```js
 * const seamStitch = new SeamStitchGenerator( renderer );
 * seamStitch.setGeometry( scene );
 *
 * const gutterFill = new GutterFillGenerator( renderer );
 *
 * const stitched = seamStitch.generate( lightMapper.texture );
 * const filled = gutterFill.generate( stitched.texture );
 *
 * material.lightMap = filled.texture;
 * ```
 *
 * Instanced and skinned meshes are not supported. This class can only be used with {@link WebGPURenderer} and a
 * WebGPU backend.
 *
 * @three_import import { SeamStitchGenerator } from 'three/addons/utils/SeamStitchGenerator.js';
 */
export class SeamStitchGenerator {
    /**
     * Constructs a new seam stitch generator.
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
    /**
     * The UV channel of the atlas, like {@link Texture#channel}: 1 for `uv1`. The seams are found again
     * when it changes.
     *
     * @type {number}
     * @default 1
     */
    channel: number;
    /**
     * The number of Jacobi iterations.
     *
     * @type {number}
     * @default 64
     */
    iterations: number;
    _root: any;
    _seams: Float32Array<ArrayBufferLike> | null;
    _seamChannel: number;
    _solver: {
        width: number;
        height: number;
        copy: QuadMesh;
        scene: Scene;
        compute: null;
        buffers: never[];
    } | null;
    _source: import("three/tsl").TextureNode;
    _camera: OrthographicCamera;
    /**
     * Finds the seams of the meshes that share the atlas. Call it again when the meshes or their UVs change.
     *
     * @param {Object3D|Array<Mesh>} scene - The meshes, or an object whose meshes share the atlas.
     */
    setGeometry(scene: Object3D | Array<Mesh>): void;
    /**
     * Stitches the seams of a map of the atlas.
     *
     * @param {Texture} source - The map, with an alpha above zero at its covered texels, e.g. a light map of {@link LightMapper}.
     * @param {?RenderTarget} [renderTarget=null] - The render target of the stitched map, resized to the map. The map
     * must not be its texture. By default, a new half float render target.
     * @return {RenderTarget} The render target of the stitched map, with the UV channel of the atlas.
     */
    generate(source: Texture, renderTarget?: RenderTarget | null): RenderTarget;
    /**
     * Frees all internal resources.
     */
    dispose(): void;
    /**
     * Sets up the solver of a map size: the texels around the seams, the constraints between them, and the passes
     * that solve them and write the stitched map.
     *
     * @private
     * @param {number} width - The width of the map.
     * @param {number} height - The height of the map.
     */
    private _setSize;
    /**
     * Frees the solver.
     *
     * @private
     */
    private _disposeSolver;
}
import { QuadMesh } from "three/webgpu";
import { Scene } from "three/webgpu";
import { OrthographicCamera } from "three/webgpu";
import { RenderTarget } from "three/webgpu";
