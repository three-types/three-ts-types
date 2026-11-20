declare const _default: "\n#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n\n\tvFragDepth = 1.0 + gl_Position.w;\n\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\n#endif\n";
export default _default;
