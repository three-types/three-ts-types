export default RetroPassNode;
export function retroPass(scene: Scene, camera: Camera, options?: {
    affineDistortion?: Node | undefined;
}): RetroPassNode;
/**
 * A post-processing pass that applies a retro PS1-style effect to the scene.
 *
 * This node renders the scene with classic PlayStation 1 visual characteristics:
 * - **Vertex snapping**: Vertices are snapped to screen pixels, creating the iconic "wobbly" geometry
 * - **Affine texture mapping**: Textures are sampled without perspective correction, resulting in distortion effects
 * - **Low resolution**: Default 0.25 scale (typical 320x240 equivalent)
 * - **Nearest-neighbor filtering**: Sharp pixelated textures without smoothing
 *
 * @augments PassNode
 */
declare class RetroPassNode extends PassNode {
    /**
     * Creates a new RetroPassNode instance.
     *
     * @param {Scene} scene - The scene to render.
     * @param {Camera} camera - The camera to render from.
     * @param {Object} [options={}] - Additional options for the retro pass.
     * @param {Node} [options.affineDistortion=null] - An optional node to apply affine distortion to UVs.
     */
    constructor(scene: Scene, camera: Camera, options?: {
        affineDistortion?: Node | undefined;
    });
    affineDistortionNode: Node | null;
    filterTextures: any;
    _materialCache: Map<any, any>;
    /**
     * Updates the retro pass before rendering.
     *
     * @override
     * @param {Frame} frame - The current frame information.
     * @returns {void}
     */
    override updateBefore(frame: Frame): void;
}
import { PassNode } from 'three/webgpu';
