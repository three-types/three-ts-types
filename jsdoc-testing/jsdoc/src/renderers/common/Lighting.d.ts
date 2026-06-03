export default Lighting;
/**
 * This renderer module manages the lights nodes which are unique
 * per scene and camera combination.
 *
 * The lights node itself is later configured in the render list
 * with the actual lights from the scene.
 *
 * @private
 */
declare class Lighting {
    /**
     * Creates a new lights node for the given array of lights.
     *
     * @param {Array<Light>} lights - The render object.
     * @return {LightsNode} The lights node.
     */
    createNode(lights?: Array<Light>): LightsNode;
    /**
     * Returns a lights node for the given scene and camera.
     *
     * @param {Scene} scene - The scene.
     * @param {Camera} camera - The camera.
     * @return {LightsNode} The lights node.
     */
    getNode(scene: Scene): LightsNode;
}
import { LightsNode } from '../../nodes/Nodes.js';
