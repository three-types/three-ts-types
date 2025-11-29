import Node from "../core/Node.js";

export type MaterialNodeScope =
    | typeof MaterialNode.ALPHA_TEST
    | typeof MaterialNode.COLOR
    | typeof MaterialNode.OPACITY
    | typeof MaterialNode.SHININESS
    | typeof MaterialNode.SPECULAR
    | typeof MaterialNode.SPECULAR_STRENGTH
    | typeof MaterialNode.SPECULAR_INTENSITY
    | typeof MaterialNode.SPECULAR_COLOR
    | typeof MaterialNode.REFLECTIVITY
    | typeof MaterialNode.ROUGHNESS
    | typeof MaterialNode.METALNESS
    | typeof MaterialNode.NORMAL
    | typeof MaterialNode.CLEARCOAT
    | typeof MaterialNode.CLEARCOAT_ROUGHNESS
    | typeof MaterialNode.CLEARCOAT_NORMAL
    | typeof MaterialNode.EMISSIVE
    | typeof MaterialNode.ROTATION
    | typeof MaterialNode.SHEEN
    | typeof MaterialNode.SHEEN_ROUGHNESS
    | typeof MaterialNode.ANISOTROPY
    | typeof MaterialNode.IRIDESCENCE
    | typeof MaterialNode.IRIDESCENCE_IOR
    | typeof MaterialNode.IRIDESCENCE_THICKNESS
    | typeof MaterialNode.IOR
    | typeof MaterialNode.TRANSMISSION
    | typeof MaterialNode.THICKNESS
    | typeof MaterialNode.ATTENUATION_DISTANCE
    | typeof MaterialNode.ATTENUATION_COLOR
    | typeof MaterialNode.LINE_SCALE
    | typeof MaterialNode.LINE_DASH_SIZE
    | typeof MaterialNode.LINE_GAP_SIZE
    | typeof MaterialNode.LINE_WIDTH
    | typeof MaterialNode.LINE_DASH_OFFSET
    | typeof MaterialNode.POINT_SIZE
    | typeof MaterialNode.DISPERSION
    | typeof MaterialNode.LIGHT_MAP
    | typeof MaterialNode.AO
    | typeof MaterialNode.REFRACTION_RATIO;

export default class MaterialNode extends Node {
    static ALPHA_TEST: "alphaTest";
    static COLOR: "color";
    static OPACITY: "opacity";
    static SHININESS: "shininess";
    static SPECULAR: "specular";
    static SPECULAR_STRENGTH: "specularStrength";
    static SPECULAR_INTENSITY: "specularIntensity";
    static SPECULAR_COLOR: "specularColor";
    static REFLECTIVITY: "reflectivity";
    static ROUGHNESS: "roughness";
    static METALNESS: "metalness";
    static NORMAL: "normal";
    static CLEARCOAT: "clearcoat";
    static CLEARCOAT_ROUGHNESS: "clearcoatRoughness";
    static CLEARCOAT_NORMAL: "clearcoatNormal";
    static EMISSIVE: "emissive";
    static ROTATION: "rotation";
    static SHEEN: "sheen";
    static SHEEN_ROUGHNESS: "sheenRoughness";
    static ANISOTROPY: "anisotropy";
    static IRIDESCENCE: "iridescence";
    static IRIDESCENCE_IOR: "iridescenceIOR";
    static IRIDESCENCE_THICKNESS: "iridescenceThickness";
    static IOR: "ior";
    static TRANSMISSION: "transmission";
    static THICKNESS: "thickness";
    static ATTENUATION_DISTANCE: "attenuationDistance";
    static ATTENUATION_COLOR: "attenuationColor";
    static LINE_SCALE: "scale";
    static LINE_DASH_SIZE: "dashSize";
    static LINE_GAP_SIZE: "gapSize";
    static LINE_WIDTH: "linewidth";
    static LINE_DASH_OFFSET: "dashOffset";
    static POINT_SIZE: "size";
    static DISPERSION: "dispersion";
    static LIGHT_MAP: "light";
    static AO: "ao";
    static REFRACTION_RATIO: "refractionRatio";

    scope: MaterialNodeScope;
    constructor(scope?: MaterialNodeScope);
}

export const materialAlphaTest: Node<"float">;
export const materialColor: Node<"vec3">;
export const materialShininess: Node<"float">;
export const materialEmissive: Node<"vec3">;
export const materialOpacity: Node<"float">;
export const materialSpecular: Node<"vec3">;

export const materialSpecularIntensity: Node<"float">;
export const materialSpecularColor: Node<"vec3">;

export const materialSpecularStrength: Node<"float">;
export const materialReflectivity: Node<"float">;
export const materialRoughness: Node<"float">;
export const materialMetalness: Node<"float">;
export const materialNormal: Node<"vec3">;
export const materialClearcoat: Node<"float">;
export const materialClearcoatRoughness: Node<"float">;
export const materialClearcoatNormal: Node<"vec3">;
export const materialRotation: Node<"float">;
export const materialSheen: Node<"vec3">;
export const materialSheenRoughness: Node<"float">;
export const materialAnisotropy: Node<"vec2">;
export const materialIridescence: Node<"float">;
export const materialIridescenceIOR: Node<"float">;
export const materialIridescenceThickness: Node<"float">;
export const materialTransmission: Node<"float">;
export const materialThickness: Node<"float">;
export const materialIOR: Node<"float">;
export const materialAttenuationDistance: Node<"float">;
export const materialAttenuationColor: Node<"vec3">;
export const materialLineScale: Node<"float">;
export const materialLineDashSize: Node<"float">;
export const materialLineGapSize: Node<"float">;
export const materialLineWidth: Node<"float">;
export const materialLineDashOffset: Node<"float">;
export const materialPointSize: Node<"float">;
export const materialDispersion: Node<"float">;
export const materialLightMap: Node<"vec3">;
export const materialAO: Node<"float">;
export const materialAnisotropyVector: Node<"vec2">;
