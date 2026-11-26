export default PointsNodeMaterial;
/**
 * Node material version of {@link PointsMaterial}.
 *
 * This material can be used in two ways:
 *
 * - By rendering point primitives with {@link Points}. Since WebGPU only supports point primitives
 * with a pixel size of `1`, it's not possible to define a size.
 *
 * ```js
 * const pointCloud = new THREE.Points( geometry, new THREE.PointsNodeMaterial() );
 * ```
 *
 * - By rendering instanced quads with {@link Sprite}. In this case, size is honored,
 * see {@link PointsNodeMaterial#sizeNode}. Set {@link Sprite#count} to the number of points.
 *
 * ```js
 * const instancedPoints = new THREE.Sprite( new THREE.PointsNodeMaterial( { positionNode: instancedBufferAttribute( positionAttribute ) } ) );
 * instancedPoints.count = positionAttribute.count;
 * ```
 *
 * @augments SpriteNodeMaterial
 */
declare class PointsNodeMaterial extends SpriteNodeMaterial {
    /**
     * This node property allows to overwrite the point size defined by `size`. The size
     * is in pixels, additionally scaled by distance when `sizeAttenuation` is `true`.
     *
     * Note that `WebGPURenderer` always renders point primitives with a size of 1 pixel (with
     * both backends). Consequently, this node has no effect when the material is used with
     * {@link Points}. If an application wants to render points with a size larger than 1 pixel,
     * the material should be used with {@link Sprite} and instancing.
     *
     * @type {?Node<vec2>}
     * @default null
     */
    sizeNode: Node<any> | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPointsNodeMaterial: boolean;
    setupPositionView(): any;
    setupVertexSprite(builder: any): any;
    setupVertex(builder: any): any;
    _useAlphaToCoverage: any;
}
import SpriteNodeMaterial from './SpriteNodeMaterial.js';
