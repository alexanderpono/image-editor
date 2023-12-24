import { DocState } from '@src/store/doc/docReducer';

interface AppState {
    doc: DocState;
}

export const appSelect = {
    size: (state: AppState) => state.doc.size
};
