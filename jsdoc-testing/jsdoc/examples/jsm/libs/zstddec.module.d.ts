/**
* ZSTD (Zstandard) decoder.
*/
export var ZSTDDecoder: {
    new (): {
        init(): any;
        _init(result: any): void;
        decode(array: any, uncompressedSize?: number): any;
        decodeStreaming(arrays: any): Generator<any, void, unknown>;
    };
};
