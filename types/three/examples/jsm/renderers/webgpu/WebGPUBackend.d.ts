import { CoordinateSystem } from '../../../../src/Three.js';
import Backend, { BackendParameters } from '../common/Backend.js';

export interface WebGPUBackendParameters extends BackendParameters {
    antialias?: boolean | undefined;
    sampleCount?: number | undefined;
}

export default class WebGPUBackend extends Backend {
    readonly isWebGPUBackend: true;

    constructor(parameters?: WebGPUBackendParameters);

    get coordinateSystem(): CoordinateSystem;
}
