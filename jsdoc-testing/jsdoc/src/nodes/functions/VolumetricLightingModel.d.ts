export default VolumetricLightingModel;
/**
 * VolumetricLightingModel class extends the LightingModel to implement volumetric lighting effects.
 * This model calculates the scattering and transmittance of light through a volumetric medium.
 * It dynamically adjusts the direction of the ray based on the camera and object positions.
 * The model supports custom scattering and depth nodes to enhance the lighting effects.
 *
 * @augments LightingModel
 */
declare class VolumetricLightingModel extends LightingModel {
    start(builder: any): void;
    scatteringLight(lightColor: any, builder: any): void;
    direct({ lightNode, lightColor }: {
        lightNode: any;
        lightColor: any;
    }, builder: any): void;
    directRectArea({ lightColor, lightPosition, halfWidth, halfHeight }: {
        lightColor: any;
        lightPosition: any;
        halfWidth: any;
        halfHeight: any;
    }, builder: any): void;
    finish(builder: any): void;
}
import LightingModel from '../core/LightingModel.js';
