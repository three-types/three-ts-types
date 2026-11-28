export function WebGLBindingStates(gl: any, attributes: any): {
    setup: (object: any, material: any, program: any, geometry: any, index: any) => void;
    reset: () => void;
    resetDefaultState: () => void;
    dispose: () => void;
    releaseStatesOfGeometry: (geometry: any) => void;
    releaseStatesOfObject: (object: any) => void;
    releaseStatesOfProgram: (program: any) => void;
    initAttributes: () => void;
    enableAttribute: (attribute: any) => void;
    disableUnusedAttributes: () => void;
};
