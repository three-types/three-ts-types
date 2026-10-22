/**
 * This class represents a management component for animated MD2
 * character assets.
 *
 * @three_import import { MD2Character } from 'three/addons/misc/MD2Character.js';
 */
export class MD2Character {
    /**
     * The mesh scale.
     *
     * @type {number}
     * @default 1
     */
    scale: number;
    /**
     * The FPS
     *
     * @type {number}
     * @default 6
     */
    animationFPS: number;
    /**
     * The root 3D object
     *
     * @type {Object3D}
     */
    root: Object3D;
    /**
     * The body mesh.
     *
     * @type {?Mesh}
     * @default null
     */
    meshBody: Mesh | null;
    /**
     * The weapon mesh.
     *
     * @type {?Mesh}
     * @default null
     */
    meshWeapon: Mesh | null;
    /**
     * The body skins.
     *
     * @type {Array<Texture>}
     */
    skinsBody: Array<Texture>;
    /**
     * The weapon skins.
     *
     * @type {Array<Texture>}
     */
    skinsWeapon: Array<Texture>;
    /**
     * The weapon meshes.
     *
     * @type {Array<Mesh>}
     */
    weapons: Array<Mesh>;
    /**
     * The name of the active animation clip.
     *
     * @type {?string}
     * @default null
     */
    activeAnimationClipName: string | null;
    /**
     * The animation mixer.
     *
     * @type {?AnimationMixer}
     * @default null
     */
    mixer: AnimationMixer | null;
    /**
     * The `onLoad` callback function.
     *
     * @type {Function}
     */
    onLoadComplete: Function;
    loadCounter: number;
    /**
     * Loads the character model for the given config.
     *
     * @param {Object} config - The config which defines the model and textures paths.
     */
    loadParts(config: Object): void;
    /**
     * Sets the animation playback rate.
     *
     * @param {number} rate - The playback rate to set.
     */
    setPlaybackRate(rate: number): void;
    /**
     * Sets the wireframe material flag.
     *
     * @param {boolean} wireframeEnabled - Whether to enable wireframe rendering or not.
     */
    setWireframe(wireframeEnabled: boolean): void;
    /**
     * Sets the skin defined by the given skin index. This will result in a different texture
     * for the body mesh.
     *
     * @param {number} index - The skin index.
     */
    setSkin(index: number): void;
    /**
     * Sets the weapon defined by the given weapon index. This will result in a different weapon
     * hold by the character.
     *
     * @param {number} index - The weapon index.
     */
    setWeapon(index: number): void;
    /**
     * Sets the defined animation clip as the active animation.
     *
     * @param {string} clipName - The name of the animation clip.
     */
    setAnimation(clipName: string): void;
    activeClipName: string | undefined;
    /**
     * Synchronizes the weapon with the body animation.
     */
    syncWeaponAnimation(): void;
    /**
     * Updates the animations of the mesh. Must be called inside the animation loop.
     *
     * @param {number} delta - The delta time in seconds.
     */
    update(delta: number): void;
}
import { Object3D } from 'three';
import { Mesh } from 'three';
import { AnimationMixer } from 'three';
