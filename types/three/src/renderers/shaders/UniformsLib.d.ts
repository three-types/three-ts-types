import { Color } from '../../math/Color.js';
import { Vector2 } from '../../math/Vector2.js';
import { Matrix3 } from '../../math/Matrix3.js';

// tslint:disable-next-line:interface-name
export interface IUniform<TValue = unknown> {
    value: TValue;
}

export const UniformsLib: {
    common: {
        diffuse: IUniform<Color>;
        opacity: IUniform<number>;
        map: IUniform;
        mapTransform: IUniform<Matrix3>;
        alphaMap: IUniform;
        alphaMapTransform: IUniform<Matrix3>;
        alphaTest: IUniform<number>;
    };
    specularmap: {
        specularMap: IUniform;
        specularMapTransform: IUniform<Matrix3>;
    };
    envmap: {
        envMap: IUniform;
        flipEnvMap: IUniform<number>;
        reflectivity: IUniform<number>;
        ior: IUniform<number>;
        refractRatio: IUniform<number>;
    };
    aomap: {
        aoMap: IUniform;
        aoMapIntensity: IUniform<number>;
        aoMapTransform: IUniform<Matrix3>;
    };
    lightmap: {
        lightMap: IUniform<number>;
        lightMapIntensity: IUniform<number>;
        lightMapTransform: IUniform<Matrix3>;
    };
    bumpmap: {
        bumpMap: IUniform;
        bumpMapTransform: IUniform<Matrix3>;
        bumpScale: IUniform<number>;
    };
    normalmap: {
        normalMap: IUniform;
        normalMapTransform: IUniform<Matrix3>;
        normalScale: IUniform<Vector2>;
    };
    displacementmap: {
        displacementMap: IUniform;
        displacementMapTransform: IUniform<Matrix3>;
        displacementScale: IUniform<number>;
        displacementBias: IUniform<number>;
    };
    emissivemap: {
        emissiveMap: IUniform;
        emissiveMapTransform: IUniform<Matrix3>;
    };
    metalnessmap: {
        metalnessMap: IUniform;
        metalnessMapTransform: IUniform<Matrix3>;
    };
    roughnessmap: {
        roughnessMap: IUniform;
        roughnessMapTransform: IUniform<Matrix3>;
    };
    gradientmap: {
        gradientMap: IUniform;
    };
    fog: {
        fogDensity: IUniform<number>;
        fogNear: IUniform<number>;
        fogFar: IUniform<number>;
        fogColor: IUniform<Color>;
    };
    lights: {
        ambientLightColor: IUniform<unknown[]>;
        lightProbe: IUniform<unknown[]>;
        directionalLights: {
            value: unknown[];
            properties: {
                direction: {};
                color: {};
            };
        };
        directionalLightShadows: {
            value: unknown[];
            properties: {
                shadowBias: {};
                shadowNormalBias: {};
                shadowRadius: {};
                shadowMapSize: {};
            };
        };
        directionalShadowMap: IUniform<unknown[]>;
        directionalShadowMatrix: IUniform<unknown[]>;
        spotLights: {
            value: unknown[];
            properties: {
                color: {};
                position: {};
                direction: {};
                distance: {};
                coneCos: {};
                penumbraCos: {};
                decay: {};
            };
        };
        spotLightShadows: {
            value: unknown[];
            properties: {
                shadowBias: {};
                shadowNormalBias: {};
                shadowRadius: {};
                shadowMapSize: {};
            };
        };
        spotLightMap: IUniform<unknown[]>;
        spotShadowMap: IUniform<unknown[]>;
        spotLightMatrix: IUniform<unknown[]>;
        pointLights: {
            value: unknown[];
            properties: {
                color: {};
                position: {};
                decay: {};
                distance: {};
            };
        };
        pointLightShadows: {
            value: unknown[];
            properties: {
                shadowBias: {};
                shadowNormalBias: {};
                shadowRadius: {};
                shadowMapSize: {};
                shadowCameraNear: {};
                shadowCameraFar: {};
            };
        };
        pointShadowMap: IUniform<unknown[]>;
        pointShadowMatrix: IUniform<unknown[]>;
        hemisphereLights: {
            value: unknown[];
            properties: {
                direction: {};
                skycolor: {};
                groundColor: {};
            };
        };
        rectAreaLights: {
            value: unknown[];
            properties: {
                color: {};
                position: {};
                width: {};
                height: {};
            };
        };
        ltc_1: IUniform;
        ltc_2: IUniform;
    };
    points: {
        diffuse: IUniform<Color>;
        opacity: IUniform<number>;
        size: IUniform<number>;
        scale: IUniform<number>;
        map: IUniform;
        alphaMap: IUniform;
        alphaTest: IUniform<number>;
        uvTransform: IUniform<Matrix3>;
    };
    sprite: {
        diffuse: IUniform<Color>;
        opacity: IUniform<number>;
        center: IUniform<Vector2>;
        rotation: IUniform<number>;
        map: IUniform;
        mapTransform: IUniform<Matrix3>;
        alphaMap: IUniform;
        alphaTest: IUniform<number>;
    };
};
