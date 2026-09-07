export class MaterialXDocument {
    constructor(manager: any, path: any, log: any, archiveResolver?: null, uvSpace?: string);
    manager: any;
    path: any;
    log: any;
    archiveResolver: any;
    uvSpace: any;
    nodesXLib: Map<any, any>;
    imageLoader: ImageLoader;
    textureLoader: ImageBitmapLoader;
    textureCache: Map<any, any>;
    compileContext: {
        mxTransformUv: (uv_scale?: number, uv_offset?: number, uv_geo?: any) => any;
        mxHextileCoord: typeof mxHextileCoord;
        mxHextileComputeBlendWeights: typeof mxHextileComputeBlendWeights;
        invertConstantMatrixValues: typeof invertConstantMatrixValues;
        IDENTITY_MAT3_VALUES: number[];
        IDENTITY_MAT4_VALUES: number[];
        mxToBottomLeftUvSpace: typeof mxFlipUvY;
        mxFromBottomLeftUvSpace: typeof mxFlipUvY;
        compileRegistry: Map<any, any>;
        nodeLibrary: any;
    };
    resolveTextureURI(uri: any): any;
    addMaterialXNode(materialXNode: any): void;
    getMaterialXNode(...names: any[]): any;
    parseNode(nodeXML: any, nodePath?: string): any;
    parse(text: any, materialName?: null, options?: {}): {
        materials: any;
        log: any;
        errors: any;
        warnings: any;
    };
}
import { ImageLoader } from 'three/webgpu';
import { ImageBitmapLoader } from 'three/webgpu';
import { mxHextileCoord } from './MaterialXHextile.js';
import { mxHextileComputeBlendWeights } from './MaterialXHextile.js';
declare function invertConstantMatrixValues(values: any, size: any): any;
declare function mxFlipUvY(uvNode: any): any;
export {};
