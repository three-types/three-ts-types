export default PhysicalLightingModel;
/**
 * Represents the lighting model for a PBR material.
 *
 * @augments LightingModel
 */
declare class PhysicalLightingModel extends LightingModel {
    /**
     * Constructs a new physical lighting model.
     *
     * @param {boolean} [clearcoat=false] - Whether clearcoat is supported or not.
     * @param {boolean} [sheen=false] - Whether sheen is supported or not.
     * @param {boolean} [iridescence=false] - Whether iridescence is supported or not.
     * @param {boolean} [anisotropy=false] - Whether anisotropy is supported or not.
     * @param {boolean} [transmission=false] - Whether transmission is supported or not.
     * @param {boolean} [dispersion=false] - Whether dispersion is supported or not.
     */
    constructor(clearcoat?: boolean, sheen?: boolean, iridescence?: boolean, anisotropy?: boolean, transmission?: boolean, dispersion?: boolean);
    /**
     * Whether clearcoat is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    clearcoat: boolean;
    /**
     * Whether sheen is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    sheen: boolean;
    /**
     * Whether iridescence is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    iridescence: boolean;
    /**
     * Whether anisotropy is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    anisotropy: boolean;
    /**
     * Whether transmission is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    transmission: boolean;
    /**
     * Whether dispersion is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    dispersion: boolean;
    /**
     * The clear coat radiance.
     *
     * @type {?Node}
     * @default null
     */
    clearcoatRadiance: Node | null;
    /**
     * The clear coat specular direct.
     *
     * @type {?Node}
     * @default null
     */
    clearcoatSpecularDirect: Node | null;
    /**
     * The clear coat specular indirect.
     *
     * @type {?Node}
     * @default null
     */
    clearcoatSpecularIndirect: Node | null;
    /**
     * The sheen specular direct.
     *
     * @type {?Node}
     * @default null
     */
    sheenSpecularDirect: Node | null;
    /**
     * The sheen specular indirect.
     *
     * @type {?Node}
     * @default null
     */
    sheenSpecularIndirect: Node | null;
    /**
     * The iridescence Fresnel.
     *
     * @type {?Node}
     * @default null
     */
    iridescenceFresnel: Node | null;
    /**
     * The iridescence F0.
     *
     * @type {?Node}
     * @default null
     */
    iridescenceF0: Node | null;
    computeMultiscattering(singleScatter: any, multiScatter: any, specularF90: any): void;
    /**
     * Implements the direct light.
     *
     * @param {Object} lightData - The light data.
     * @param {NodeBuilder} builder - The current node builder.
     */
    direct({ lightDirection, lightColor, reflectedLight }: Object): void;
    /**
     * This method is intended for implementing the direct light term for
     * rect area light nodes.
     *
     * @param {Object} input - The input data.
     * @param {NodeBuilder} builder - The current node builder.
     */
    directRectArea({ lightColor, lightPosition, halfWidth, halfHeight, reflectedLight, ltc_1, ltc_2 }: Object): void;
    /**
     * Implements the indirect lighting.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    indirect(builder: NodeBuilder): void;
    /**
     * Implements the indirect diffuse term.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    indirectDiffuse(builder: NodeBuilder): void;
    /**
     * Implements the indirect specular term.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    indirectSpecular(builder: NodeBuilder): void;
    /**
     * Implements the ambient occlusion term.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    ambientOcclusion(builder: NodeBuilder): void;
    /**
     * Used for final lighting accumulations depending on the requested features.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    finish({ context }: NodeBuilder): void;
}
import LightingModel from '../core/LightingModel.js';
