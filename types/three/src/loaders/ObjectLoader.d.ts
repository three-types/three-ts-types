import { Loader } from './Loader';
import { LoadingManager } from './LoadingManager';
import { Object3D } from './../core/Object3D';
import { Texture } from './../textures/Texture';
import { Material } from './../materials/Material';
import { AnimationClip } from './../animation/AnimationClip';
import { InstancedBufferGeometry } from '../core/InstancedBufferGeometry';
import { BufferGeometry } from '../core/BufferGeometry';
import { Source } from '../textures/Source';

export class ObjectLoader extends Loader {
    constructor(manager?: LoadingManager);

    load(
        url: string,
        onLoad?: (object: Object3D) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: Error | ErrorEvent) => void,
    ): void;
    loadAsync<ObjectType extends Object3D>(
        url: string,
        onProgress?: (event: ProgressEvent) => void,
    ): // tslint:disable-next-line:no-unnecessary-generics
    Promise<ObjectType>;
    // tslint:disable-next-line:no-unnecessary-generics
    parse<T extends Object3D>(json: any, onLoad?: (object: Object3D) => void): T;
    // tslint:disable-next-line:no-unnecessary-generics
    parseAsync<T extends Object3D>(json: any): Promise<T>;
    parseGeometries(json: Record<string, any>): { [key: string]: InstancedBufferGeometry | BufferGeometry }; // Array of BufferGeometry or Geometry or Geometry2.
    parseMaterials(json: Record<string, any>, textures: { [key: string]: Texture }): Material[]; // Array of Classes that inherits from Matrial.
    parseAnimations(json: Record<string, any>): Record<string, AnimationClip>;
    parseImages(json: Record<string, any>, onLoad?: () => void): { [key: string]: Source };
    parseImagesAsync(json: Record<string, any>): Promise<{ [key: string]: Source }>;
    parseTextures(json: Record<string, any>, images: any): Record<string, Texture>;
    parseObject<T extends Object3D>(
        data: any,
        geometries: Record<string, InstancedBufferGeometry | BufferGeometry>,
        materials: Record<string, Material>,
        textures: Record<string, Texture>,
        animations: Record<string, AnimationClip>,
    ): // tslint:disable-next-line:no-unnecessary-generics
    T;
}
