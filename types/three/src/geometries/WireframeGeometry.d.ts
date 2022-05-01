import { BufferGeometry } from './../core/BufferGeometry';

export class WireframeGeometry<TBufferGeometry extends BufferGeometry = BufferGeometry> extends BufferGeometry {
    constructor(geometry?: TBufferGeometry);

    /**
     * @default 'WireframeGeometry'
     */
    type: string;

    parameters: {
        geometry: TBufferGeometry;
    };
}

export interface WireframeGeometryConstructor<TBufferGeometry extends BufferGeometry = BufferGeometry> {
    new (geometry?: TBufferGeometry): WireframeGeometry<TBufferGeometry>;
    prototype: WireframeGeometry<TBufferGeometry>;
}
