import { Scene } from '@src/GR/Scene';
import { MoveByAction } from '@src/editAction';

export class MoveByCommand {
    constructor(private action: MoveByAction, private scene: Scene) {}

    execute = () => {
        console.log('MoveByCommand() this.action=', this.action);

        return new Promise((resolve) => {
            this.scene.setXY({ x: this.action.dx, y: this.action.dy });
            this.scene.setDirty(true);
            resolve('OK');
        });
    };
}
