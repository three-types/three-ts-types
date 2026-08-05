export function isZipBuffer(buffer: any): boolean;
export function readMtlxArchive(buffer: any): {
    text: string;
    mtlxPath: any;
    files: Map<any, any>;
};
export function createArchiveResolver(files: any): {
    resolve: (uri: any) => any;
    dispose: () => void;
};
