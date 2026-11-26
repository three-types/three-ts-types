export class ZSTDDecoder {
    init(): Promise<void>;

    decode(array: Uint8Array, uncompressedSize?: number): Uint8Array;

    decodeStreaming(arrays: Iterable<Uint8Array>): Generator<Uint8Array, void, unknown>;
}
