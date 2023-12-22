import { WebSocket } from 'ws';

interface MainControllerForWs {
    onWsMesage: (msg: string) => void;
    onWsConnect: () => void;
}
export class WsServer {
    private wsClient = null;
    private wsServer = null;

    constructor(private ctrl: MainControllerForWs) {}

    openWsServer = (port: number) => {
        this.wsServer = new WebSocket.Server({ port });
        this.wsServer.on('connection', this.onConnect);
    };

    onConnect = (wsClient) => {
        this.wsClient = wsClient;
        console.log('WsServer: Новый пользователь');
        this.ctrl.onWsConnect();
        this.wsClient.on('message', this.onMessage);

        this.wsClient.on('close', function () {
            console.log('WsServer: Пользователь отключился');
            this.wsClient = null;
        });
    };

    onMessage = (messageB: Buffer) => {
        const message = messageB.toString('utf-8');
        this.ctrl.onWsMesage(message);
    };

    send = (o: object) => {
        if (this.wsClient) {
            this.wsClient.send(JSON.stringify(o));
        }
    };
}
