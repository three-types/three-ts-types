export default MaterialNode;
/**
 * TSL object that represents alpha test of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialAlphaTest: Node<any>;
/**
 * TSL object that represents the diffuse color of the current material.
 * The value is composed via `color` * `map`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialColor: Node<any>;
/**
 * TSL object that represents the shininess of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialShininess: Node<any>;
/**
 * TSL object that represents the emissive color of the current material.
 * The value is composed via `emissive` * `emissiveIntensity` * `emissiveMap`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialEmissive: Node<any>;
/**
 * TSL object that represents the opacity of the current material.
 * The value is composed via `opacity` * `alphaMap`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialOpacity: Node<any>;
/**
 * TSL object that represents the specular of the current material.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialSpecular: Node<any>;
/**
 * TSL object that represents the specular intensity of the current material.
 * The value is composed via `specularIntensity` * `specularMap.a`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialSpecularIntensity: Node<any>;
/**
 * TSL object that represents the specular color of the current material.
 * The value is composed via `specularColor` * `specularMap.rgb`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialSpecularColor: Node<any>;
/**
 * TSL object that represents the specular strength of the current material.
 * The value is composed via `specularMap.r`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialSpecularStrength: Node<any>;
/**
 * TSL object that represents the reflectivity of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialReflectivity: Node<any>;
/**
 * TSL object that represents the roughness of the current material.
 * The value is composed via `roughness` * `roughnessMap.g`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialRoughness: Node<any>;
/**
 * TSL object that represents the metalness of the current material.
 * The value is composed via `metalness` * `metalnessMap.b`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialMetalness: Node<any>;
/**
 * TSL object that represents the normal of the current material.
 * The value will be either `normalMap` * `normalScale`, `bumpMap` * `bumpScale` or `normalView`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialNormal: Node<any>;
/**
 * TSL object that represents the clearcoat of the current material.
 * The value is composed via `clearcoat` * `clearcoatMap.r`
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialClearcoat: Node<any>;
/**
 * TSL object that represents the clearcoat roughness of the current material.
 * The value is composed via `clearcoatRoughness` * `clearcoatRoughnessMap.r`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialClearcoatRoughness: Node<any>;
/**
 * TSL object that represents the clearcoat normal of the current material.
 * The value will be either `clearcoatNormalMap` or `normalView`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialClearcoatNormal: Node<any>;
/**
 * TSL object that represents the rotation of the current sprite material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialRotation: Node<any>;
/**
 * TSL object that represents the sheen color of the current material.
 * The value is composed via `sheen` * `sheenColor` * `sheenColorMap`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialSheen: Node<any>;
/**
 * TSL object that represents the sheen roughness of the current material.
 * The value is composed via `sheenRoughness` * `sheenRoughnessMap.a`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialSheenRoughness: Node<any>;
/**
 * TSL object that represents the anisotropy of the current material.
 *
 * @tsl
 * @type {Node<vec2>}
 */
export const materialAnisotropy: Node<any>;
/**
 * TSL object that represents the iridescence of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialIridescence: Node<any>;
/**
 * TSL object that represents the iridescence IOR of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialIridescenceIOR: Node<any>;
/**
 * TSL object that represents the iridescence thickness of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialIridescenceThickness: Node<any>;
/**
 * TSL object that represents the transmission of the current material.
 * The value is composed via `transmission` * `transmissionMap.r`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialTransmission: Node<any>;
/**
 * TSL object that represents the thickness of the current material.
 * The value is composed via `thickness` * `thicknessMap.g`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialThickness: Node<any>;
/**
 * TSL object that represents the IOR of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialIOR: Node<any>;
/**
 * TSL object that represents the attenuation distance of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialAttenuationDistance: Node<any>;
/**
 * TSL object that represents the attenuation color of the current material.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialAttenuationColor: Node<any>;
/**
 * TSL object that represents the scale of the current dashed line material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialLineScale: Node<any>;
/**
 * TSL object that represents the dash size of the current dashed line material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialLineDashSize: Node<any>;
/**
 * TSL object that represents the gap size of the current dashed line material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialLineGapSize: Node<any>;
/**
 * TSL object that represents the line width of the current line material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialLineWidth: Node<any>;
/**
 * TSL object that represents the dash offset of the current line material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialLineDashOffset: Node<any>;
/**
 * TSL object that represents the point size of the current points material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialPointSize: Node<any>;
/**
 * TSL object that represents the dispersion of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialDispersion: Node<any>;
/**
 * TSL object that represents the light map of the current material.
 * The value is composed via `lightMapIntensity` * `lightMap.rgb`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialLightMap: Node<any>;
/**
 * TSL object that represents the ambient occlusion map of the current material.
 * The value is composed via `aoMap.r` - 1 * `aoMapIntensity` + 1.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialAO: Node<any>;
/**
 * TSL object that represents the anisotropy vector of the current material.
 *
 * @tsl
 * @type {Node<vec2>}
 */
