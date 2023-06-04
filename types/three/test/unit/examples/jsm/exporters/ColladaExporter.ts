import * as THREE from 'three';

import { ColladaExporter } from 'three/examples/jsm/exporters/ColladaExporter';

const exporter = new ColladaExporter();
declare const mesh: THREE.Mesh;

const result = exporter.parse(mesh, undefined, {
    upAxis: 'Y_UP',
    unitName: 'millimeter',
    unitMeter: 0.001,
})!;

saveString(result.data, 'mesh.dae');

result.textures.forEach(tex => {
    saveArrayBuffer(tex.data, `${tex.name}.${tex.ext}`);
});

function save(blob: Blob, filename: string) {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

function saveString(text: string, filename: string) {
    save(new Blob([text], { type: 'text/plain' }), filename);
}

function saveArrayBuffer(buffer: BufferSource, filename: string) {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}

const link = document.createElement('a');
