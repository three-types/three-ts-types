/**
 * This is a helper for visualising a given light's shadow map.
 * It works for shadow casting lights: DirectionalLight and SpotLight.
 * It renders out the shadow map and displays it on a HUD.
 *
 * This module can only be used with {@link WebGLRenderer}. When using {@link WebGPURenderer},
 * import the class from `ShadowMapViewerGPU.js`.
 *
 * ```js
 * const lightShadowMapViewer = new ShadowMapViewer( light );
 * lightShadowMapViewer.position.x = 10;
 * lightShadowMapViewer.position.y = SCREEN_HEIGHT - ( SHADOW_MAP_HEIGHT / 4 ) - 10;
 * lightShadowMapViewer.size.width = SHADOW_MAP_WIDTH / 4;
 * lightShadowMapViewer.size.height = SHADOW_MAP_HEIGHT / 4;
 * lightShadowMapViewer.update();
 * ```
 *
 * @three_import import { ShadowMapViewer } from 'three/addons/utils/ShadowMapViewer.js';
 */
export class ShadowMapViewer {
    /**
     * Constructs a new shadow map viewer.
     *
     * @param {Light} light - The shadow casting light.
     */
    constructor(light: Light);
    /**
     * Whether to display the shadow map viewer or not.
     *
     * @type {boolean}
     * @default true
     */
    enabled: boolean;
    /**
     * The size of the viewer. When changing this property, make sure
     * to call {@link ShadowMapViewer#update}.
     *
     * @type {{width:number,height:number}}
     * @default true
     */
    size: {
        width: number;
        height: number;
    };
    /**
     * The position of the viewer. When changing this property, make sure
     * to call {@link ShadowMapViewer#update}.
     *
     * @type {{x:number,y:number, set:function(number,number)}}
     * @default true
     */
    position: {
        x: number;
        y: number;
        set: (arg0: number, arg1: number) => any;
    };
    /**
     * Renders the viewer. This method must be called in the app's animation loop.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     */
    render: (renderer: WebGLRenderer) => void;
    /**
     * Resizes the viewer. This method should be called whenever the app's
     * window is resized.
     */
    updateForWindowResize: () => void;
    /**
     * Updates the viewer.
     */
    update: () => void;
}
