import { Vector2 } from "../math/Vector2.js";
import { Vector3 } from "../math/Vector3.js";

export type SerializedImage =
    | string
    | {
        data: number[];
        width: number;
        height: number;
        type: string;
    };

export interface TextureSourceJSON {
    uuid: string;
    url: SerializedImage | SerializedImage[];
}

/**
 * @deprecated since r186. Use {@link TextureSource} instead. `Source` has been renamed to `TextureSource`.
 */
export class Source<TData> extends TextureSource<TData> {
    /**
     * This flag can be used for type testing.
     *
     * @deprecated since r186. Use {@link TextureSource#isTextureSource} instead.
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSource: true;
}
/**
 * Represents the data source of a texture.
 *
 * The main purpose of this class is to decouple the data definition from the texture
 * definition so the same data can be used with multiple texture instances.
 */
export class TextureSource<TData> {
    /**
     * Constructs a new texture source.
     *
     * @param {any} [data=null] - The data definition of a texture.
     */
    constructor(data?: TData);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isTextureSource: true;
    /**
     * The ID of the source.
     *
     * @type {number}
     * @readonly
     */
    readonly id: number;
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
    data: TData;
    /**
     * This property is only relevant when {@link TextureSource#needsUpdate} is set to `true` and
     * provides more control on how texture data should be processed. When `dataReady` is set
     * to `false`, the engine performs the memory allocation (if necessary) but does not transfer
     * the data into the GPU memory.
     *
     * @type {boolean}
     * @default true
     */
    dataReady: boolean;
    /**
     * This starts at `0` and counts how many times {@link TextureSource#needsUpdate} is set to `true`.
     *
     * @type {number}
     * @readonly
     * @default 0
     */
    readonly version: number;
    /**
     * Returns the dimensions of the source into the given target vector.
     *
     * @param {(Vector2|Vector3)} target - The target object the result is written into.
     * @return {(Vector2|Vector3)} The dimensions of the source.
     */
    getSize<TTarget extends Vector2 | Vector3>(target: TTarget): TTarget;
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
    toJSON(meta?: string | {}): TextureSourceJSON;
}
