/**
 * Represents the data source of a texture.
 *
 * The main purpose of this class is to decouple the data definition from the texture
 * definition so the same data can be used with multiple texture instances.
 */
export class Source {
    /**
     * Constructs a new video texture.
     *
     * @param {any} [data=null] - The data definition of a texture.
     */
    constructor(data?: any);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSource: boolean;
    /**
     * The UUID of the source.
     *
     * @type {string}
     * @readonly
     */
    readonly uuid: string;
    /**
     * The data definition of a texture.
     *
     * @type {any}
     */
    data: any;
    /**
     * This property is only relevant when {@link Source#needsUpdate} is set to `true` and
     * provides more control on how texture data should be processed. When `dataReady` is set
     * to `false`, the engine performs the memory allocation (if necessary) but does not transfer
     * the data into the GPU memory.
     *
     * @type {boolean}
     * @default true
     */
    dataReady: boolean;
    /**
     * This starts at `0` and counts how many times {@link Source#needsUpdate} is set to `true`.
     *
     * @type {number}
     * @readonly
     * @default 0
     */
    readonly version: number;
    getSize(target: any): any;
    /**
     * When the property is set to `true`, the engine allocates the memory
     * for the texture (if necessary) and triggers the actual texture upload
     * to the GPU next time the source is used.
     *
     * @type {boolean}
     * @default false
     * @param {boolean} value
     */
    set needsUpdate(value: boolean);
    /**
     * Serializes the source into JSON.
     *
     * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
     * @return {Object} A JSON object representing the serialized source.
     * @see {@link ObjectLoader#parse}
     */
    toJSON(meta: (Object | string) | null): Object;
}
