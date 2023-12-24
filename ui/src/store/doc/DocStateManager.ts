import { getStore } from '@src/store';
import { doc, DocState } from './docReducer';
import { Point2D } from '@src/types';
import { EditAction } from '@src/editAction';

const dispatch = (action) => getStore().dispatch(action);

export class DocStateManager {
    getDoc = (): DocState => getStore().getState().doc as DocState;
    docSize = (size: Point2D) => dispatch(doc.size(size));
    docHistory = (history: EditAction[]) => dispatch(doc.history(history));

    static create(): DocStateManager {
        return new DocStateManager();
    }
}
