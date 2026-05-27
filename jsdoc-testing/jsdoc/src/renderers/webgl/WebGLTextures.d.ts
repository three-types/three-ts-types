export function WebGLTextures(_gl: any, extensions: any, state: any, properties: any, capabilities: any, utils: any, info: any): void;
export class WebGLTextures {
    constructor(_gl: any, extensions: any, state: any, properties: any, capabilities: any, utils: any, info: any);
    allocateTextureUnit: () => number;
    resetTextureUnits: () => void;
    getTextureUnits: () => number;
    setTextureUnits: (value: any) => void;
    setTexture2D: (texture: any, slot: any) => void;
    setTexture2DArray: (texture: any, slot: any) => void;
    setTexture3D: (texture: any, slot: any) => void;
    setTextureCube: (texture: any, slot: any) => void;
    rebindTextures: (renderTarget: any, colorTexture: any, depthTexture: any) => void;
    setupRenderTarget: (renderTarget: any) => void;
    updateRenderTargetMipmap: (renderTarget: any) => void;
    updateMultisampleRenderTarget: (renderTarget: any) => void;
    setupDepthRenderbuffer: (renderTarget: any) => void;
    setupFrameBufferTexture: (framebuffer: any, renderTarget: any, texture: any, attachment: any, textureTarget: any, level: any) => void;
    useMultisampledRTT: (renderTarget: any) => boolean;
    isReversedDepthBuffer: () => any;
}
