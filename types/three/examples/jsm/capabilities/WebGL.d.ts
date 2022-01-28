export default class WEBGL {
    static isWebGLAvailable(): boolean;
    static isWebGL2Available(): boolean;
    static getWebGLErrorMessage(): HTMLElement;
    static getWebGL2ErrorMessage(): HTMLElement;
    static getErrorMessage(version: number): HTMLElement;
}
