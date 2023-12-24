import { getStore } from '@src/store';
import { doc, DocState } from './docReducer';
import { Point2D } from '@src/types';

const dispatch = (action) => getStore().dispatch(action);

export class DocStateManager {
    getDoc = (): DocState => getStore().getState().doc as DocState;
    docSize = (size: Point2D) => dispatch(doc.size(size));

    static create(): DocStateManager {
        return new DocStateManager();
    }
}
