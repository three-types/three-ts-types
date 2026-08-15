import { Group } from "three";
import { GaussianSplatMesh } from "../objects/GaussianSplatMesh.js";
import { GLTFParser } from "./GLTFLoader.js";

declare class GLTFGaussianSplatLoaderExtension {
    constructor(parser: GLTFParser);

    name: string;
    parser: GLTFParser;

    loadMesh(meshIndex: number): Promise<Group | GaussianSplatMesh> | null;
}

export { GLTFGaussianSplatLoaderExtension };
