declare const _default: "\nvec4 mvPosition = vec4( transformed, 1.0 );\n\n#ifdef USE_BATCHING\n\n\tmvPosition = batchingMatrix * mvPosition;\n\n#endif\n\n#ifdef USE_INSTANCING\n\n\tmvPosition = instanceMatrix * mvPosition;\n\n#endif\n\nmvPosition = modelViewMatrix * mvPosition;\n\ngl_Position = projectionMatrix * mvPosition;\n";
export default _default;
