import express from 'express';
import fileUpload from 'express-fileupload';

export interface RestController {
    onRestGetFile: (req, res) => void;
    onRestPostFile: (req, res) => void;
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
        this.app.use(fileUpload());

        this.app.get('/file/:id', this.ctrl.onRestGetFile);
        this.app.post('/file/:id', this.ctrl.onRestPostFile);

        this.app.listen(this.port);
    };
}
