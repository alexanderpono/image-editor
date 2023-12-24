import { Scene } from './UIController.types';
import { CloseDocument } from './commands/CloseDocument';
import { LoadCommand } from './commands/LoadCommand';
import { MoveByCommand } from './commands/MoveByCommand';
import { NewDocumentCommand } from './commands/NewDocumentCommand';
import { SaveAsPngCommand } from './commands/SaveAsPngCommand';
import { UnknownCommand } from './commands/UnknownCommand';
import { EditAction, EditEvent, LoadAction, NewDocumentAction } from './editAction';
import { DocStateManager } from './store/doc/DocStateManager';

export class CommandsFactory {
    getCommand = (action: EditAction, doc: DocStateManager, scene: Scene) => {
        switch (action.type) {
            case EditEvent.NEW_DOCUMENT:
                return new NewDocumentCommand(action as NewDocumentAction, doc);
            case EditEvent.LOAD:
                return new LoadCommand(action as LoadAction, scene);
            case EditEvent.MOVE_BY:
                return new MoveByCommand();
            case EditEvent.SAVE_AS_PNG:
                return new SaveAsPngCommand();
            case EditEvent.CLOSE_DOCUMENT:
                return new CloseDocument();
            case EditEvent.DEFAULT:
                return new UnknownCommand();
        }
    };
}
