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

export interface UIControllerForScene {
    onLayerChanged: () => void;
}

export class Scene {
    private layer: Layer = { ...defaultLayer };
    private ctrl: UIControllerForScene;
    private dirty: boolean = false;

    constructor() {}

    setCtrl = (ctrl: UIControllerForScene) => {
        this.ctrl = ctrl;
        return this;
    };

    setPic = (pic: HTMLImageElement) => {
        this.layer.pic = pic;
    };

    setDirty = (val: boolean) => {
        this.dirty = val;
        this.ctrl.onLayerChanged();
    };

    getDirty = () => this.dirty;
}
