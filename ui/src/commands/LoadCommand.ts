import { Scene } from '@src/UIController.types';
import { LoadAction } from '@src/editAction';
import { REST_SERVER_PORT } from '@config/const';

export class LoadCommand {
    constructor(private action: LoadAction, private scene: Scene) {}

    execute = () => {
        console.log('LoadCommand() action=', this.action);
        const pic = new Image();

        return new Promise((resolve, reject) => {
            pic.src =
                `http://localhost:${REST_SERVER_PORT}/file/` +
                encodeURIComponent(this.action.fileName);
            pic.onload = () => {
                this.scene.setPic(pic);
                resolve('OK');
            };

            setTimeout(() => {
                reject('LOAD ERROR');
            }, 500);
        });
    };
}
