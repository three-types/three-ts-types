export default WebGPU;
/**
 * A utility module with basic WebGPU capability testing.
 *
 * @hideconstructor
 * @three_import import WebGPU from 'three/addons/capabilities/WebGPU.js';
 */
declare class WebGPU {
    /**
     * Returns `true` if WebGPU is available.
     *
     * @return {boolean} Whether WebGPU is available or not.
     */
    static isAvailable(): boolean;
    /**
     * Returns a `div` element representing a formatted error message that can be appended in
     * web sites if WebGPU isn't supported.
     *
     * @return {HTMLDivElement} A `div` element representing a formatted error message that WebGPU isn't supported.
     */
    static getErrorMessage(): HTMLDivElement;
}
