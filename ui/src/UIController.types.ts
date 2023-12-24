import { EditAction } from './editAction';
import { Point2D } from './types';

export class UIDocument {
    history: EditAction[];
}

export interface Layer {
    pic: InstanceType<typeof Image>;
    xy: Point2D;
    name: string;
}
export const defaultLayer: Layer = {
    pic: null,
    xy: { x: 0, y: 0 },
    name: ''
};
