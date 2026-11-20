export function WebGLRenderStates(extensions: any): {
    get: (scene: any, renderCallDepth?: number) => any;
    dispose: () => void;
};
