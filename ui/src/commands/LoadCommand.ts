import { LoadAction } from '@src/editAction';
import { REST_SERVER_PORT } from '@config/const';
import { Scene } from '@src/GR/Scene';

export class LoadCommand {
    constructor(private action: LoadAction, private scene: Scene) {}

    execute = () => {
        console.log('LoadCommand() action=', this.action);
        const pic = new Image();
        pic.crossOrigin = 'anonymous';

        return new Promise((resolve, reject) => {
            pic.src =
                `http://localhost:${REST_SERVER_PORT}/file/` +
                encodeURIComponent(this.action.fileName);
            pic.onload = () => {
                this.scene.setPic(pic);
                this.scene.setDirty(true);
                resolve('OK');
            };

            setTimeout(() => {
                reject('LOAD ERROR');
            }, 500);
        });
    };
}
