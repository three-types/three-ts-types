export function WebGLAttributes(gl: any): {
    get: (attribute: any) => any;
    remove: (attribute: any) => void;
    update: (attribute: any, bufferType: any) => void;
};
