export function evaluateSpline(t: any, points: any): any;
export function rgbToHsv(r: any, g: any, b: any): number[];
export function hsvToRgb(h: any, s: any, v: any): number[];
export function sample3DLUT(r: any, g: any, b: any, size: any, dataLines: any): number[];
export function applyColorTransform(r: any, g: any, b: any, params: any, pipelineOrder?: null): number[];
export function generate3DLUTData(params: any, size?: number, buffer?: null, pipelineOrder?: null): null;
export function exportCubeFormat(paramsOrBuffer: any, size?: number, title?: string, pipelineOrder?: null): string;
export function parseCubeFormat(text: any): {
    title: string;
    size: number;
    data: any[][];
    dataLines: any[][];
};
export function exportLUTCanvas(paramsOrBuffer: any, size?: number, pipelineOrder?: null): HTMLCanvasElement;
export function createDefaultParams(): {
    exposure: number;
    brightness: number;
    contrast: number;
    contrastPivot: number;
    gamma: number;
    saturation: number;
    vibrance: number;
    temperature: number;
    tint: number;
    hueShift: number;
    lift: {
        r: number;
        g: number;
        b: number;
        y: number;
    };
    gammaBal: {
        r: number;
        g: number;
        b: number;
        y: number;
    };
    gain: {
        r: number;
        g: number;
        b: number;
        y: number;
    };
    offset: {
        r: number;
        g: number;
        b: number;
        y: number;
    };
    channelMixer: {
        red: {
            r: number;
            g: number;
            b: number;
        };
        green: {
            r: number;
            g: number;
            b: number;
        };
        blue: {
            r: number;
            g: number;
            b: number;
        };
    };
    curves: {
        rgb: {
            x: number;
            y: number;
        }[];
        red: {
            x: number;
            y: number;
        }[];
        green: {
            x: number;
            y: number;
        }[];
        blue: {
            x: number;
            y: number;
        }[];
    };
};
export const LUT_PRESETS: {
    'Neutral (Default)': {
        exposure: number;
        brightness: number;
        contrast: number;
        contrastPivot: number;
        gamma: number;
        saturation: number;
        vibrance: number;
        temperature: number;
        tint: number;
        hueShift: number;
        lift: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        gammaBal: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        gain: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        offset: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        channelMixer: {
            red: {
                r: number;
                g: number;
                b: number;
            };
            green: {
                r: number;
                g: number;
                b: number;
            };
            blue: {
                r: number;
                g: number;
                b: number;
            };
        };
        curves: {
            rgb: {
                x: number;
                y: number;
            }[];
            red: {
                x: number;
                y: number;
            }[];
            green: {
                x: number;
                y: number;
            }[];
            blue: {
                x: number;
                y: number;
            }[];
        };
    };
    'Cinematic Teal & Orange': {
        contrast: number;
        temperature: number;
        lift: {
            r: number;
            g: number;
            b: number;
        };
        gain: {
            r: number;
            g: number;
            b: number;
        };
        curves: {
            rgb: {
                x: number;
                y: number;
            }[];
            red: {
                x: number;
                y: number;
            }[];
            green: {
                x: number;
                y: number;
            }[];
            blue: {
                x: number;
                y: number;
            }[];
        };
        exposure: number;
        brightness: number;
        contrastPivot: number;
        gamma: number;
        saturation: number;
        vibrance: number;
        tint: number;
        hueShift: number;
        gammaBal: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        offset: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        channelMixer: {
            red: {
                r: number;
                g: number;
                b: number;
            };
            green: {
                r: number;
                g: number;
                b: number;
            };
            blue: {
                r: number;
                g: number;
                b: number;
            };
        };
    };
    'Vintage Warm Film': {
        exposure: number;
        contrast: number;
        saturation: number;
        temperature: number;
        tint: number;
        lift: {
            r: number;
            g: number;
            b: number;
        };
        gain: {
            r: number;
            g: number;
            b: number;
        };
        curves: {
            rgb: {
                x: number;
                y: number;
            }[];
            red: {
                x: number;
                y: number;
            }[];
            green: {
                x: number;
                y: number;
            }[];
            blue: {
                x: number;
                y: number;
            }[];
        };
        brightness: number;
        contrastPivot: number;
        gamma: number;
        vibrance: number;
        hueShift: number;
        gammaBal: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        offset: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        channelMixer: {
            red: {
                r: number;
                g: number;
                b: number;
            };
            green: {
                r: number;
                g: number;
                b: number;
            };
            blue: {
                r: number;
                g: number;
                b: number;
            };
        };
    };
    'Cold Sci-Fi Blue': {
        contrast: number;
        temperature: number;
        tint: number;
        lift: {
            r: number;
            g: number;
            b: number;
        };
        gain: {
            r: number;
            g: number;
            b: number;
        };
        curves: {
            rgb: {
                x: number;
                y: number;
            }[];
            red: {
                x: number;
                y: number;
            }[];
            green: {
                x: number;
                y: number;
            }[];
            blue: {
                x: number;
                y: number;
            }[];
        };
        exposure: number;
        brightness: number;
        contrastPivot: number;
        gamma: number;
        saturation: number;
        vibrance: number;
        hueShift: number;
        gammaBal: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        offset: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        channelMixer: {
            red: {
                r: number;
                g: number;
                b: number;
            };
            green: {
                r: number;
                g: number;
                b: number;
            };
            blue: {
                r: number;
                g: number;
                b: number;
            };
        };
    };
    'Cyberpunk Neon': {
        contrast: number;
        saturation: number;
        vibrance: number;
        lift: {
            r: number;
            g: number;
            b: number;
        };
        gain: {
            r: number;
            g: number;
            b: number;
        };
        curves: {
            rgb: {
                x: number;
                y: number;
            }[];
            red: {
                x: number;
                y: number;
            }[];
            green: {
                x: number;
                y: number;
            }[];
            blue: {
                x: number;
                y: number;
            }[];
        };
        exposure: number;
        brightness: number;
        contrastPivot: number;
        gamma: number;
        temperature: number;
        tint: number;
        hueShift: number;
        gammaBal: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        offset: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        channelMixer: {
            red: {
                r: number;
                g: number;
                b: number;
            };
            green: {
                r: number;
                g: number;
                b: number;
            };
            blue: {
                r: number;
                g: number;
                b: number;
            };
        };
    };
    'High Contrast B&W': {
        contrast: number;
        saturation: number;
        curves: {
            rgb: {
                x: number;
                y: number;
            }[];
            red: {
                x: number;
                y: number;
            }[];
            green: {
                x: number;
                y: number;
            }[];
            blue: {
                x: number;
                y: number;
            }[];
        };
        exposure: number;
        brightness: number;
        contrastPivot: number;
        gamma: number;
        vibrance: number;
        temperature: number;
        tint: number;
        hueShift: number;
        lift: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        gammaBal: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        gain: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        offset: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        channelMixer: {
            red: {
                r: number;
                g: number;
                b: number;
            };
            green: {
                r: number;
                g: number;
                b: number;
            };
            blue: {
                r: number;
                g: number;
                b: number;
            };
        };
    };
};
