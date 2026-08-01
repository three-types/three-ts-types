/**
 * A utility class with factory methods for creating basic animation clips.
 *
 * @hideconstructor
 * @three_import import { AnimationClipCreator } from 'three/addons/animation/AnimationClipCreator.js';
 */
export class AnimationClipCreator {
    /**
     * Creates an animation clip that rotates a 3D object 360 degrees
     * in the given period of time around the given axis.
     *
     * @param {number} period - The duration of the animation.
     * @param {('x'|'y'|'z')} [axis='x'] - The axis of rotation.
     * @return {AnimationClip} The created animation clip.
     */
    static CreateRotationAnimation(period: number, axis?: ("x" | "y" | "z")): AnimationClip;
    /**
     * Creates an animation clip that scales a 3D object from `0` to `1`
     * in the given period of time along the given axis.
     *
     * @param {number} period - The duration of the animation.
     * @param {('x'|'y'|'z')} [axis='x'] - The axis to scale the 3D object along.
     * @return {AnimationClip} The created animation clip.
     */
    static CreateScaleAxisAnimation(period: number, axis?: ("x" | "y" | "z")): AnimationClip;
    /**
     * Creates an animation clip that translates a 3D object in a shake pattern
     * in the given period.
     *
     * @param {number} duration - The duration of the animation.
     * @param {Vector3} shakeScale - The scale of the shake.
     * @return {AnimationClip} The created animation clip.
     */
    static CreateShakeAnimation(duration: number, shakeScale: Vector3): AnimationClip;
    /**
     * Creates an animation clip that scales a 3D object in a pulse pattern
     * in the given period.
     *
     * @param {number} duration - The duration of the animation.
     * @param {number} pulseScale - The scale of the pulse.
     * @return {AnimationClip} The created animation clip.
     */
    static CreatePulsationAnimation(duration: number, pulseScale: number): AnimationClip;
    /**
     * Creates an animation clip that toggles the visibility of a 3D object.
     *
     * @param {number} duration - The duration of the animation.
     * @return {AnimationClip} The created animation clip.
     */
    static CreateVisibilityAnimation(duration: number): AnimationClip;
    /**
     * Creates an animation clip that animates the `color` property of a 3D object's
     * material.
     *
     * @param {number} duration - The duration of the animation.
     * @param {Array<Color>} colors - An array of colors that should be sequentially animated.
     * @return {AnimationClip} The created animation clip.
     */
    static CreateMaterialColorAnimation(duration: number, colors: Array<Color>): AnimationClip;
}
import { AnimationClip } from 'three';
import { Vector3 } from 'three';
