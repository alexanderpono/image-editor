import { WsEvent } from '@config/WsEvent';

export const WS = {
    createWsHello: () => ({
        event: WsEvent.HELLO
    })
};
