/**
 * :Water2~Options
 */
export type module = {
    /**
     * - The water color.
     */
    color?: string | number | Color | undefined;
    /**
     * - The texture width. A higher value results in better quality but is also more expensive.
     */
    textureWidth?: number | undefined;
    /**
     * - The texture height. A higher value results in better quality but is also more expensive.
     */
    textureHeight?: number | undefined;
    /**
     * - The clip bias.
     */
    clipBias?: number | undefined;
    /**
     * - The water's flow direction.
     */
    flowDirection?: Vector2 | undefined;
    /**
     * - The water's flow speed.
     */
    flowSpeed?: number | undefined;
    /**
     * - The water's reflectivity.
     */
    reflectivity?: number | undefined;
    /**
     * - The water's scale.
     */
    scale?: number | undefined;
    /**
     * - A custom water shader.
     */
    shader?: Object | undefined;
    /**
     * - The flow map. If no flow map is assigned, the water flow is defined by `flowDirection`.
     */
    flowMap?: Texture | null;
    /**
     * - The first water normal map.
     */
    normalMap0?: Texture | null;
    /**
     * -  The second water normal map.
     */
    normalMap1?: Texture | null;
};
/** @module Water2 */
/**
 * An advanced water effect that supports reflections, refractions and flow maps.
 *
 * Note that this class can only be used with {@link WebGLRenderer}.
 * When using {@link WebGPURenderer}, use {@link module:Water2Mesh}.
 *
 * References:
 *
 * - {@link https://alex.vlachos.com/graphics/Vlachos-SIGGRAPH10-WaterFlow.pdf}
 * - {@link http://graphicsrunner.blogspot.de/2010/08/water-using-flow-maps.html}
 *
 * @augments Mesh
 * @three_import import { Water } from 'three/addons/objects/Water2.js';
 */
export class Water extends Mesh {
    /**
     * Constructs a new water instance.
     *
     * @param {BufferGeometry} geometry - The water's geometry.
     * @param {module:Water2~Options} [options] - The configuration options.
     */
    constructor(geometry: BufferGeometry, options?: any);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWater: boolean;
    onBeforeRender: (renderer: any, scene: any, camera: any) => void;
}
export namespace Water {
    namespace WaterShader {
        let name: string;
        namespace uniforms {
            namespace color {
                let type: string;
                let value: null;
            }
            namespace reflectivity {
                let type_1: string;
                export { type_1 as type };
                let value_1: number;
                export { value_1 as value };
            }
            namespace tReflectionMap {
                let type_2: string;
                export { type_2 as type };
                let value_2: null;
                export { value_2 as value };
            }
            namespace tRefractionMap {
                let type_3: string;
                export { type_3 as type };
                let value_3: null;
                export { value_3 as value };
            }
            namespace tNormalMap0 {
                let type_4: string;
                export { type_4 as type };
                let value_4: null;
                export { value_4 as value };
            }
            namespace tNormalMap1 {
                let type_5: string;
                export { type_5 as type };
                let value_5: null;
                export { value_5 as value };
            }
            namespace textureMatrix {
                let type_6: string;
                export { type_6 as type };
                let value_6: null;
                export { value_6 as value };
            }
            namespace config {
                let type_7: string;
                export { type_7 as type };
                let value_7: Vector4;
                export { value_7 as value };
            }
        }
        let vertexShader: string;
        let fragmentShader: string;
    }
}
import { Color } from 'three';
import { Vector2 } from 'three';
import { Mesh } from 'three';
import { Vector4 } from 'three';
