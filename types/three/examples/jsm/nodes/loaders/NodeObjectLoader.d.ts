import { NodeLoaderResult } from './NodeLoader';
import { Material, ObjectLoader, Texture } from '../../../../src/Three';

export default class NodeObjectLoader extends ObjectLoader {
    parseNodes(json: any, textures: { [key: string]: Texture }): NodeLoaderResult;

    // tslint:disable-next-line:comment-format
    //@ts-expect-error
    parseMaterials(json: any, textures: { [key: string]: Texture }): { [key: string]: Material };
}