export const materialAnisotropyVector: Node<any>;
/**
 * This class should simplify the node access to material properties.
 * It internal uses reference nodes to make sure  changes to material
 * properties are automatically reflected to predefined TSL objects
 * like e.g. `materialColor`.
 *
 * @augments Node
 */
declare class MaterialNode extends Node {
    /**
     * Constructs a new material node.
     *
     * @param {string} scope - The scope defines what kind of material property is referred by the node.
     */
    constructor(scope: string);
    /**
     * The scope defines what material property is referred by the node.
     *
     * @type {string}
     */
    scope: string;
    /**
     * Returns a cached reference node for the given property and type.
     *
     * @param {string} property - The name of the material property.
     * @param {string} type - The uniform type of the property.
     * @return {MaterialReferenceNode} A material reference node representing the property access.
     */
    getCache(property: string, type: string): MaterialReferenceNode;
    /**
     * Returns a float-typed material reference node for the given property name.
     *
     * @param {string} property - The name of the material property.
     * @return {MaterialReferenceNode<float>} A material reference node representing the property access.
     */
    getFloat(property: string): MaterialReferenceNode<any>;
    /**
     * Returns a color-typed material reference node for the given property name.
     *
     * @param {string} property - The name of the material property.
     * @return {MaterialReferenceNode<color>} A material reference node representing the property access.
     */
    getColor(property: string): MaterialReferenceNode<color>;
    /**
     * Returns a texture-typed material reference node for the given property name.
     *
     * @param {string} property - The name of the material property.
     * @return {MaterialReferenceNode} A material reference node representing the property access.
     */
    getTexture(property: string): MaterialReferenceNode;
    /**
     * The node setup is done depending on the selected scope. Multiple material properties
     * might be grouped into a single node composition if they logically belong together.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node} The node representing the selected scope.
     */
    setup(builder: NodeBuilder): Node;
}
declare namespace MaterialNode {
    let ALPHA_TEST: string;
    let COLOR: string;
    let OPACITY: string;
    let SHININESS: string;
    let SPECULAR: string;
    let SPECULAR_STRENGTH: string;
    let SPECULAR_INTENSITY: string;
    let SPECULAR_COLOR: string;
    let REFLECTIVITY: string;
    let ROUGHNESS: string;
    let METALNESS: string;
    let NORMAL: string;
    let CLEARCOAT: string;
    let CLEARCOAT_ROUGHNESS: string;
    let CLEARCOAT_NORMAL: string;
    let EMISSIVE: string;
    let ROTATION: string;
    let SHEEN: string;
    let SHEEN_ROUGHNESS: string;
    let ANISOTROPY: string;
    let IRIDESCENCE: string;
    let IRIDESCENCE_IOR: string;
    let IRIDESCENCE_THICKNESS: string;
    let IOR: string;
    let TRANSMISSION: string;
    let THICKNESS: string;
    let ATTENUATION_DISTANCE: string;
    let ATTENUATION_COLOR: string;
    let LINE_SCALE: string;
    let LINE_DASH_SIZE: string;
    let LINE_GAP_SIZE: string;
    let LINE_WIDTH: string;
    let LINE_DASH_OFFSET: string;
    let POINT_SIZE: string;
    let DISPERSION: string;
    let LIGHT_MAP: string;
    let AO: string;
}
import Node from '../core/Node.js';
