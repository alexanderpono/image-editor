import { Logger } from './ports/Logger';
import { WsServer } from './ports/WsServer';
import { WS } from './ports/WsServer.types';
import { RestServer } from './ports/RestServer';
import path from 'path';
import { object, string, number, date, array, mixed } from 'yup';
import fs from 'fs';

const MAX_FILE_SIZE = 2 * 1000 * 1000;
const postFileSchema = object({
    files: object({
        file: object()
            .shape({
                name: string().required('files.file is a required field'),
                size: number().max(
                    MAX_FILE_SIZE,
                    `Too large file. Max supported file size=${MAX_FILE_SIZE} bytes`
                )
            })
            .required()
    })
});
const ERR = {
    NO_PRIV: { error: 'not enough privileges' },
    SERVER_ERR: { error: 'Server error' },
    VALIDATE_ERR: (data) => ({ error: 'Validate error', data })
};

interface JsonMessageFromUI {
    action: string;
    data: string;
}
export class ServerController {
    constructor(
        wsPort: number,
        private ws: WsServer,
        private logger: Logger,
        private restServer: RestServer
    ) {
        this.ws.openWsServer(wsPort);

        setTimeout(() => {
            this.restServer.run();
        }, 0);

        this.logger.log('ServerController() constructor()');
    }

    onWsConnect = () => {
        this.logger.log('onWsConnect()');
        this.ws.send(WS.createWsHello());
    };

    onWsMesage = (message: string) => {
        this.logger.log('on(message) message=', message);
        try {
            const jsonMessage: JsonMessageFromUI = JSON.parse(message);
            this.logger.log('on(message) jsonMessage=', jsonMessage);
            switch (jsonMessage.action) {
                default:
                    this.logger.log('Ws: Неизвестная команда');
                    return 'Ws: Неизвестная команда';
            }
        } catch (error) {
            this.logger.log('Ws: Ошибка', error);
            return 'WS: not a JSON';
        }
    };

    onRestGetFile = (request, response) => {
        console.log('ServerController onRestGetFile() request.params.id=', request.params.id);
        response.header('Access-Control-Allow-Origin', '*');

        let p = path.join(__dirname, '..', request.params.id);
        // response.send(`GET file ${request.params.id} ${p}`);

        console.log('ServerController onRestGetFile() p=', p);

        response.sendFile(p);
    };

    onRestPostFile = (request, response) => {
        console.log('ServerController onRestPostFile()');
        response.header('Access-Control-Allow-Origin', '*');

        let p = path.join(__dirname, '..', request.params.id);
        const correctPath = path.join(__dirname, '..', 'data');

        const pathIsOk = p.indexOf(correctPath) === 0;
        if (!pathIsOk) {
            response.status(403).send(ERR.VALIDATE_ERR(`POST path '${p}' is not supported`));
            return;
        }

        postFileSchema
            .validate(request)
            .then(() => {
                return fs.promises.mkdir(path.dirname(p), { recursive: true });
            })
            .then(() => {
                let data = request.files.file;
                data.mv(p, function (err) {
                    if (err) {
                        return response.status(500).send(err);
                    }
                    response.status(201).send({
                        name: data.name,
                        type: data.mimetype,
                        size: data.size
                    });
                });
            })
            .catch((err) => {
                if (Array.isArray(err.errors)) {
                    response.status(400).send(ERR.VALIDATE_ERR(err.errors));
                } else {
                    console.log('validate err=', err);
                    response.status(500).send(ERR.SERVER_ERR);
                }
            });
    };

    onRestCrop = (request, response) => {
        const postLessonSchema = object({
            x: number().required(),
            y: number().required(),
            width: number().required(),
            height: number().required(),
            inputFile: string().required(),
            outputFile: string().required()
        });

        postLessonSchema
            .validate(request.body)
            .then((params) => {
                this.ws.send(
                    WS.createWsCrop(
                        params.x,
                        params.y,
                        params.width,
                        params.height,
                        params.inputFile,
                        params.outputFile
                    )
                );
                response.status(200).send();
            })
            .catch((err) => {
                if (Array.isArray(err.errors)) {
                    response.status(400).send(ERR.VALIDATE_ERR(err.errors));
                } else {
                    console.log('validate err=', err);
                    response.status(500).send(ERR.SERVER_ERR);
                }
            });
    };
}
