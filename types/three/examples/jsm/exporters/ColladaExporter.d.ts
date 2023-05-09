import { Object3D, Texture } from '../../../src/Three';

export interface ColladaExporterOptions {
    version?: string;
    author?: string;
    textureDirectory?: string;
    upAxis?: 'Y_UP' | 'Z_UP' | 'X_UP';
    unitName?: string;
    unitMeter?: number;
}

export interface ColladaTexture {
    directory: string;
    name: string;
    ext: string;
    data: Uint8Array;
    original: Texture;
}

export interface ColladaExporterResult {
    data: string;
    textures: ColladaTexture[];
}

export class ColladaExporter {
    constructor();

    parse(
        object: Object3D,
        onDone: ((res: ColladaExporterResult) => void) | undefined,
        options: ColladaExporterOptions,
    ): ColladaExporterResult | null;
}
