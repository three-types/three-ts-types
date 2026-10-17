declare const _default: "\n#ifdef USE_ALPHATEST\n\n\t#ifdef ALPHA_TO_COVERAGE\n\n\tdiffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n\tif ( diffuseColor.a == 0.0 ) discard;\n\n\t#else\n\n\tif ( diffuseColor.a < alphaTest ) discard;\n\n\t#endif\n\n#endif\n";
export default _default;
