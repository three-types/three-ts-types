import { expect, test } from 'vitest';

import { nodeObject, vec3 } from 'three/tsl';

test('nodeObject returns parameter if Node', () => {
    const testVec3 = vec3(1, 0, 2);
    const newTestVec3 = nodeObject(testVec3);
    expect(newTestVec3).toStrictEqual(testVec3);
});
