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
 * - By rendering point primitives with {@link Sprites}. In this case, size is honored,
 * see {@link PointsNodeMaterial#sizeNode}.
 *
 * ```js
 * const instancedPoints = new THREE.Sprite( new THREE.PointsNodeMaterial( { positionNode: instancedBufferAttribute( positionAttribute ) } ) );
 * ```
 *
 * @augments SpriteNodeMaterial
 */
declare class PointsNodeMaterial extends SpriteNodeMaterial {
    /**
     * This node property provides an additional way to set the point size.
     *
     * Note that WebGPU only supports point primitives with 1 pixel size. Consequently,
     * this node has no effect when the material is used with {@link Points} and a WebGPU
     * backend. If an application wants to render points with a size larger than 1 pixel,
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
