import { Loader, LoadingManager, Shape } from "three";

interface FontData {
    glyphs: Record<string, { x_min: number; x_max: number; ha: number; o: string }>;
    cssFontWeight: string;
    ascender: number;
    underlinePosition: number;
    cssFontStyle: string;
    boundingBox: { yMin: number; xMin: number; yMax: number; xMax: number };
    resolution: number;
    original_font_information: {
        postscript_name: string;
        version_string: string;
        vendor_url: string;
        full_font_name: string;
        font_family_name: string;
        copyright: string;
        description: string;
        trademark: string;
        designer: string;
        designer_url: string;
        unique_font_identifier: string;
        license_url: string;
        license_description: string;
        manufacturer_name: string;
        font_sub_family_name: string;
    },
    descender: number;
    familyName: string;
    lineHeight: number;
    underlineThickness: number;
}

export class FontLoader extends Loader<Font> {
    constructor(manager?: LoadingManager);

    load(
        url: string,
        onLoad?: (data: Font) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (err: unknown) => void,
    ): void;

    parse(json: FontData): Font;
}

export class Font {
    readonly isFont: true;

    /**
     * @default 'Font'
     */
    type: string;

    data: FontData;

    constructor(data: FontData);

    generateShapes(text: string, size?: number): Shape[];
}
