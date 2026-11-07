import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

// Test against the three.js sources rather than the package's prebuilt `build/` files, which are only
// regenerated occasionally upstream and can lag behind the commit the declarations are synced to.
const threeSrc = (file: string) => fileURLToPath(new URL(`../three.js/src/${file}`, import.meta.url));

export default defineConfig({
    resolve: {
        alias: [
            { find: /^three\/webgpu$/, replacement: threeSrc('Three.WebGPU.js') },
            { find: /^three\/tsl$/, replacement: threeSrc('Three.TSL.js') },
        ],
    },
    test: {
        browser: {
            provider: playwright(),
            enabled: true,
            instances: [{ browser: 'chromium' }],
        },
    },
});
