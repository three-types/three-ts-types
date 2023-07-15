import initJank from 'three/addons/offscreen/jank.js';
import init from 'three/addons/offscreen/scene.js';

// onscreen

const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');

const width = canvas1.clientWidth;
const height = canvas1.clientHeight;
const pixelRatio = window.devicePixelRatio;

init(canvas1, width, height, pixelRatio, './');
initJank();

// offscreen

if ('transferControlToOffscreen' in canvas2) {
    const offscreen = canvas2.transferControlToOffscreen();
    const worker = new Worker('jsm/offscreen/offscreen.js', { type: 'module' });
    worker.postMessage(
        {
            drawingSurface: offscreen,
            width: canvas2.clientWidth,
            height: canvas2.clientHeight,
            pixelRatio: window.devicePixelRatio,
            path: '../../',
        },
        [offscreen],
    );
} else {
    document.getElementById('message').style.display = 'block';
}
