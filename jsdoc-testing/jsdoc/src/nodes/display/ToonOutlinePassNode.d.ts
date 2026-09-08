export default ToonOutlinePassNode;
export function toonOutlinePass(scene: Scene, camera: Camera, color?: Color, thickness?: number, alpha?: number): ToonOutlinePassNode;
/**
 * Represents a render pass for producing a toon outline effect on compatible objects.
 * Only 3D objects with materials of type `MeshToonMaterial` and `MeshToonNodeMaterial`
 * will receive the outline.
 *
 * ```js
 * const postProcessing = new RenderPipeline( renderer );
 *
 * const scenePass = toonOutlinePass( scene, camera );
 *
 * postProcessing.outputNode = scenePass;
 * ```
 * @augments PassNode
 */
declare class ToonOutlinePassNode extends PassNode {
    /**
     * Constructs a new outline pass node.
     *
     * @param {Scene} scene - A reference to the scene.
     * @param {Camera} camera - A reference to the camera.
     * @param {Node} colorNode - Defines the outline's color.
     * @param {Node} thicknessNode - Defines the outline's thickness.
     * @param {Node} alphaNode - Defines the outline's alpha.
     */
    constructor(scene: Scene, camera: Camera, colorNode: Node, thicknessNode: Node, alphaNode: Node);
    /**
     * Defines the outline's color.
     *
     * @type {Node}
     */
    colorNode: Node;
    /**
     * Defines the outline's thickness.
     *
     * @type {Node}
     */
    thicknessNode: Node;
    /**
     * Defines the outline's alpha.
     *
     * @type {Node}
     */
    alphaNode: Node;
    /**
     * An internal material cache.
     *
     * @private
     * @type {WeakMap<Material, NodeMaterial>}
     */
    private _materialCache;
    /**
     * Creates the material used for outline rendering.
     *
     * @private
     * @return {NodeMaterial} The outline material.
     */
    private _createMaterial;
    /**
     * For the given toon material, this method returns a corresponding
     * outline material.
     *
     * @private
     * @param {(MeshToonMaterial|MeshToonNodeMaterial)} originalMaterial - The toon material.
     * @return {NodeMaterial} The outline material.
     */
    private _getOutlineMaterial;
}
import { Color } from '../../math/Color.js';
import PassNode from './PassNode.js';
