/**
 * This class represents a management component for animated MD2
 * character assets. It provides a larger API compared to {@link MD2Character}.
 *
 * @three_import import { MD2CharacterComplex } from 'three/addons/misc/MD2CharacterComplex.js';
 */
export class MD2CharacterComplex {
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
     * The transition frames.
     *
     * @type {number}
     * @default 15
     */
    transitionFrames: number;
    /**
     * The character's maximum speed.
     *
     * @type {number}
     * @default 275
     */
    maxSpeed: number;
    /**
     * The character's maximum reverse speed.
     *
     * @type {number}
     * @default - 275
     */
    maxReverseSpeed: number;
    /**
     * The character's front acceleration.
     *
     * @type {number}
     * @default 600
     */
    frontAcceleration: number;
    /**
     * The character's back acceleration.
     *
     * @type {number}
     * @default 600
     */
    backAcceleration: number;
    /**
     * The character's front deceleration.
     *
     * @type {number}
     * @default 600
     */
    frontDeceleration: number;
    /**
     * The character's angular speed.
     *
     * @type {number}
     * @default 2.5
     */
    angularSpeed: number;
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
     * The movement controls.
     *
     * @type {?Object}
     * @default null
     */
    controls: Object | null;
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
     * The current skin.
     *
     * @type {Texture}
     * @default undefined
     */
    currentSkin: Texture;
    onLoadComplete: () => void;
    meshes: any[];
    animations: {};
    loadCounter: number;
    speed: number;
    bodyOrientation: number;
    walkSpeed: number;
    crouchSpeed: number;
    activeAnimation: any;
    oldAnimation: any;
    /**
     * Toggles shadow casting and receiving on the character's meshes.
     *
     * @param {boolean} enable - Whether to enable shadows or not.
     */
    enableShadows(enable: boolean): void;
    /**
     * Toggles visibility on the character's meshes.
     *
     * @param {boolean} enable - Whether the character is visible or not.
     */
    setVisible(enable: boolean): void;
    /**
     * Shares certain resources from a different character model.
     *
     * @param {MD2CharacterComplex} original - The original MD2 character.
     */
    shareParts(original: MD2CharacterComplex): void;
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
     * @param {string} animationName - The name of the animation clip.
     */
    setAnimation(animationName: string): void;
    blendCounter: number | undefined;
    update(delta: any): void;
    /**
     * Updates the animations of the mesh. Must be called inside the animation loop.
     *
     * @param {number} delta - The delta time in seconds.
     */
    updateAnimations(delta: number): void;
    /**
     * Updates the animation state based on the control inputs.
     */
    updateBehaviors(): void;
    /**
     * Transforms the character model based on the control input.
     *
     * @param {number} delta - The delta time in seconds.
     */
    updateMovementModel(delta: number): void;
    _createPart(geometry: any, skinMap: any): MorphBlendMesh;
}
import { Object3D } from 'three';
import { MorphBlendMesh } from '../misc/MorphBlendMesh.js';
