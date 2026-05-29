export class TSLGraphLoader extends FileLoader {
    static get hasGraphs(): boolean;
    static getCodes(): any;
    static setCodes(codes: any): void;
    static setGraph(graphId: any, graphData: any): void;
    static getGraph(graphId: any): any;
    static deleteGraph(graphId: any): void;
    static setGraphs(json: any): any;
    static clearGraphs(): void;
    constructor(manager: any);
    load(url: any, onLoad: any, onProgress: any, onError: any): void;
    parseMaterial(json: any): any;
    parseMaterials(json: any): any;
    parse(json: any): TSLGraphLoaderApplier;
    _generateMaterialCode(json: any, name?: string, imports?: {}): any;
    _generateCode(materials: any, imports: any): string;
}
import { FileLoader } from 'three';
declare class TSLGraphLoaderApplier {
    constructor(tslGraphFns: any);
    tslGraphFns: any;
    apply(scene: any): void;
}
export {};
