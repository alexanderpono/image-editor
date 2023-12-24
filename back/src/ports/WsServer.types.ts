import { WsEvent } from '@config/WsEvent';

export const WS = {
    createWsHello: () => ({
        event: WsEvent.HELLO
    }),
    createWsCrop: (
        x: number,
        y: number,
        width: number,
        height: number,
        inputFile: string,
        outputFile: string
    ) => ({
        event: WsEvent.CROP,
        x,
        y,
        width,
        height,
        inputFile,
        outputFile
    })
};
