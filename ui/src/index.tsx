import { WS_SERVER_PORT } from '@config/const';
import { WsClient } from './ports/WsClient';
import { APP_VERSION } from './types';
import { UIController } from './UIController';

console.log('image-editor-ui', APP_VERSION);
document.title = 'image-editor-ui ' + APP_VERSION;

const wsClient = new WsClient(WS_SERVER_PORT);
const ctrl = new UIController(wsClient).go();
wsClient.setCtrl(ctrl);
