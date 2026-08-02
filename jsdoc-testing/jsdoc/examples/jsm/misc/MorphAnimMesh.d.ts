/**
 * A special type of an animated mesh with a simple interface
 * for animation playback. It allows to playback just one animation
 * without any transitions or fading between animation changes.
 *
 * @augments Mesh
 * @three_import import { MorphAnimMesh } from 'three/addons/misc/MorphAnimMesh.js';
 */
export class MorphAnimMesh extends Mesh {
    /**
     * Constructs a new morph anim mesh.
     *
     * @param {BufferGeometry} [geometry] - The mesh geometry.
     * @param {Material|Array<Material>} [material] - The mesh material.
     */
    constructor(geometry?: BufferGeometry, material?: Material | Array<Material>);
    /**
     * The internal animation mixer.
     *
     * @type {AnimationMixer}
     */
    mixer: AnimationMixer;
    /**
     * The current active animation action.
     *
     * @type {?AnimationAction}
     * @default null
     */
    activeAction: AnimationAction | null;
    /**
     * Sets the animation playback direction to "forward".
     */
    setDirectionForward(): void;
    /**
     * Sets the animation playback direction to "backward".
     */
    setDirectionBackward(): void;
    /**
     * Plays the defined animation clip. The implementation assumes the animation
     * clips are stored in {@link Object3D#animations} or the geometry.
     *
     * @param {string} label - The name of the animation clip.
     * @param {number} fps - The FPS of the animation clip.
     */
    playAnimation(label: string, fps: number): void;
    /**
     * Updates the animations of the mesh. Must be called inside the animation loop.
     *
     * @param {number} delta - The delta time in seconds.
     */
    updateAnimation(delta: number): void;
    copy(source: any, recursive: any): this;
}
import { Mesh } from 'three';
import { AnimationMixer } from 'three';
