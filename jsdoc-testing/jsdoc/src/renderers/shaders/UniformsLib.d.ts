export namespace UniformsLib {
    namespace common {
        namespace diffuse {
            let value: Color;
        }
        namespace opacity {
            let value_1: number;
            export { value_1 as value };
        }
        namespace map {
            let value_2: null;
            export { value_2 as value };
        }
        namespace mapTransform {
            let value_3: Matrix3;
            export { value_3 as value };
        }
        namespace alphaMap {
            let value_4: null;
            export { value_4 as value };
        }
        namespace alphaMapTransform {
            let value_5: Matrix3;
            export { value_5 as value };
        }
        namespace alphaTest {
            let value_6: number;
            export { value_6 as value };
        }
    }
    namespace specularmap {
        namespace specularMap {
            let value_7: null;
            export { value_7 as value };
        }
        namespace specularMapTransform {
            let value_8: Matrix3;
            export { value_8 as value };
        }
    }
    namespace envmap {
        namespace envMap {
            let value_9: null;
            export { value_9 as value };
        }
        namespace envMapRotation {
            let value_10: Matrix3;
            export { value_10 as value };
        }
        namespace reflectivity {
            let value_11: number;
            export { value_11 as value };
        }
        namespace ior {
            let value_12: number;
            export { value_12 as value };
        }
        namespace refractionRatio {
            let value_13: number;
            export { value_13 as value };
        }
        namespace dfgLUT {
            let value_14: null;
            export { value_14 as value };
        }
    }
    namespace aomap {
        namespace aoMap {
            let value_15: null;
            export { value_15 as value };
        }
        namespace aoMapIntensity {
            let value_16: number;
            export { value_16 as value };
        }
        namespace aoMapTransform {
            let value_17: Matrix3;
            export { value_17 as value };
        }
    }
    namespace lightmap {
        namespace lightMap {
            let value_18: null;
            export { value_18 as value };
        }
        namespace lightMapIntensity {
            let value_19: number;
            export { value_19 as value };
        }
        namespace lightMapTransform {
            let value_20: Matrix3;
            export { value_20 as value };
        }
    }
    namespace bumpmap {
        namespace bumpMap {
            let value_21: null;
            export { value_21 as value };
        }
        namespace bumpMapTransform {
            let value_22: Matrix3;
            export { value_22 as value };
        }
        namespace bumpScale {
            let value_23: number;
            export { value_23 as value };
        }
    }
    namespace normalmap {
        namespace normalMap {
            let value_24: null;
            export { value_24 as value };
        }
        namespace normalMapTransform {
            let value_25: Matrix3;
            export { value_25 as value };
        }
        namespace normalScale {
            let value_26: Vector2;
            export { value_26 as value };
        }
    }
    namespace displacementmap {
        namespace displacementMap {
            let value_27: null;
            export { value_27 as value };
        }
        namespace displacementMapTransform {
            let value_28: Matrix3;
            export { value_28 as value };
        }
        namespace displacementScale {
            let value_29: number;
            export { value_29 as value };
        }
        namespace displacementBias {
            let value_30: number;
            export { value_30 as value };
        }
    }
    namespace emissivemap {
        namespace emissiveMap {
            let value_31: null;
            export { value_31 as value };
        }
        namespace emissiveMapTransform {
            let value_32: Matrix3;
            export { value_32 as value };
        }
    }
    namespace metalnessmap {
        namespace metalnessMap {
            let value_33: null;
            export { value_33 as value };
        }
        namespace metalnessMapTransform {
            let value_34: Matrix3;
            export { value_34 as value };
        }
    }
    namespace roughnessmap {
        namespace roughnessMap {
            let value_35: null;
            export { value_35 as value };
        }
        namespace roughnessMapTransform {
            let value_36: Matrix3;
            export { value_36 as value };
        }
    }
    namespace gradientmap {
        namespace gradientMap {
            let value_37: null;
            export { value_37 as value };
        }
    }
    namespace fog {
        namespace fogDensity {
            let value_38: number;
            export { value_38 as value };
        }
        namespace fogNear {
            let value_39: number;
            export { value_39 as value };
        }
        namespace fogFar {
            let value_40: number;
            export { value_40 as value };
        }
        namespace fogColor {
            let value_41: Color;
            export { value_41 as value };
        }
    }
    namespace lights {
        namespace ambientLightColor {
            let value_42: never[];
            export { value_42 as value };
        }
        namespace lightProbe {
            let value_43: never[];
            export { value_43 as value };
        }
        namespace directionalLights {
            let value_44: never[];
            export { value_44 as value };
            export namespace properties {
                let direction: {};
                let color: {};
            }
        }
        namespace directionalLightShadows {
            let value_45: never[];
            export { value_45 as value };
            export namespace properties_1 {
                let shadowIntensity: number;
                let shadowBias: {};
                let shadowNormalBias: {};
                let shadowRadius: {};
                let shadowMapSize: {};
            }
            export { properties_1 as properties };
        }
        namespace directionalShadowMatrix {
            let value_46: never[];
            export { value_46 as value };
        }
        namespace spotLights {
            let value_47: never[];
            export { value_47 as value };
            export namespace properties_2 {
                let color_1: {};
                export { color_1 as color };
                export let position: {};
                let direction_1: {};
                export { direction_1 as direction };
                export let distance: {};
                export let coneCos: {};
                export let penumbraCos: {};
                export let decay: {};
            }
            export { properties_2 as properties };
        }
        namespace spotLightShadows {
            let value_48: never[];
            export { value_48 as value };
            export namespace properties_3 {
                let shadowIntensity_1: number;
                export { shadowIntensity_1 as shadowIntensity };
                let shadowBias_1: {};
                export { shadowBias_1 as shadowBias };
                let shadowNormalBias_1: {};
                export { shadowNormalBias_1 as shadowNormalBias };
                let shadowRadius_1: {};
                export { shadowRadius_1 as shadowRadius };
                let shadowMapSize_1: {};
                export { shadowMapSize_1 as shadowMapSize };
            }
            export { properties_3 as properties };
        }
        namespace spotLightMap {
            let value_49: never[];
            export { value_49 as value };
        }
        namespace spotLightMatrix {
            let value_50: never[];
            export { value_50 as value };
        }
        namespace pointLights {
            let value_51: never[];
            export { value_51 as value };
            export namespace properties_4 {
                let color_2: {};
                export { color_2 as color };
                let position_1: {};
                export { position_1 as position };
                let decay_1: {};
                export { decay_1 as decay };
                let distance_1: {};
                export { distance_1 as distance };
            }
            export { properties_4 as properties };
        }
        namespace pointLightShadows {
            let value_52: never[];
            export { value_52 as value };
            export namespace properties_5 {
                let shadowIntensity_2: number;
                export { shadowIntensity_2 as shadowIntensity };
                let shadowBias_2: {};
                export { shadowBias_2 as shadowBias };
                let shadowNormalBias_2: {};
                export { shadowNormalBias_2 as shadowNormalBias };
                let shadowRadius_2: {};
                export { shadowRadius_2 as shadowRadius };
                let shadowMapSize_2: {};
                export { shadowMapSize_2 as shadowMapSize };
                export let shadowCameraNear: {};
                export let shadowCameraFar: {};
            }
            export { properties_5 as properties };
        }
        namespace pointShadowMatrix {
            let value_53: never[];
            export { value_53 as value };
        }
        namespace hemisphereLights {
            let value_54: never[];
            export { value_54 as value };
            export namespace properties_6 {
                let direction_2: {};
                export { direction_2 as direction };
                export let skyColor: {};
                export let groundColor: {};
            }
            export { properties_6 as properties };
        }
        namespace rectAreaLights {
            let value_55: never[];
            export { value_55 as value };
            export namespace properties_7 {
                let color_3: {};
                export { color_3 as color };
                let position_2: {};
                export { position_2 as position };
                export let width: {};
                export let height: {};
            }
            export { properties_7 as properties };
        }
        namespace ltc_1 {
            let value_56: null;
            export { value_56 as value };
        }
        namespace ltc_2 {
            let value_57: null;
            export { value_57 as value };
        }
        namespace probesSH {
            let value_58: null;
            export { value_58 as value };
        }
        namespace probesMin {
            let value_59: Vector3;
            export { value_59 as value };
        }
        namespace probesMax {
            let value_60: Vector3;
            export { value_60 as value };
        }
        namespace probesResolution {
            let value_61: Vector3;
            export { value_61 as value };
        }
    }
    namespace points {
        export namespace diffuse_1 {
            let value_62: Color;
            export { value_62 as value };
        }
        export { diffuse_1 as diffuse };
        export namespace opacity_1 {
            let value_63: number;
            export { value_63 as value };
        }
        export { opacity_1 as opacity };
        export namespace size {
            let value_64: number;
            export { value_64 as value };
        }
        export namespace scale {
            let value_65: number;
            export { value_65 as value };
        }
        export namespace map_1 {
            let value_66: null;
            export { value_66 as value };
        }
        export { map_1 as map };
        export namespace alphaMap_1 {
            let value_67: null;
            export { value_67 as value };
        }
        export { alphaMap_1 as alphaMap };
        export namespace alphaMapTransform_1 {
            let value_68: Matrix3;
            export { value_68 as value };
        }
        export { alphaMapTransform_1 as alphaMapTransform };
        export namespace alphaTest_1 {
            let value_69: number;
            export { value_69 as value };
        }
        export { alphaTest_1 as alphaTest };
        export namespace uvTransform {
            let value_70: Matrix3;
            export { value_70 as value };
        }
    }
    namespace sprite {
        export namespace diffuse_2 {
            let value_71: Color;
            export { value_71 as value };
        }
        export { diffuse_2 as diffuse };
        export namespace opacity_2 {
            let value_72: number;
            export { value_72 as value };
        }
        export { opacity_2 as opacity };
        export namespace center {
            let value_73: Vector2;
            export { value_73 as value };
        }
        export namespace rotation {
            let value_74: number;
            export { value_74 as value };
        }
        export namespace map_2 {
            let value_75: null;
            export { value_75 as value };
        }
        export { map_2 as map };
        export namespace mapTransform_1 {
            let value_76: Matrix3;
            export { value_76 as value };
        }
        export { mapTransform_1 as mapTransform };
        export namespace alphaMap_2 {
            let value_77: null;
            export { value_77 as value };
        }
        export { alphaMap_2 as alphaMap };
        export namespace alphaMapTransform_2 {
            let value_78: Matrix3;
            export { value_78 as value };
        }
        export { alphaMapTransform_2 as alphaMapTransform };
        export namespace alphaTest_2 {
            let value_79: number;
            export { value_79 as value };
        }
        export { alphaTest_2 as alphaTest };
    }
}
import { Color } from '../../math/Color.js';
import { Matrix3 } from '../../math/Matrix3.js';
import { Vector2 } from '../../math/Vector2.js';
import { Vector3 } from '../../math/Vector3.js';
