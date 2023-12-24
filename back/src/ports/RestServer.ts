import express from 'express';

export interface RestController {
    onRestGetFile: (req, res) => void;
}
export class RestServer {
    private app = null;
    private ctrl: RestController = null;

    constructor(private port: number) {}

    setCtrl = (ctrl: RestController) => {
        this.ctrl = ctrl;
    };

    run = () => {
        this.app = express();

        this.app.get('/file/:id', this.ctrl.onRestGetFile);

        this.app.listen(this.port);
    };
}
