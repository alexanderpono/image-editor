import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';

export interface RestController {
    onRestGetFile: (req, res) => void;
    onRestPostFile: (req, res) => void;
    onRestCrop: (req, res) => void;
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
        this.app.use(express.json());

        const originalSend = this.app.response.send;

        this.app.response.send = function sendOverWrite(body) {
            originalSend.call(this, body);
            this.__custombody__ = body;
        };

        morgan.token('req-body', function (req, res) {
            return JSON.stringify(req.body);
        });
        morgan.token('res-body', function (req, res) {
            return JSON.stringify(res.__custombody__);
        });

        this.app.use(
            morgan(
                ':method :url :status :response-time ms - "REQL:req[content-length]" - REQB:req-body - RESL::res[content-length] - RESB::res-body \n',
                {
                    stream: morgan.successLogStream,
                    skip: function (req, res) {
                        return res.statusCode >= 400;
                    }
                }
            )
        );

        this.app.use(
            morgan(
                ':method :url :status :response-time ms - "REQL:req[content-length]" - REQB:req-body - RESL::res[content-length] - RESB::res-body \n',
                {
                    stream: morgan.errorLogStream,
                    skip: function (req, res) {
                        return res.statusCode < 400;
                    }
                }
            )
        );

        this.app.get('/files/:id', this.ctrl.onRestGetFile);
        this.app.post('/files/:id', this.ctrl.onRestPostFile);
        this.app.post('/crop', this.ctrl.onRestCrop);

        this.app.listen(this.port);
    };
}
