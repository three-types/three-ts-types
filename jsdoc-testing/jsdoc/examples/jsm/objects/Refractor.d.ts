/**
 * ~Options
 */
export type Refractor = {
    /**
     * - The refractor's color.
     */
    color?: string | number | Color | undefined;
    /**
     * - The texture width. A higher value results in more clear refractions but is also more expensive.
     */
    textureWidth?: number | undefined;
    /**
     * - The texture height. A higher value results in more clear refractions but is also more expensive.
     */
    textureHeight?: number | undefined;
    /**
     * - The clip bias.
     */
    clipBias?: number | undefined;
    /**
     * - Can be used to pass in a custom shader that defines how the refractive view is projected onto the reflector's geometry.
     */
    shader?: Object | undefined;
    /**
     * - How many samples to use for MSAA. `0` disables MSAA.
     */
    multisample?: number | undefined;
};
import { Color } from 'three';
/**
 * Can be used to create a flat, refractive surface like for special
 * windows or water effects.
 *
 * Note that this class can only be used with {@link WebGLRenderer}.
 * When using {@link WebGPURenderer}, use {@link viewportSharedTexture}.
 *
 * ```js
 * const geometry = new THREE.PlaneGeometry( 100, 100 );
 *
 * const refractor = new Refractor( refractorGeometry, {
 * 	color: 0xcbcbcb,
 * 	textureWidth: 1024,
 * 	textureHeight: 1024
 * } );
 *
 * scene.add( refractor );
 * ```
 *
 * @augments Mesh
 * @three_import import { Refractor } from 'three/addons/objects/Refractor.js';
 */
export class Refractor extends Mesh {
    /**
     * Constructs a new refractor.
     *
     * @param {BufferGeometry} geometry - The refractor's geometry.
     * @param {Refractor~Options} [options] - The configuration options.
     */
    constructor(geometry: BufferGeometry, options?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isRefractor: boolean;
    /**
     * The reflector's virtual camera.
     *
     * @type {PerspectiveCamera}
     */
    camera: PerspectiveCamera;
    material: ShaderMaterial;
    onBeforeRender: (renderer: any, scene: any, camera: any) => void;
    /**
     * Returns the reflector's internal render target.
     *
     * @return {WebGLRenderTarget} The internal render target
     */
    getRenderTarget: () => WebGLRenderTarget;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose: () => void;
}
export namespace Refractor {
    namespace RefractorShader {
        let name: string;
        namespace uniforms {
            namespace color {
                let value: null;
            }
            namespace tDiffuse {
                let value_1: null;
                export { value_1 as value };
            }
            namespace textureMatrix {
                let value_2: null;
                export { value_2 as value };
            }
        }
        let vertexShader: string;
        let fragmentShader: string;
    }
}
import { Mesh } from 'three';
import { PerspectiveCamera } from 'three';
import { ShaderMaterial } from 'three';
import { WebGLRenderTarget } from 'three';
