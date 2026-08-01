/**
 * This helper displays the directional cone of a positional audio.
 *
 * `PositionalAudioHelper` must be added as a child of the positional audio.
 *
 * ```js
 * const positionalAudio = new THREE.PositionalAudio( listener );
 * positionalAudio.setDirectionalCone( 180, 230, 0.1 );
 * scene.add( positionalAudio );
 *
 * const helper = new PositionalAudioHelper( positionalAudio );
 * positionalAudio.add( helper );
 * ```
 *
 * @augments Line
 * @three_import import { PositionalAudioHelper } from 'three/addons/helpers/PositionalAudioHelper.js';
 */
export class PositionalAudioHelper extends Line {
    /**
     * Constructs a new positional audio helper.
     *
     * @param {PositionalAudio} audio - The audio to visualize.
     * @param {number} [range=1] - The range of the directional cone.
     * @param {number} [divisionsInnerAngle=16] - The number of divisions of the inner part of the directional cone.
     * @param {number} [divisionsOuterAngle=2] The number of divisions of the outer part of the directional cone.
     */
    constructor(audio: PositionalAudio, range?: number, divisionsInnerAngle?: number, divisionsOuterAngle?: number);
    /**
     * The audio to visualize.
     *
     * @type {PositionalAudio}
     */
    audio: PositionalAudio;
    /**
     * The range of the directional cone.
     *
     * @type {number}
     * @default 1
     */
    range: number;
    /**
     * The number of divisions of the inner part of the directional cone.
     *
     * @type {number}
     * @default 16
     */
    divisionsInnerAngle: number;
    /**
     * The number of divisions of the outer part of the directional cone.
     *
     * @type {number}
     * @default 2
     */
    divisionsOuterAngle: number;
    /**
     * Updates the helper. This method must be called whenever the directional cone
     * of the positional audio is changed.
     */
    update(): void;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { Line } from 'three';
