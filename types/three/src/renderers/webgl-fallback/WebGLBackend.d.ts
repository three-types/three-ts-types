import { CoordinateSystem } from "../../constants.js";
import Backend, { BackendParameters } from "../common/Backend.js";

export interface WebGLBackendParameters extends BackendParameters {
    /**
     * @deprecated since r188. Use {@link GPUTimer} instead.
     */
    trackTimestamp?: boolean | undefined;
}

export default class WebGLBackend extends Backend {
    readonly isWebGLBackend: boolean;

    constructor(parameters?: WebGLBackendParameters);

    get coordinateSystem(): CoordinateSystem;

    getMaxAnisotropy(): number;
}
