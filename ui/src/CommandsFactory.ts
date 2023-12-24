import { CloseDocument } from './commands/CloseDocument';
import { LoadCommand } from './commands/LoadCommand';
import { MoveByCommand } from './commands/MoveByCommand';
import { NewDocumentCommand } from './commands/NewDocumentCommand';
import { SaveAsPngCommand } from './commands/SaveAsPngCommand';
import { UnknownCommand } from './commands/UnknownCommand';
import { Action, EditEvent } from './editAction';

export class CommandsFactory {
    getCommand = (action: Action) => {
        switch (action.type) {
            case EditEvent.NEW_DOCUMENT:
                return new NewDocumentCommand();
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
