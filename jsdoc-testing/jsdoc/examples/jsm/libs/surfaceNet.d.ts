/**
 * SurfaceNets in JavaScript
 *
 * Written by Mikola Lysenko (C) 2012
 *
 * MIT License
 *
 * Based on: S.F. Gibson, 'Constrained Elastic Surface Nets'. (1998) MERL Tech Report.
 * from https://github.com/mikolalysenko/isosurface/tree/master
 *
 */
export function surfaceNet(dims: any, potential: any, bounds: any): {
    positions: number[][];
    cells: any[][];
};
