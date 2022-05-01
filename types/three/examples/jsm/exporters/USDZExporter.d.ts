import { Object3D } from '../../../src/Three';

export class USDZExporter {
    constructor();

    parse(scene: Object3D): Promise<Uint8Array>;
}

export interface USDZExporterConstructor {
    new (): USDZExporter;
    prototype: USDZExporter;
}
