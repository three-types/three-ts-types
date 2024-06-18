export interface TextureImageData {
    data: Uint8Array | Uint8ClampedArray;
    height: number;
    width: number;
}

export interface Texture3DImageData extends TextureImageData {
    depth: number;
}

export interface MipmapImageData {
    data:
        | Int8Array
        | Uint8Array
        | Uint8ClampedArray
        | Int16Array
        | Uint16Array
        | Int32Array
        | Uint32Array
        | Float32Array
        | Float64Array;
    height: number;
    width: number;
}
