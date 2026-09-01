export namespace MaterialXSurfaceMappings {
    export { applyStandardSurface as standard_surface };
    export { applyGltfPbrSurface as gltf_pbr };
    export { applyOpenPbrSurface as open_pbr_surface };
}
export const surfaceMapperRegistry: Map<string, {
    category: string;
    apply: typeof applyStandardSurface | typeof applyGltfPbrSurface | typeof applyOpenPbrSurface;
}>;
export function getSurfaceMapper(category: any): {
    category: string;
    apply: typeof applyStandardSurface | typeof applyGltfPbrSurface | typeof applyOpenPbrSurface;
} | undefined;
export function getSupportedSurfaceCategories(): string[];
export function applyStandardSurface(material: any, inputs: any, log: any, nodeName: any): void;
export function applyGltfPbrSurface(material: any, inputs: any, log: any, nodeName: any): void;
export function applyOpenPbrSurface(material: any, inputs: any, log: any, nodeName: any): void;
export const mappedStandardSurfaceInputs: Set<string>;
export const mappedGltfPbrInputs: Set<string>;
export const mappedOpenPbrInputs: Set<string>;
