import { REST_SERVER_PORT, WS_SERVER_PORT } from '@config/const';

import { ServerController } from './ServerController';
import { WsServer } from './ports/WsServer';
import { Logger } from './ports/Logger';

let server: ServerController;
class Program {
    async main() {
        console.log('main');
        const wsServer = new WsServer();
        server = new ServerController(WS_SERVER_PORT, wsServer, new Logger());
        wsServer.setCtrl(server);
    }

    static create(): Program {
        return new Program();
    }
}

Program.create().main();
