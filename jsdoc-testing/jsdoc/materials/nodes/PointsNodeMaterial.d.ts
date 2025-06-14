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
