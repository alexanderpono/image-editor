import { REST_SERVER_PORT, WS_SERVER_PORT } from '@config/const';

import { ServerController } from './ServerController';

let server: ServerController;
class Program {
    async main() {
        console.log('main');
        server = new ServerController(WS_SERVER_PORT, REST_SERVER_PORT);
    }

    static create(): Program {
        return new Program();
    }
}

Program.create().main();
