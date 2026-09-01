/**
 * A glTF loader plugin for `KHR_gaussian_splatting`.
 *
 * This plugin must be registered explicitly because {@link GaussianSplat}
 * requires {@link WebGPURenderer}.
 *
 * ```js
 * const loader = new GLTFLoader();
 * loader.register( function ( parser ) {
 *
 * 	return new GLTFGaussianSplatLoaderExtension( parser );
 *
 * } );
 * ```
 *
 * @three_import import { GLTFGaussianSplatLoaderExtension } from 'three/addons/loaders/GLTFGaussianSplatLoaderExtension.js';
 */
export class GLTFGaussianSplatLoaderExtension {
    /**
     * Constructs a new glTF gaussian splatting extension plugin.
     *
     * @param {GLTFParser} parser - The glTF parser.
     */
    constructor(parser: GLTFParser);
    name: string;
    parser: GLTFParser;
    /**
     * Loads a glTF mesh containing gaussian splat primitives.
     *
     * @param {number} meshIndex - The mesh index.
     * @return {?Promise<Group|GaussianSplat>} The loaded mesh or `null` when the mesh does not use this extension.
     */
    loadMesh(meshIndex: number): Promise<Group | GaussianSplat> | null;
}
import { Group } from 'three';
import { GaussianSplat } from '../objects/GaussianSplat.js';
