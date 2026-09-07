export class IFFParser {
    debugger: Debugger;
    parse(buffer: any): {
        materials: {};
        layers: never[];
        tags: never[];
        textures: never[];
    } | undefined;
    reader: DataViewReader | undefined;
    tree: {
        materials: {};
        layers: never[];
        tags: never[];
        textures: never[];
    } | undefined;
    currentLayer: {
        materials: {};
        layers: never[];
        tags: never[];
        textures: never[];
    } | {
        number: number;
        flags: number;
        pivot: number[];
        name: string | undefined;
    } | undefined;
    currentForm: any;
    parser: LWO2Parser | LWO3Parser | undefined;
    parseTopForm(): void;
    parseForm(length: any): void;
    parentForm: any;
    setupForm(type: any, length: any): void;
    currentFormEnd: any;
    skipForm(length: any): void;
    parseUnknownForm(type: any, length: any): void;
    parseSurfaceForm(length: any): void;
    currentSurface: {
        attributes: {};
        connections: {};
        name: string | undefined;
        inputName: string | undefined;
        nodes: {};
        source: string | undefined;
    } | {
        attributes: {};
        connections: {};
        name: string | undefined;
        nodes: {};
        source: string | undefined;
    } | undefined;
    parseSurfaceLwo2(length: any): void;
    parseSubNode(length: any): void;
    currentNode: {
        name: string | undefined;
    } | undefined;
    parseConnections(length: any): void;
    parseEntryForm(length: any): void;
    parseValueForm(): void;
    parseImageStateForm(): void;
    parseImageMap(length: any): void;
    parseTextureNodeAttribute(type: any): void;
    parseEnvelope(length: any): void;
    parseClip(length: any): void;
    parseClipLwo2(length: any): void;
    parseImage(): void;
    parseXVAL(type: any, length: any): void;
    parseXVAL3(type: any, length: any): void;
    parseObjectTag(): void;
    parseLayer(length: any): void;
    parsePoints(length: any): void;
    currentPoints: any[] | undefined;
    parseVertexMapping(length: any, discontinuous: any): void;
    parseUVMapping(name: any, finalOffset: any, discontinuous: any): void;
    parseMorphTargets(name: any, finalOffset: any, type: any): void;
    parsePolygonList(length: any): void;
    parseTagStrings(length: any): void;
    parsePolygonTagMapping(length: any): void;
    parseMaterialIndices(finalOffset: any): void;
    parseUnknownCHUNK(blockID: any, length: any): void;
}
declare class Debugger {
    active: boolean;
    depth: number;
    formList: any[];
    offset: number;
    node: number;
    nodeID: string;
    dataOffset: number;
    length: number;
    skipped: boolean;
    enable(): void;
    log(): void;
    closeForms(): void;
}
declare class DataViewReader {
    constructor(buffer: any);
    dv: DataView<any>;
    offset: number;
    _textDecoder: TextDecoder;
    _bytes: Uint8Array<any>;
    size(): any;
    setOffset(offset: any): void;
    endOfFile(): boolean;
    skip(length: any): void;
    getUint8(): number;
    getUint16(): number;
    getInt32(): number;
    getUint32(): number;
    getUint64(): number;
    getFloat32(): number;
    getFloat32Array(size: any): number[];
    getFloat64(): number;
    getFloat64Array(size: any): number[];
    getVariableLengthIndex(): number;
    getIDTag(): string | undefined;
    getString(size: any): string | undefined;
    getStringArray(size: any): any;
}
import { LWO2Parser } from './LWO2Parser.js';
import { LWO3Parser } from './LWO3Parser.js';
export {};
