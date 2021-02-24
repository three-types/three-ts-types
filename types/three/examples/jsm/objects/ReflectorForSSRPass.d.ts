import {
    Mesh,
    ShaderMaterial,
    WebGLRenderTarget,
    BufferGeometry,
    WebGLRenderer,
    Scene,
    Camera,
} from '../../../src/Three';

export interface ReflectorShader {
    defines: {
        isDistanceAttenuation: boolean;
        isFresnel: boolean;
    };
    uniforms: {
        [key: string]: any;
    };
    vertexShader: string;
    fragmentShader: string;
}

export interface ReflectorOptions {
    clipBias: number;
    textureWidth: number;
    textureHeight: number;
    color: number;
    useDepthTexture: boolean;
    shader?: ReflectorShader;
}

export class Reflector<TGeometry extends BufferGeometry = BufferGeometry> extends Mesh {
    type: string;
    options: object;

    ReflectorShader: ReflectorShader;

    needsUpdate: boolean;
    maxDistance: number;
    opacity: number;

    _isDistanceAttenuation: boolean;
    _isFresnel: boolean;

    material: ShaderMaterial;

    renderTarget: WebGLRenderTarget;

    constructor(geometry: TGeometry, options: ReflectorOptions);

    doRender: (renderer: WebGLRenderer, scene: Scene, camera: Camera) => void;

    getRenderTarget: () => WebGLRenderTarget;
}
