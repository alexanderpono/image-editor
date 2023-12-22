import { WsServer } from './ports/WsServer';
import { WS } from './ports/WsServer.types';

interface JsonMessageFromUI {
    action: string;
    data: string;
}
export class ServerController {
    private ws: WsServer;

    constructor(wsPort: number, private restPort: number) {
        this.ws = new WsServer(this);

        this.ws.openWsServer(wsPort);

        console.log('ServerController() constructor()');
    }

    onWsConnect = () => {
        console.log('onWsConnect()');
        this.ws.send(WS.createWsHello());
    };

    onWsMesage = (message: string) => {
        console.log('on(message) message=', message);
        try {
            const jsonMessage: JsonMessageFromUI = JSON.parse(message);
            console.log('on(message) jsonMessage=', jsonMessage);
            switch (jsonMessage.action) {
                case 'TO_SERIAL':
                    console.log('jsonMessage=', jsonMessage);
                    break;
                default:
                    console.log('Ws: Неизвестная команда');
                    break;
            }
        } catch (error) {
            console.log('Ws: Ошибка', error);
        }
    };
}
