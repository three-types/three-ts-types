import { Object3D } from '../../../src/Three';

export class OBJExporter {
    constructor();

    parse(object: Object3D): string;
}

export interface OBJExporterConstructor {
    new (): OBJExporter;
    prototype: OBJExporter;
}
