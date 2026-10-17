export namespace MaterialXSurfaceMappings {
    export { applyStandardSurface as standard_surface };
    export { applyGltfPbrSurface as gltf_pbr };
    export { applyOpenPbrSurface as open_pbr_surface };
    export { applyDisplacement as displacement };
}
export const surfaceMapperRegistry: Map<string, {
    category: string;
    apply: typeof applyStandardSurface | typeof applyGltfPbrSurface | typeof applyOpenPbrSurface | typeof applyDisplacement;
}>;
export function getSurfaceMapper(category: any): {
    category: string;
    apply: typeof applyStandardSurface | typeof applyGltfPbrSurface | typeof applyOpenPbrSurface | typeof applyDisplacement;
} | undefined;
export function getSupportedSurfaceCategories(): string[];
export function applyStandardSurface(material: any, inputs: any, log: any, nodeName: any): void;
export function applyGltfPbrSurface(material: any, inputs: any, log: any, nodeName: any): void;
export function applyOpenPbrSurface(material: any, inputs: any, log: any, nodeName: any): void;
export function applyDisplacement(material: any, inputs: any, log: any, nodeName: any, inputTypes?: {}): void;
export const mappedStandardSurfaceInputs: Set<string>;
export const mappedGltfPbrInputs: Set<string>;
export const mappedOpenPbrInputs: Set<string>;
