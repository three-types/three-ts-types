/**
* Generates vertex tangents for the given position/normal/texcoord attributes.
* @param {Float32Array} position
* @param {Float32Array} normal
* @param {Float32Array} texcoord
* @returns {Float32Array}
*/
export function generateTangents(position: Float32Array, normal: Float32Array, texcoord: Float32Array): Float32Array;
export function dispose(): void;
export function __wbindgen_string_new(arg0: any, arg1: any): number;
export function __wbindgen_rethrow(arg0: any): never;
export let wasm: any;
export let isReady: boolean;
export namespace ready {
    function then(onFulfilled: any, onRejected: any): any;
}
