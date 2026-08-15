export class USDAParser {
    parseText(text: any): {};
    _preprocess(text: any): string;
    _stripBlockComments(text: any): string;
    _collapseTripleQuotedStrings(text: any): string;
    _stripInlineComment(line: any): any;
    _findAssignmentOperator(line: any): number;
    /**
     * Parse USDA text and return raw spec data in specsByPath format.
     * Used by USDComposer for unified scene composition.
     */
    parseData(text: any): {
        specsByPath: {
            '/': {
                specType: number;
                fields: {
                    upAxis: any;
                    defaultPrim: any;
                    metersPerUnit: number;
                    framesPerSecond: number;
                    timeCodesPerSecond: number;
                };
            };
        };
    };
    _inferSkelElementSize(specsByPath: any): void;
    _inferElementSize(attrSpec: any, numVertices: any): void;
    _extractPrimData(data: any, path: any, primFields: any, specsByPath: any, SpecType: any): void;
    _parseAttributeValue(valueType: any, rawValue: any): any;
    _parseString(str: any): string;
}
