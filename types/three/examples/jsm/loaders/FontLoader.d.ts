import { Shape, Loader, LoadingManager } from '../../../src/Three';

export class FontLoader extends Loader {
    constructor(manager?: LoadingManager);

    load(
        url: string,
        onLoad?: (responseFont: Font) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
    ): void;
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Font>;
    parse(json: any): Font;
}

export interface FontLoaderConstructor {
    new (manager?: LoadingManager): FontLoader;
    prototype: FontLoader;
}

export class Font {
    constructor(jsondata: any);

    /**
     * @default 'Font'
     */
    type: string;

    data: string;

    generateShapes(text: string, size: number): Shape[];
}

export interface FontConstructor {
    new (jsondata: any): Font;
    prototype: Font;
}
