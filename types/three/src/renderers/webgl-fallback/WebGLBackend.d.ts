import { CoordinateSystem } from "../../constants.js";
import Backend, { BackendParameters } from "../common/Backend.js";

export interface WebGLBackendParameters extends BackendParameters {
    context?: WebGL2RenderingContext | undefined;
    /**
     * @deprecated "trackTimestamp" has been removed. Use "GPUTimer" instead.
     */
    trackTimestamp?: boolean | undefined;
}

export default class WebGLBackend extends Backend {
    readonly isWebGLBackend: boolean;

    constructor(parameters?: WebGLBackendParameters);

    get coordinateSystem(): CoordinateSystem;

    getMaxAnisotropy(): number;
}
