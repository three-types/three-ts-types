import { Object3D } from '../../../src/Three';

export interface STLExporterOptions {
    binary?: boolean;
}

export class STLExporter {
    constructor();

    parse(scene: Object3D, options?: STLExporterOptions): string;
}

export interface STLExporterConstructor {
    new (): STLExporter;
    prototype: STLExporter;
}
