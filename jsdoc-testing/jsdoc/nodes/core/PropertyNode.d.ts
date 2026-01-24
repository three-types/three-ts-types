export default PropertyNode;
export function property(type: string, name?: string | null): PropertyNode;
export function varyingProperty(type: string, name?: string | null): PropertyNode;
/**
 * TSL object that represents the shader variable `DiffuseColor`.
 *
 * @tsl
 * @type {PropertyNode<vec4>}
 */
export const diffuseColor: PropertyNode<vec4>;
/**
 * TSL object that represents the shader variable `DiffuseContribution`.
 *
 * @tsl
 * @type {PropertyNode<vec3>}
 */
export const diffuseContribution: PropertyNode<vec3>;
/**
 * TSL object that represents the shader variable `EmissiveColor`.
 *
 * @tsl
 * @type {PropertyNode<vec3>}
 */
export const emissive: PropertyNode<vec3>;
/**
 * TSL object that represents the shader variable `Roughness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const roughness: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `Metalness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const metalness: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `Clearcoat`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const clearcoat: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `ClearcoatRoughness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const clearcoatRoughness: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `Sheen`.
 *
 * @tsl
 * @type {PropertyNode<vec3>}
 */
export const sheen: PropertyNode<vec3>;
/**
 * TSL object that represents the shader variable `SheenRoughness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const sheenRoughness: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `Iridescence`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const iridescence: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `IridescenceIOR`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const iridescenceIOR: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `IridescenceThickness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const iridescenceThickness: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `AlphaT`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const alphaT: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `Anisotropy`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const anisotropy: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `AnisotropyT`.
 *
 * @tsl
 * @type {PropertyNode<vec3>}
 */
export const anisotropyT: PropertyNode<vec3>;
/**
 * TSL object that represents the shader variable `AnisotropyB`.
 *
 * @tsl
 * @type {PropertyNode<vec3>}
 */
export const anisotropyB: PropertyNode<vec3>;
/**
 * TSL object that represents the shader variable `SpecularColor`.
 *
 * @tsl
 * @type {PropertyNode<color>}
 */
export const specularColor: PropertyNode<color>;
/**
 * TSL object that represents the shader variable `SpecularColorBlended`.
 *
 * @tsl
 * @type {PropertyNode<color>}
 */
export const specularColorBlended: PropertyNode<color>;
/**
 * TSL object that represents the shader variable `SpecularF90`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const specularF90: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `Shininess`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const shininess: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `Output`.
 *
 * @tsl
 * @type {PropertyNode<vec4>}
 */
export const output: PropertyNode<vec4>;
/**
 * TSL object that represents the shader variable `dashSize`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const dashSize: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `gapSize`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const gapSize: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `pointWidth`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const pointWidth: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `IOR`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const ior: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `Transmission`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const transmission: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `Thickness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const thickness: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `AttenuationDistance`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const attenuationDistance: PropertyNode<float>;
/**
 * TSL object that represents the shader variable `AttenuationColor`.
 *
 * @tsl
 * @type {PropertyNode<color>}
 */
export const attenuationColor: PropertyNode<color>;
/**
 * TSL object that represents the shader variable `Dispersion`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const dispersion: PropertyNode<float>;
/**
 * This class represents a shader property. It can be used
 * to explicitly define a property and assign a value to it.
 *
 * ```js
 * const threshold = property( 'float', 'threshold' ).assign( THRESHOLD );
 *```
 * `PropertyNode` is used by the engine to predefined common material properties
 * for TSL code.
 *
 * @augments Node
 */
declare class PropertyNode extends Node {
    /**
     * Constructs a new property node.
     *
     * @param {string} nodeType - The type of the node.
     * @param {?string} [name=null] - The name of the property in the shader.
     * @param {boolean} [varying=false] - Whether this property is a varying or not.
     */
    constructor(nodeType: string, name?: string | null, varying?: boolean);
    /**
     * Whether this property is a varying or not.
     *
     * @type {boolean}
     * @default false
     */
    varying: boolean;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPropertyNode: boolean;
    getHash(builder: any): string;
    generate(builder: any): any;
}
import Node from './Node.js';
