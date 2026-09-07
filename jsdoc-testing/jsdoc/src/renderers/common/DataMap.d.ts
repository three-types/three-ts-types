export default DataMap;
/**
 * Data structure for the renderer. It is intended to manage
 * data of objects in dictionaries.
 *
 * @private
 */
declare class DataMap {
    /**
     * `DataMap` internally uses a weak map
     * to manage its data.
     *
     * @type {WeakMap<Object, Object>}
     */
    data: WeakMap<Object, Object>;
    /**
     * Returns the dictionary for the given object.
     *
     * @param {Object} object - The object.
     * @return {Object} The dictionary.
     */
    get(object: Object): Object;
    /**
     * Deletes the dictionary for the given object.
     *
     * @param {Object} object - The object.
     * @return {?Object} The deleted dictionary.
     */
    delete(object: Object): Object | null;
    /**
     * Returns `true` if the given object has a dictionary defined.
     *
     * @param {Object} object - The object to test.
     * @return {boolean} Whether a dictionary is defined or not.
     */
    has(object: Object): boolean;
    /**
     * Frees internal resources.
     */
    dispose(): void;
}
