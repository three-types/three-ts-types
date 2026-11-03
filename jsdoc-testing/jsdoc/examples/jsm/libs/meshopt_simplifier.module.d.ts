export var MeshoptSimplifier: {
    supported: boolean;
    ready?: undefined;
    compactMesh?: undefined;
    generatePositionRemap?: undefined;
    simplify?: undefined;
    simplifyWithAttributes?: undefined;
    simplifyWithUpdate?: undefined;
    getScale?: undefined;
    simplifyPoints?: undefined;
    simplifySloppy?: undefined;
    simplifyPrune?: undefined;
} | {
    ready: Promise<void>;
    supported: boolean;
    compactMesh: (indices: any) => any[];
    generatePositionRemap: (vertex_positions: any, vertex_positions_stride: any) => Uint32Array<any>;
    simplify: (indices: any, vertex_positions: any, vertex_positions_stride: any, target_index_count: any, target_error: any, flags: any) => (number | Uint32Array<any>)[];
    simplifyWithAttributes: (indices: any, vertex_positions: any, vertex_positions_stride: any, vertex_attributes: any, vertex_attributes_stride: any, attribute_weights: any, vertex_lock: any, target_index_count: any, target_error: any, flags: any) => (number | Uint32Array<any>)[];
    simplifyWithUpdate: (indices: any, vertex_positions: any, vertex_positions_stride: any, vertex_attributes: any, vertex_attributes_stride: any, attribute_weights: any, vertex_lock: any, target_index_count: any, target_error: any, flags: any) => any[];
    getScale: (vertex_positions: any, vertex_positions_stride: any) => any;
    simplifyPoints: (vertex_positions: any, vertex_positions_stride: any, target_vertex_count: any, vertex_colors: any, vertex_colors_stride: any, color_weight: any) => Uint32Array<any>;
    simplifySloppy: (indices: any, vertex_positions: any, vertex_positions_stride: any, vertex_lock: any, target_index_count: any, target_error: any) => (number | Uint32Array<any>)[];
    simplifyPrune: (indices: any, vertex_positions: any, vertex_positions_stride: any, target_error: any) => Uint32Array<any>;
};
