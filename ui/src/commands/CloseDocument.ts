import { Scene } from '@src/GR/Scene';
import { DocStateManager } from '@src/store/doc/DocStateManager';

export class CloseDocument {
    constructor(private doc: DocStateManager, private scene: Scene) {}

    execute = () => {
        console.log('CloseDocument()');
        this.doc.docSize({ x: 0, y: 0 });
        this.scene.setDirty(true);
        return Promise.resolve(true);
    };
}
