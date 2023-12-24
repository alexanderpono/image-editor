import { Serializable, jsonProperty } from 'ts-serializable';
import { WsEvent } from '@config/WsEvent';

export class WsMessage extends Serializable {
    @jsonProperty(String)
    public event = WsEvent.DEFAULT;
}
export const defaultWsMessage = new WsMessage().fromJSON({});

export class WsCropMessage extends WsMessage {
    @jsonProperty(String)
    public event = WsEvent.CROP;

    @jsonProperty(Number)
    public x = 0;

    @jsonProperty(Number)
    public y = 0;

    @jsonProperty(Number)
    public width = 0;

    @jsonProperty(Number)
    public height = 0;

    @jsonProperty(String)
    public inputFile = '';

    @jsonProperty(String)
    public outputFile = '';
}
