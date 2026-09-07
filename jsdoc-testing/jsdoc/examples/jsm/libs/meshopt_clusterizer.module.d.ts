export var MeshoptClusterizer: {
    supported: boolean;
    ready?: undefined;
    buildMeshlets?: undefined;
    buildMeshletsFlex?: undefined;
    buildMeshletsSpatial?: undefined;
    extractMeshlet?: undefined;
    encodeMeshlet?: undefined;
    computeClusterBounds?: undefined;
    computeMeshletBounds?: undefined;
    computeSphereBounds?: undefined;
} | {
    ready: Promise<void>;
    supported: boolean;
    buildMeshlets: (indices: any, vertex_positions: any, vertex_positions_stride: any, max_vertices: any, max_triangles: any, cone_weight: any) => {
        meshlets: Uint32Array<ArrayBuffer>;
        vertices: Uint32Array<ArrayBuffer>;
        triangles: Uint8Array<ArrayBuffer>;
        meshletCount: any;
    };
    buildMeshletsFlex: (indices: any, vertex_positions: any, vertex_positions_stride: any, max_vertices: any, min_triangles: any, max_triangles: any, cone_weight: any, split_factor: any) => {
        meshlets: Uint32Array<ArrayBuffer>;
        vertices: Uint32Array<ArrayBuffer>;
        triangles: Uint8Array<ArrayBuffer>;
        meshletCount: any;
    };
    buildMeshletsSpatial: (indices: any, vertex_positions: any, vertex_positions_stride: any, max_vertices: any, min_triangles: any, max_triangles: any, fill_weight: any) => {
        meshlets: Uint32Array<ArrayBuffer>;
        vertices: Uint32Array<ArrayBuffer>;
        triangles: Uint8Array<ArrayBuffer>;
        meshletCount: any;
    };
    extractMeshlet: (buffers: any, index: any) => {
        vertices: any;
        triangles: any;
    };
    encodeMeshlet: (vertices: any, triangles: any, level: any) => Uint8Array<ArrayBuffer>;
    computeClusterBounds: (indices: any, vertex_positions: any, vertex_positions_stride: any) => {
        centerX: number;
        centerY: number;
        centerZ: number;
        radius: number;
        coneApexX: number;
        coneApexY: number;
        coneApexZ: number;
        coneAxisX: number;
        coneAxisY: number;
        coneAxisZ: number;
        coneCutoff: number;
    };
    computeMeshletBounds: (buffers: any, vertex_positions: any, vertex_positions_stride: any) => {
        centerX: number;
        centerY: number;
        centerZ: number;
        radius: number;
        coneApexX: number;
        coneApexY: number;
        coneApexZ: number;
        coneAxisX: number;
        coneAxisY: number;
        coneAxisZ: number;
        coneCutoff: number;
    }[];
    computeSphereBounds: (positions: any, positions_stride: any, radii: any, radii_stride: any) => {
        centerX: number;
        centerY: number;
        centerZ: number;
        radius: number;
        coneApexX: number;
        coneApexY: number;
        coneApexZ: number;
        coneAxisX: number;
        coneAxisY: number;
        coneAxisZ: number;
        coneCutoff: number;
    };
};
