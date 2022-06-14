import * as THREE from 'three';

// part of the code is taken from https://github.com/mrdoob/three.js/pull/22846

const imageLoader = new THREE.ImageLoader();
imageLoader.load('/path/to/image.png', image => {
    const source = new THREE.Source(image);

    const material = new THREE.MeshBasicMaterial();
    material.map = new THREE.Texture();
    material.map.source = source;
    material.map.offset.x = 0.5;
});

function assertNever(_: never): void {
    throw new Error('Assertion failed');
}

(function testTextureFromImage() {
    const image = document.createElement('img');
    const imageTex = new THREE.Texture(image);
    const img = imageTex.image; // $ExpectType HTMLImageElement
    if (!(img instanceof HTMLImageElement)) {
        assertNever(img);
    }
})();

(function testTextureFromCanvas() {
    const canvas = document.createElement('canvas');
    const canvasTex = new THREE.Texture(canvas);
    const canv = canvasTex.image; // $ExpectType HTMLCanvasElement
    if (!(canv instanceof HTMLCanvasElement)) {
        assertNever(canv);
    }
})();

(function testTextureFromVideo() {
    const video = document.createElement('video');
    const videoTex = new THREE.VideoTexture(video);
    const vid = videoTex.image; // $ExpectType HTMLVideoElement
    if (!(vid instanceof HTMLVideoElement)) {
        assertNever(vid);
    }
})();

(function testCanvasTexture() {
    const canvas = makeCanvas();
    const canvTex = new THREE.CanvasTexture(canvas);
    const img = canvTex.image; // $ExpectType HTMLCanvasElement
    if (!(img instanceof HTMLCanvasElement)) {
        assertNever(img);
    }
})();

function makeCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const g = canvas.getContext('2d');
    if (g) {
        g.fillStyle = 'red';
        g.fillRect(0, 0, 512, 512);
        g.fillStyle = 'blue';
        g.fillRect(512, 512, 512, 512);
    }
    return canvas;
}
