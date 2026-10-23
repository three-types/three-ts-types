export default ProxyNodeMaterial;
/**
 * A material instance that reuses the shader of a node material with its own properties.
 * All instances created from the same node material share a single shader build, so
 * configure the node material before creating instances. Instance values are read in
 * the shared node graph with `materialReference( name, type )`. Node properties such as
 * `colorNode` are read-only and always read from the node material.
 *
 * ```js
 * const nodeMaterial = new MeshBasicNodeMaterial();
 * nodeMaterial.colorNode = materialReference( 'myColor', 'color' );
 *
 * const material = new ProxyNodeMaterial( nodeMaterial );
 * material.myColor = new Color( 1, 0, 0 );
 * ```
 *
 * @augments Material
 */
declare class ProxyNodeMaterial extends Material {
    /**
     * Constructs a new proxy node material.
     *
     * @param {NodeMaterial} nodeMaterial - The node material defining the shared shader.
     * @throws {TypeError} When the given material is not a node material.
     */
    constructor(nodeMaterial: NodeMaterial);
    userData: {};
    type: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isProxyNodeMaterial: boolean;
    /**
     * The node material defining the shared shader.
     *
     * @type {NodeMaterial}
     */
    nodeMaterial: NodeMaterial;
    /**
     * Builds the shader of the node material while keeping this instance
     * as `builder.material`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    build(builder: NodeBuilder): void;
    set version(value: number);
    /**
     * The version of the node material. Setting `needsUpdate` on the node material
     * updates all its instances, while setting it on an instance has no effect.
     *
     * @type {number}
     */
    get version(): number;
    /**
     * Copies the values of the given proxy node material to this instance.
     * Object values such as colors are shared with the source, except in `userData`.
     * Unlike {@link Material#copy}, `userData` is not copied via JSON: its first level
     * values are cloned when possible, so types such as colors are preserved. Textures
     * remain shared.
     *
     * @param {ProxyNodeMaterial} source - The material to copy.
     * @return {ProxyNodeMaterial} A reference to this instance.
     */
    copy(source: ProxyNodeMaterial): ProxyNodeMaterial;
    /**
     * Returns a new proxy node material that shares the same node material.
     *
     * @return {ProxyNodeMaterial} A clone of this instance.
     */
    clone(): ProxyNodeMaterial;
}
import { Material } from '../Material.js';
