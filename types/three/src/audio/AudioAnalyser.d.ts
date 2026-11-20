import { Audio } from "./Audio.js";

/**
 * This class can be used to analyse audio data.
 *
 * ```js
 * // create an AudioListener and add it to the camera
 * const listener = new THREE.AudioListener();
 * camera.add( listener );
 *
 * // create an Audio source
 * const sound = new THREE.Audio( listener );
 *
 * // load a sound and set it as the Audio object's buffer
 * const audioLoader = new THREE.AudioLoader();
 * audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
 * 	sound.setBuffer( buffer );
 * 	sound.setLoop(true);
 * 	sound.setVolume(0.5);
 * 	sound.play();
 * });
 *
 * // create an AudioAnalyser, passing in the sound and desired fftSize
 * const analyser = new THREE.AudioAnalyser( sound, 32 );
 *
 * // get the average magnitude of the frequency data
 * const data = analyser.getAverageFrequency();
 * ```
 */
export class AudioAnalyser {
    /**
     * Constructs a new audio analyzer.
     *
     * @param {Audio} audio - The audio to analyze.
     * @param {number} [fftSize=2048] - The window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency domain data.
     */
    constructor(audio: Audio<AudioNode>, fftSize?: number);
    /**
     * The native analyser node used to compute the frequency data.
     */
    analyser: AnalyserNode;
    /**
     * Holds the analyzed data.
     */
    data: Uint8Array;
    /**
     * Returns an array with frequency data of the audio.
     *
     * Each item in the array is an unsigned byte in the range `[0, 255]`, linearly
     * mapped from `analyser.minDecibels` to `analyser.maxDecibels`. Item `k` represents
     * the frequency `k * sampleRate / fftSize`, so the frequencies are spread linearly
     * from `0` up to just below half the sample rate.
     *
     * @return {Uint8Array} The frequency data.
     */
    getFrequencyData(): Uint8Array;
    /**
     * Returns the average of the frequency data returned by {@link AudioAnalyser#getFrequencyData},
     * i.e. the mean magnitude across all frequency bins.
     *
     * @return {number} The average magnitude in the range `[0, 255]`.
     */
    getAverageFrequency(): number;
}
