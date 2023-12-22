import { ServerController } from './ServerController';
import { Logger } from './ports/Logger';
import { WsServer } from './ports/WsServer';
import { WS } from './ports/WsServer.types';
import { num } from './testFramework';
import { castPartialTo } from './testFramework/castPartialTo';

describe('ServerController', () => {
    test('.onWsConnect() calls ws.send()', () => {
        const ws = castPartialTo<WsServer>({
            openWsServer: () => {},
            send: jest.fn()
        });
        const logger = castPartialTo<Logger>({
            log: jest.fn()
        });

        const ctrl = new ServerController(num(), ws, logger);
        ctrl.onWsConnect();

        expect(ws.send).toHaveBeenCalledWith(WS.createWsHello());
    });

    test('.onWsMesage("{}") returns "Ws: Неизвестная команда"', () => {
        const ws = castPartialTo<WsServer>({
            openWsServer: () => {},
            send: jest.fn()
        });
        const logger = castPartialTo<Logger>({
            log: jest.fn()
        });

        const ctrl = new ServerController(num(), ws, logger);

        expect(ctrl.onWsMesage('{}')).toBe('Ws: Неизвестная команда');
    });

    test('.onWsMesage("") returns "WS: not a JSON"', () => {
        const ws = castPartialTo<WsServer>({
            openWsServer: () => {},
            send: jest.fn()
        });
        const logger = castPartialTo<Logger>({
            log: jest.fn()
        });

        const ctrl = new ServerController(num(), ws, logger);

        expect(ctrl.onWsMesage('')).toBe('WS: not a JSON');
    });
});
