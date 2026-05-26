export default UTIF;
declare namespace UTIF {
    function encodeImage(rgba: any, w: any, h: any, metadata: any): ArrayBuffer;
    function encode(ifds: any): ArrayBuffer;
    function decode(buff: any, prm: any): any[];
    namespace decode {
        function _decompress(img: any, ifds: any, data: any, off: any, len: any, cmpr: any, tgt: any, toff: any, fo: any, w: any, h: any): void;
        function _decodePanasonic(img: any, data: any, off: any, len: any, tgt: any, toff: any): void;
        function _decodeVC5(t: any, E: any, h: any, L: any, g: any, n: any): void;
        function _decodeLogLuv32(img: any, data: any, off: any, len: any, tgt: any, toff: any): void;
        function _ljpeg_diff(data: any, prm: any, huff: any): number;
        function _decodeARW(img: any, inp: any, off: any, src_length: any, tgt: any, toff: any): void;
        function _decodeNikon(img: any, imgs: any, data: any, off: any, src_length: any, tgt: any, toff: any): void;
        function _putsF(dt: any, pos: any, val: any): void;
        function _getbithuff(data: any, prm: any, nbits: any, huff: any): number;
        function _make_decoder(source: any): number[];
        function _decodeNewJPEG(img: any, data: any, off: any, len: any, tgt: any, toff: any): void;
        function _decodeOldJPEGInit(img: any, data: any, off: any, len: any): {
            jpegOffset: any;
            tables?: undefined;
            sosMarker?: undefined;
            sofPosition?: undefined;
        } | {
            jpegOffset: any;
            tables: Uint8Array<any>;
            sosMarker: Uint8Array<ArrayBuffer>;
            sofPosition: number;
        };
        function _decodeOldJPEG(img: any, data: any, off: any, len: any, tgt: any, toff: any): void;
        function _decodePackBits(data: any, off: any, len: any, tgt: any, toff: any): any;
        function _decodeThunder(data: any, off: any, len: any, tgt: any, toff: any): void;
        let _dmap: {
            "1": number;
            "011": number;
            "000011": number;
            "0000011": number;
            "010": number;
            "000010": number;
            "0000010": number;
        };
        let _lens: {}[];
        function _decodeG4(data: any, off: any, slen: any, tgt: any, toff: any, w: any, fo: any): void;
        function _findDiff(line: any, x: any, clr: any): any;
        function _makeDiff(line: any): any[];
        function _decodeG2(data: any, off: any, slen: any, tgt: any, toff: any, w: any, fo: any): void;
        function _decodeG3(data: any, off: any, slen: any, tgt: any, toff: any, w: any, fo: any, twoDim: any): void;
        function _addNtimes(arr: any, n: any, val: any): void;
        function _writeBits(bits: any, tgt: any, boff: any): void;
        let _decodeLZW: any;
    }
    function decodeImage(buff: any, img: any, ifds: any): void;
    let tags: {};
    namespace _types {
        namespace basic {
            export { main };
            export { rest };
        }
        namespace gps {
            let main_1: number[];
            export { main_1 as main };
            let rest_1: {
                18: number;
                29: number;
            };
            export { rest_1 as rest };
        }
    }
    function _readIFD(bin: any, data: any, offset: any, ifds: any, depth: any, prm: any): any;
    function _writeIFD(bin: any, types: any, data: any, offset: any, ifd: any): any[];
    function toRGBA8(out: any, scl: any): Uint8Array<ArrayBuffer>;
    function replaceIMG(imgs: any): void;
    let _xhrs: any[];
    let _imgs: any[];
    function _imgLoaded(e: any): void;
    function bufferToURI(buff: any): string;
    namespace _binBE {
        let ui8: Uint8Array<ArrayBuffer>;
        let i16: Int16Array<any>;
        let i32: Int32Array<any>;
        let ui32: Uint32Array<any>;
        let fl32: Float32Array<any>;
        let fl64: Float64Array<any>;
    }
    namespace _binLE {
        import nextZero = nextZero;
        export { nextZero };
        export function readUshort(buff: any, p: any): number;
        export function readShort(buff: any, p: any): any;
        export function readInt(buff: any, p: any): any;
        export function readUint(buff: any, p: any): any;
        import readASCII = readASCII;
        export { readASCII };
        export function readFloat(buff: any, p: any): any;
        export function readDouble(buff: any, p: any): any;
        export function writeUshort(buff: any, p: any, n: any): void;
        export function writeInt(buff: any, p: any, n: any): void;
        export function writeUint(buff: any, p: any, n: any): void;
        import writeASCII = writeASCII;
        export { writeASCII };
    }
    function _copyTile(tb: any, tw: any, th: any, b: any, w: any, h: any, xoff: any, yoff: any): void;
    function _inflateRaw(N: any, W: any): any;
    function LosslessJpegDecode(h: any): Uint8Array<ArrayBuffer> | Uint16Array<ArrayBuffer>;
}
declare var main: any[];
declare var rest: {
    33432: number;
    33434: number;
    33437: number;
    34665: number;
    34850: number;
    34853: number;
    34855: number;
    34864: number;
    34866: number;
    36864: number;
    36867: number;
    36868: number;
    37121: number;
    37377: number;
    37378: number;
    37380: number;
    37381: number;
    37383: number;
    37384: number;
    37385: number;
    37386: number;
    37510: number;
    37520: number;
    37521: number;
    37522: number;
    40960: number;
    40961: number;
    40962: number;
    40963: number;
    40965: number;
    41486: number;
    41487: number;
    41488: number;
    41985: number;
    41986: number;
    41987: number;
    41988: number;
    41989: number;
    41990: number;
    41993: number;
    41994: number;
    41995: number;
    41996: number;
    42032: number;
    42033: number;
    42034: number;
    42036: number;
    42037: number;
    59932: number;
};
