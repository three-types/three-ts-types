/**
 * Computes a cache key for the given node.
 *
 * @private
 * @method
 * @param {Object|Node} object - The object to be hashed.
 * @param {boolean} [force=false] - Whether to force a cache key computation or not.
 * @return {number} The hash.
 */
export function getCacheKey(object: Object | Node, force?: boolean): number;
/**
 * This generator function can be used to iterate over the node children
 * of the given object.
 *
 * @private
 * @generator
 * @param {Object} node - The object to be hashed.
 * @param {boolean} [toJSON=false] - Whether to return JSON or not.
 * @yields {Object} A result node holding the property, index (if available) and the child node.
 */
export function getNodeChildren(node: Object, toJSON?: boolean): Generator<{
    property: string;
    index: number;
    childNode: any;
} | {
    property: string;
    childNode: any;
    index?: undefined;
} | {
    property: string;
    index: string;
    childNode: any;
}, void, unknown>;
/**
 * Returns the data type for the given the length.
 *
 * @private
 * @method
 * @param {number} length - The length.
 * @return {string} The data type.
 */
export function getTypeFromLength(length: number): string;
/**
 * Returns the typed array for the given data type.
 *
 * @private
 * @method
 * @param {string} type - The data type.
 * @return {TypedArray} The typed array.
 */
export function getTypedArrayFromType(type: string): TypedArray;
/**
 * Returns the length for the given data type.
 *
 * @private
 * @method
 * @param {string} type - The data type.
 * @return {number} The length.
 */
export function getLengthFromType(type: string): number;
/**
 * Returns the gpu memory length for the given data type.
 *
 * @private
 * @method
 * @param {string} type - The data type.
 * @return {number} The length.
 */
export function getMemoryLengthFromType(type: string): number;
/**
 * Returns the byte boundary for the given data type.
 *
 * @private
 * @method
 * @param {string} type - The data type.
 * @return {number} The byte boundary.
 */
export function getByteBoundaryFromType(type: string): number;
/**
 * Returns the data type for the given value.
 *
 * @private
 * @method
 * @param {any} value - The value.
 * @return {?string} The data type.
 */
export function getValueType(value: any): string | null;
/**
 * Returns the value/object for the given data type and parameters.
 *
 * @private
 * @method
 * @param {string} type - The given type.
 * @param {...any} params - A parameter list.
 * @return {any} The value/object.
 */
export function getValueFromType(type: string, ...params: any[]): any;
/**
 * Gets the object data that can be shared between different rendering steps.
 *
 * @private
 * @param {Object} object - The object to get the data for.
 * @return {Object} The object data.
 */
export function getDataFromObject(object: Object): Object;
/**
 * Converts the given array buffer to a Base64 string.
 *
 * @private
 * @method
 * @param {ArrayBuffer} arrayBuffer - The array buffer.
 * @return {string} The Base64 string.
 */
export function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string;
/**
 * Converts the given Base64 string to an array buffer.
 *
 * @private
 * @method
 * @param {string} base64 - The Base64 string.
 * @return {ArrayBuffer} The array buffer.
 */
export function base64ToArrayBuffer(base64: string): ArrayBuffer;
export function hashString(str: string): number;
export function hashArray(array: Array<number>): number;
export function hash(...params: number[]): number;
