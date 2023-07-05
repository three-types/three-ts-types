import { Object3D } from '../../../src/Three';

export interface USDZExporterOptions {
    quickLookCompatible?: boolean;
}

export class USDZExporter {
    constructor();

    parse(scene: Object3D, options?: USDZExporterOptions): Promise<Uint8Array>;
}
