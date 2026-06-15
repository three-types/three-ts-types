/**
 * Creates a simulated lens flare that tracks a light.
 *
 * Note that this class can only be used with {@link WebGLRenderer}.
 * When using {@link WebGPURenderer}, use {@link LensflareMesh}.
 *
 * ```js
 * const light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
 *
 * const lensflare = new Lensflare();
 * lensflare.addElement( new LensflareElement( textureFlare0, 512, 0 ) );
 * lensflare.addElement( new LensflareElement( textureFlare1, 512, 0 ) );
 * lensflare.addElement( new LensflareElement( textureFlare2, 60, 0.6 ) );
 *
 * light.add( lensflare );
 * ```
 *
 * @augments Mesh
 * @three_import import { Lensflare } from 'three/addons/objects/Lensflare.js';
 */
export class Lensflare extends Mesh {
    /**
     * Constructs a new lensflare.
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLensflare: boolean;
    /**
     * Adds the given lensflare element to this instance.
     *
     * @param {LensflareElement} element - The element to add.
     */
    addElement: (element: LensflareElement) => void;
    onBeforeRender: (renderer: any, scene: any, camera: any) => void;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose: () => void;
}
export namespace Lensflare {
    let Geometry: BufferGeometry;
}
/**
 * Represents a single flare that can be added to a {@link Lensflare} container.
 *
 * @three_import import { LensflareElement } from 'three/addons/objects/Lensflare.js';
 */
export class LensflareElement {
    /**
     * Constructs a new lensflare element.
     *
     * @param {Texture} texture - The flare's texture.
     * @param {number} [size=1] - The size in pixels.
     * @param {number} [distance=0] - The normalized distance (`[0,1]`) from the light source.
     * A value of `0` means the flare is located at light source.
     * @param {Color} [color] - The flare's color
     */
    constructor(texture: Texture, size?: number, distance?: number, color?: Color);
    /**
     * The flare's texture.
     *
     * @type {Texture}
     */
    texture: Texture;
    /**
     * The size in pixels.
     *
     * @type {number}
     * @default 1
     */
    size: number;
    /**
     * The normalized distance (`[0,1]`) from the light source.
     * A value of `0` means the flare is located at light source.
     *
     * @type {number}
     * @default 0
     */
    distance: number;
    /**
     * The flare's color
     *
     * @type {Color}
     * @default (1,1,1)
     */
    color: Color;
}
export namespace LensflareElement {
    namespace Shader {
        let name: string;
        namespace uniforms {
            namespace map {
                let value: null;
            }
            namespace occlusionMap {
                let value_1: null;
                export { value_1 as value };
            }
            namespace color {
                let value_2: null;
                export { value_2 as value };
            }
            namespace scale {
                let value_3: null;
                export { value_3 as value };
            }
            namespace screenPosition {
                let value_4: null;
                export { value_4 as value };
            }
        }
        let vertexShader: string;
        let fragmentShader: string;
    }
}
import { Mesh } from 'three';
import { BufferGeometry } from 'three';
import { Color } from 'three';
