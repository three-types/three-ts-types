/**
 * A special type of an animated mesh with a more advanced interface
 * for animation playback. Unlike {@link MorphAnimMesh}. It allows to
 * playback more than one morph animation at the same time but without
 * fading options.
 *
 * @augments Mesh
 * @three_import import { MorphBlendMesh } from 'three/addons/misc/MorphBlendMesh.js';
 */
export class MorphBlendMesh extends Mesh {
    /**
     * Constructs a new morph blend mesh.
     *
     * @param {BufferGeometry} [geometry] - The mesh geometry.
     * @param {Material|Array<Material>} [material] - The mesh material.
     */
    constructor(geometry?: BufferGeometry, material?: Material | Array<Material>);
    /**
     * A dictionary of animations.
     *
     * @type {Object<string,Object>}
     */
    animationsMap: {
        [x: string]: Object;
    };
    /**
     * A list of animations.
     *
     * @type {Array<Object>}
     */
    animationsList: Array<Object>;
    /**
     * Creates a new animation.
     *
     * @param {string} name - The animation name.
     * @param {number} start - The start time.
     * @param {number} end - The end time.
     * @param {number} fps - The FPS.
     */
    createAnimation(name: string, start: number, end: number, fps: number): void;
    /**
     * Automatically creates animations based on the values in
     * {@link Mesh#morphTargetDictionary}.
     *
     * @param {number} fps - The FPS of all animations.
     */
    autoCreateAnimations(fps: number): void;
    firstAnimation: string | undefined;
    /**
     * Sets the animation playback direction to "forward" for the
     * defined animation.
     *
     * @param {string} name - The animation name.
     */
    setAnimationDirectionForward(name: string): void;
    /**
     * Sets the animation playback direction to "backward" for the
     * defined animation.
     *
     * @param {string} name - The animation name.
     */
    setAnimationDirectionBackward(name: string): void;
    /**
     * Sets the FPS to the given value for the defined animation.
     *
     * @param {string} name - The animation name.
     * @param {number} fps - The FPS to set.
     */
    setAnimationFPS(name: string, fps: number): void;
    /**
     * Sets the duration to the given value for the defined animation.
     *
     * @param {string} name - The animation name.
     * @param {number} duration - The duration to set.
     */
    setAnimationDuration(name: string, duration: number): void;
    /**
     * Sets the weight to the given value for the defined animation.
     *
     * @param {string} name - The animation name.
     * @param {number} weight - The weight to set.
     */
    setAnimationWeight(name: string, weight: number): void;
    /**
     * Sets the time to the given value for the defined animation.
     *
     * @param {string} name - The animation name.
     * @param {number} time - The time to set.
     */
    setAnimationTime(name: string, time: number): void;
    /**
     * Returns the time for the defined animation.
     *
     * @param {string} name - The animation name.
     * @return {number} The time.
     */
    getAnimationTime(name: string): number;
    /**
     * Returns the duration for the defined animation.
     *
     * @param {string} name - The animation name.
     * @return {number} The duration.
     */
    getAnimationDuration(name: string): number;
    /**
     * Plays the defined animation.
     *
     * @param {string} name - The animation name.
     */
    playAnimation(name: string): void;
    /**
     * Stops the defined animation.
     *
     * @param {string} name - The animation name.
     */
    stopAnimation(name: string): void;
    /**
     * Updates the animations of the mesh.
     *
     * @param {number} delta - The delta time in seconds.
     */
    update(delta: number): void;
}
import { Mesh } from 'three';
