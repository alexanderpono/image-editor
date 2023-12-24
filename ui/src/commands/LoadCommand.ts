import { Scene } from '@src/UIController.types';
import { LoadAction } from '@src/editAction';

export class LoadCommand {
    constructor(private action: LoadAction, private scene: Scene) {}

    execute = () => {
        console.log('LoadCommand() action=', this.action);
        const pic = new Image();

        return new Promise((resolve, reject) => {
            pic.src = encodeURI('http://localhost:8725/file/' + this.action.fileName);
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
