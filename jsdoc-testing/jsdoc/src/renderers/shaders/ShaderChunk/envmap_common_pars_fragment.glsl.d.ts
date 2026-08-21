declare const _default: "\n#ifdef USE_ENVMAP\n\n\tuniform float envMapIntensity;\n\tuniform mat3 envMapRotation;\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\n#endif\n";
export default _default;
