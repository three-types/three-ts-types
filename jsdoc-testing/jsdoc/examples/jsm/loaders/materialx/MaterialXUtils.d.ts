export function getComponentCountForType(type: any): 2 | 3 | 4;
export function isBooleanNode(node: any): any;
export function normalizeSpaceName(value: any, fallback?: string): string;
export function resolveTextureAddressMode(value: any): any;
export namespace TEXTURE_ADDRESS_MODE_WRAPPING {
    export { ClampToEdgeWrapping as constant };
    export { ClampToEdgeWrapping as clamp };
    export { RepeatWrapping as periodic };
    export { MirroredRepeatWrapping as mirror };
}
export function toBooleanNode(node: any): any;
export function toVec3Channels(input: any): any;
import { ClampToEdgeWrapping } from 'three/webgpu';
import { RepeatWrapping } from 'three/webgpu';
import { MirroredRepeatWrapping } from 'three/webgpu';
