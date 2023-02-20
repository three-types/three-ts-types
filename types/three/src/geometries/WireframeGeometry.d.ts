import { BufferGeometry } from './../core/BufferGeometry.js';

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
