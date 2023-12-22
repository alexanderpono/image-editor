import { Logger } from './ports/Logger';
import { WsServer } from './ports/WsServer';
import { WS } from './ports/WsServer.types';

interface JsonMessageFromUI {
    action: string;
    data: string;
}
export class ServerController {
    constructor(wsPort: number, private ws: WsServer, private logger: Logger) {
        this.ws.openWsServer(wsPort);

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
}
