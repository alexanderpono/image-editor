import React from 'react';
import { render } from 'react-dom';
import { WsClient } from './ports/WsClient';
import { WsEvent } from '@config/WsEvent';

export class UIController {
    constructor(private ws: WsClient) {}

    go = () => {
        console.log('ui go!');

        this.ws.connect();
        return this;
    };

    onWsMessage = (message: string) => {
        console.log('onWsMessage() message=', message);
        const wsMessage = JSON.parse(message);
        console.log('onWsMessage() wsMessage=', wsMessage);
    };
}
