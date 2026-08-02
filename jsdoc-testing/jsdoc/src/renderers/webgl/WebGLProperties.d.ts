export function WebGLProperties(): {
    has: (object: any) => boolean;
    get: (object: any) => any;
    remove: (object: any) => void;
    update: (object: any, key: any, value: any) => void;
    dispose: () => void;
};
