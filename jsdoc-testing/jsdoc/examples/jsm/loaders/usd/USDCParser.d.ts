export class USDCParser {
    /**
     * Parse USDC file and return raw spec data without building Three.js scene.
     * Used by USDComposer for unified scene composition.
     */
    parseData(buffer: any): {
        specsByPath: {};
    };
    buffer: any;
    reader: BinaryReader | undefined;
    version: {
        major: number;
        minor: number;
        patch: number;
    } | undefined;
    _conversionBuffer: ArrayBuffer | undefined;
    _conversionView: DataView<ArrayBuffer> | undefined;
    specsByPath: {} | undefined;
    _readBootstrap(): void;
    tocOffset: number | undefined;
    _readTOC(): void;
    sections: {} | undefined;
    _readTokens(): void;
    tokens: any[] | undefined;
    _readStrings(): void;
    strings: any[] | undefined;
    _readFields(): void;
    fields: any[] | undefined;
    _readFieldSets(): void;
    fieldSets: any[] | undefined;
    _readPaths(): void;
    paths: any[] | undefined;
    _readPathsRecursive(parentPath: any, depth?: number): void;
    _buildPathsFromCompressed(pathIndices: any, elementTokenIndices: any, jumps: any): void;
    _readSpecs(): void;
    specs: any[] | undefined;
    _readValue(valueRep: any): any;
    _readInlinedValue(valueRep: any): any;
    _readTimeSamples(valueRep: any): {
        times: any;
        values: any[];
    };
    _readScalarValue(type: any): any;
    _readArrayValue(valueRep: any): any[] | Uint32Array<ArrayBuffer> | Float64Array<ArrayBuffer> | Float32Array<any> | Int32Array<any>;
    _readCompressedArray(type: any, size: any): never[] | Float32Array<any> | Int32Array<any>;
    _readHalf(): number;
    _halfToFloat(h: any): number;
    _getFieldsForSpec(spec: any): {};
}
declare class BinaryReader {
    constructor(buffer: any);
    buffer: any;
    view: DataView<any>;
    offset: number;
    seek(offset: any): void;
    tell(): number;
    readUint8(): number;
    readInt8(): number;
    readUint16(): number;
    readInt16(): number;
    readUint32(): number;
    readInt32(): number;
    readUint64(): number;
    readInt64(): number;
    readFloat32(): number;
    readFloat64(): number;
    readBytes(length: any): Uint8Array<any>;
    readString(length: any): string;
}
export {};
