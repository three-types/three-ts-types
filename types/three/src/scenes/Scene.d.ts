// https://threejs.org/docs/?q=scene#api/en/scenes/Scene

import { FogBase } from './Fog.js';
import { Material } from './../materials/Material.js';
import { Object3D } from './../core/Object3D.js';
import { Color } from '../math/Color.js';
import { Texture } from '../textures/Texture.js';
import { WebGLRenderer } from '../renderers/WebGLRenderer.js';
import { Camera } from '../cameras/Camera.js';

// Scenes /////////////////////////////////////////////////////////////////////

/**
 * Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights and cameras.
 */
export class Scene extends Object3D {
    constructor();

    type: 'Scene';

    /**
     * A fog instance defining the type of fog that affects everything rendered in the scene. Default is null.
     * @default null
     */
    fog: FogBase | null;

    /**
     * Sets the blurriness of the background. Only influences environment maps assigned to Scene.background. Valid input is a float between 0 and 1.
     *
     * @default 0
     */
    backgroundBlurriness: number;

    /**
     * Attenuates the color of the background. Only applies to background textures.
     *
     * @default 1
     */
    backgroundIntensity: number;

    /**
     * If not null, it will force everything in the scene to be rendered with that material. Default is null.
     * @default null
     */
    overrideMaterial: Material | null;

    /**
     * @default null
     */
    background: null | Color | Texture;

    /**
     * @default null
     */
    environment: null | Texture;

    readonly isScene: true;

    toJSON(meta?: any): any;
}
