import { Layer, defaultLayer } from '@src/UIController.types';
import { Point2D } from '@src/types';

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

    render = (context: CanvasRenderingContext2D, viewPortSize: Point2D) => {
        context.drawImage(
            this.layer.pic,
            -this.layer.xy.x,
            -this.layer.xy.y,
            this.layer.pic.width,
            this.layer.pic.height,
            0,
            0,
            this.layer.pic.width,
            this.layer.pic.height
        );
    };

    setXY = (xy: Point2D) => {
        this.layer.xy = { ...xy };
    };
}
