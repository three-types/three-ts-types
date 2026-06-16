export function WebGLExtensions(gl: any): {
    has: (name: any) => boolean;
    init: () => void;
    get: (name: any) => any;
};
