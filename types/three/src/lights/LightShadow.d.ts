import { Camera } from './../cameras/Camera.js';
import { Light } from './../lights/Light.js';
import { Vector2 } from './../math/Vector2.js';
import { Vector4 } from './../math/Vector4.js';
import { Matrix4 } from './../math/Matrix4.js';
import { WebGLRenderTarget } from '../renderers/WebGLRenderTarget.js';

export class LightShadow {
    constructor(camera: Camera);

    camera: Camera;

    /**
     * @default 0
     */
    bias: number;

    /**
     * @default 0
     */
    normalBias: number;

    /**
     * @default 1
     */
    radius: number;

    /**
     * @default 8
     */
    blurSamples: number;

    /**
     * @default new THREE.Vector2( 512, 512 )
     */
    mapSize: Vector2;

    /**
     * @default null
     */
    map: WebGLRenderTarget;

    /**
     * @default null
     */
    mapPass: WebGLRenderTarget;

    /**
     * @default new THREE.Matrix4()
     */
    matrix: Matrix4;

    /**
     * @default true
     */
    autoUpdate: boolean;

    /**
     * @default false
     */
    needsUpdate: boolean;

    copy(source: LightShadow): this;
    clone(recursive?: boolean): this;
    toJSON(): any;
    getFrustum(): number;
    updateMatrices(light: Light, viewportIndex?: number): void;
    getViewport(viewportIndex: number): Vector4;
    getFrameExtents(): Vector2;
    dispose(): void;
}
