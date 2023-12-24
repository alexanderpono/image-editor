import React from 'react';
import { render } from 'react-dom';
import { WsClient } from './ports/WsClient';
import { WsCropMessage, WsMessage } from './ports/WsMessage';
import { EditAction, editAction } from './editAction';
import { Scene } from './UIController.types';
import { ScriptExecutor } from './ScriptExecutor';
import { AppUI } from './components/AppUI';
import { Provider } from 'react-redux';
import { store } from './store';
import { DocStateManager } from './store/doc/DocStateManager';

export class UIController {
    protected canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(private ws: WsClient, private executor: ScriptExecutor, private scene: Scene) {
        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    go = () => {
        console.log('ui go!');

        this.ws.connect();
        this.renderUI();
        return this;
    };

    onWsMessage = (message: string) => {
        console.log('onWsMessage() message=', message);
        const wsMessage = JSON.parse(message) as WsMessage;
        console.log('onWsMessage() wsMessage=', wsMessage);
        switch (wsMessage.event) {
            case 'CROP':
                const wsCropMessage = new WsCropMessage().fromJSON(wsMessage);
                const script = this.compileCropMessage(wsCropMessage);
                this.runScript(script);
                console.log('script=', script);
                break;
            default:
                console.log('Ws: Неизвестная команда', wsMessage.event);
                break;
        }
    };

    compileCropMessage = (msg: WsCropMessage): EditAction[] => {
        console.log('compileCropMessage() msg=', msg);
        const layerName = 'img';

        return [
            editAction.newDocument(msg.width, msg.height),
            editAction.load(msg.inputFile, layerName),
            editAction.moveBy(layerName, -msg.x, -msg.y),
            editAction.saveAsPng(msg.outputFile),
            editAction.closeDocument()
        ];
    };

    runScript = async (script: EditAction[]) => {
        this.executor.execute(script).then((code) => {
            console.log('runScript() then() code =', code);
        });
    };

    renderUI = () => {
        render(this.getUI(), document.getElementById('ui'));
    };

    getUI = () => (
        <Provider store={store}>
            <AppUI ref={this.canvasRef} />
        </Provider>
    );

    onLayerChanged = () => {
        console.error('onLayerChanged()');

        const canvas = this.canvasRef.current as unknown as HTMLCanvasElement;
        const docState = DocStateManager.create().getDoc();

        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.scene.render(context, docState.size);
    };
}
