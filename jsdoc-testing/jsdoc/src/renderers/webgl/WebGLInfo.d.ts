export function WebGLInfo(gl: any): {
    memory: {
        geometries: number;
        textures: number;
    };
    render: {
        frame: number;
        calls: number;
        triangles: number;
        points: number;
        lines: number;
    };
    programs: null;
    autoReset: boolean;
    reset: () => void;
    update: (count: any, mode: any, instanceCount: any) => void;
};
