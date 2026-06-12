export function WebGLAnimation(): {
    start: () => void;
    stop: () => void;
    setAnimationLoop: (callback: any) => void;
    setContext: (value: any) => void;
};
