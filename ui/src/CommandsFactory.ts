import { CloseDocument } from './commands/CloseDocument';
import { LoadCommand } from './commands/LoadCommand';
import { MoveByCommand } from './commands/MoveByCommand';
import { NewDocumentCommand } from './commands/NewDocumentCommand';
import { SaveAsPngCommand } from './commands/SaveAsPngCommand';
import { UnknownCommand } from './commands/UnknownCommand';
import { EditAction, EditEvent, NewDocumentAction } from './editAction';
import { DocStateManager } from './store/doc/DocStateManager';

export class CommandsFactory {
    getCommand = (action: EditAction, doc: DocStateManager) => {
        switch (action.type) {
            case EditEvent.NEW_DOCUMENT:
                return new NewDocumentCommand(action as NewDocumentAction, doc);
            case EditEvent.LOAD:
                return new LoadCommand();
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
