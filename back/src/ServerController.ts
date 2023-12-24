import { Logger } from './ports/Logger';
import { WsServer } from './ports/WsServer';
import { WS } from './ports/WsServer.types';
import { RestServer } from './ports/RestServer';
import path from 'path';

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
        this.ws.send(WS.createWsCrop(2286, 9, 1827, 976, 'data/in/01.png', 'data/out/01.png'));
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
        console.log('ServerController onRestGetFile()');
        response.header('Access-Control-Allow-Origin', '*');

        let p = path.join(__dirname, '..', request.params.id);
        // response.send(`GET file ${request.params.id} ${p}`);

        console.log('ServerController onRestGetFile() p=', p);

        response.sendFile(p);
    };
}
