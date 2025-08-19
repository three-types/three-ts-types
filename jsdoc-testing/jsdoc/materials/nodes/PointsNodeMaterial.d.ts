export default PointsNodeMaterial;
/**
 * Node material version of {@link PointsMaterial}.
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
    setupVertex(builder: any): any;
    _useAlphaToCoverage: any;
}
import SpriteNodeMaterial from './SpriteNodeMaterial.js';
