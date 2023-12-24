import 'reflect-metadata';

import { WS_SERVER_PORT } from '@config/const';
import { WsClient } from './ports/WsClient';
import { APP_VERSION } from './types';
import { UIController } from './UIController';
import { ScriptExecutor } from './ScriptExecutor';
import { CommandsFactory } from './CommandsFactory';
import { DocStateManager } from './store/doc/DocStateManager';
import { Scene } from './UIController.types';

console.log('image-editor-ui', APP_VERSION);
document.title = 'image-editor-ui ' + APP_VERSION;

const wsClient = new WsClient(WS_SERVER_PORT);
const scene = new Scene();
const ctrl = new UIController(
    wsClient,
    new ScriptExecutor(new CommandsFactory(), new DocStateManager(), scene),
    scene
);
scene.setCtrl(ctrl);
ctrl.go();
wsClient.setCtrl(ctrl);
