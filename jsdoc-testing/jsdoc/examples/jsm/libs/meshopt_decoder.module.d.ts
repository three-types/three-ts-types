export var MeshoptDecoder: {
    supported: boolean;
    ready?: undefined;
    useWorkers?: undefined;
    decodeVertexBuffer?: undefined;
    decodeIndexBuffer?: undefined;
    decodeIndexSequence?: undefined;
    decodeGltfBuffer?: undefined;
    decodeGltfBufferAsync?: undefined;
} | {
    ready: Promise<void>;
    supported: boolean;
    useWorkers: (count: any) => void;
    decodeVertexBuffer: (target: any, count: any, size: any, source: any, filter: any) => void;
    decodeIndexBuffer: (target: any, count: any, size: any, source: any) => void;
    decodeIndexSequence: (target: any, count: any, size: any, source: any) => void;
    decodeGltfBuffer: (target: any, count: any, size: any, source: any, mode: any, filter: any) => void;
    decodeGltfBufferAsync: (count: any, size: any, source: any, mode: any, filter: any) => Promise<any>;
};
