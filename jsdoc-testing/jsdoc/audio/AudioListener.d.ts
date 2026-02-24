/**
 * The class represents a virtual listener of the all positional and non-positional audio effects
 * in the scene. A three.js application usually creates a single listener. It is a mandatory
 * constructor parameter for audios entities like {@link Audio} and {@link PositionalAudio}.
 *
 * In most cases, the listener object is a child of the camera. So the 3D transformation of the
 * camera represents the 3D transformation of the listener.
 *
 * @augments Object3D
 */
export class AudioListener extends Object3D {
    type: string;
    /**
     * The native audio context.
     *
     * @type {AudioContext}
     * @readonly
     */
    readonly context: AudioContext;
    /**
     * The gain node used for volume control.
     *
     * @type {GainNode}
     * @readonly
     */
    readonly gain: GainNode;
    /**
     * An optional filter.
     *
     * Defined via {@link AudioListener#setFilter}.
     *
     * @type {?AudioNode}
     * @default null
     * @readonly
     */
    readonly filter: AudioNode | null;
    /**
     * Time delta values required for `linearRampToValueAtTime()` usage.
     *
     * @type {number}
     * @default 0
     * @readonly
     */
    readonly timeDelta: number;
    _clock: Clock;
    /**
     * Returns the listener's input node.
     *
     * This method is used by other audio nodes to connect to this listener.
     *
     * @return {GainNode} The input node.
     */
    getInput(): GainNode;
    /**
     * Removes the current filter from this listener.
     *
     * @return {AudioListener} A reference to this listener.
     */
    removeFilter(): AudioListener;
    /**
     * Returns the current set filter.
     *
     * @return {?AudioNode} The filter.
     */
    getFilter(): AudioNode | null;
    /**
     * Sets the given filter to this listener.
     *
     * @param {AudioNode} value - The filter to set.
     * @return {AudioListener} A reference to this listener.
     */
    setFilter(value: AudioNode): AudioListener;
    /**
     * Returns the applications master volume.
     *
     * @return {number} The master volume.
     */
    getMasterVolume(): number;
    /**
     * Sets the applications master volume. This volume setting affects
     * all audio nodes in the scene.
     *
     * @param {number} value - The master volume to set.
     * @return {AudioListener} A reference to this listener.
     */
    setMasterVolume(value: number): AudioListener;
    updateMatrixWorld(force: any): void;
}
import { Object3D } from '../core/Object3D.js';
import { AudioContext } from './AudioContext.js';
import { Clock } from '../core/Clock.js';
