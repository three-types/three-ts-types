import { BufferGeometry } from './../core/BufferGeometry';

export class WireframeGeometry<TBufferGeometry extends BufferGeometry> extends BufferGeometry {
    constructor(geometry?: TBufferGeometry);

    /**
     * @default 'WireframeGeometry'
     */
    type: string;

    parameters: {
        geometry: TBufferGeometry;
    };
}
