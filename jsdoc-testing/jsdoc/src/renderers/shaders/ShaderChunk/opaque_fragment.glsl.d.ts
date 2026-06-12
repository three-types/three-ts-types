declare const _default: "\n#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\n\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );\n";
export default _default;
