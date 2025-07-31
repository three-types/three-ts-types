export default PhongLightingModel;
/**
 * Represents the lighting model for a phong material. Used in {@link MeshPhongNodeMaterial}.
 *
 * @augments BasicLightingModel
 */
declare class PhongLightingModel extends BasicLightingModel {
    /**
     * Constructs a new phong lighting model.
     *
     * @param {boolean} [specular=true] - Whether specular is supported or not.
     */
    constructor(specular?: boolean);
    /**
     * Whether specular is supported or not. Set this to `false` if you are
     * looking for a Lambert-like material meaning a material for non-shiny
     * surfaces, without specular highlights.
     *
     * @type {boolean}
     * @default true
     */
    specular: boolean;
    /**
     * Implements the direct lighting. The specular portion is optional an can be controlled
     * with the {@link PhongLightingModel#specular} flag.
     *
     * @param {Object} lightData - The light data.
     */
    direct({ lightDirection, lightColor, reflectedLight }: Object): void;
}
import BasicLightingModel from './BasicLightingModel.js';
