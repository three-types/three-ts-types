import { Object3D } from '../../../src/Three';

export class MMDExporter {
    constructor();

    parseVpd(skin: Object3D, outputShiftJis: boolean, useOriginalBones: boolean): [] | Uint8Array;
}

export interface MMDExporterConstructor {
    new (): MMDExporter;
    prototype: MMDExporter;
}
