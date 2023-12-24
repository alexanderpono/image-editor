import { Action, NewDocumentAction } from '@src/editAction';
import { DocStateManager } from '@src/store/doc/DocStateManager';

export class NewDocumentCommand {
    constructor(private action: NewDocumentAction, private doc: DocStateManager) {}

    execute = () => {
        console.log('NewDocumentCommand() action=', this.action);
        this.doc.docSize({ x: this.action.width, y: this.action.height });
        return Promise.resolve(true);
    };
}
