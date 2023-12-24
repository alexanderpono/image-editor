import { EditAction } from '@src/editAction';
import { Point2D, defaultPoint2D } from '@src/types';
import { handleActions } from 'redux-actions';

export enum DocEvent {
    DEFAULT = '',
    size = 'DOC/size',
    history = 'DOC/history'
}

export interface DocState {
    event: DocEvent;
    size: Point2D;
    history: EditAction[];
}

export const defaultDocState: DocState = {
    event: DocEvent.DEFAULT,
    size: defaultPoint2D,
    history: []
};

export interface SizeAction {
    type: DocEvent.size;
    payload: {
        size: Point2D;
    };
}

export interface HistoryAction {
    type: DocEvent.history;
    payload: {
        history: EditAction[];
    };
}

export const doc = {
    size: (size: Point2D): SizeAction => ({
        type: DocEvent.size,
        payload: { size }
    }),
    history: (history: EditAction[]): HistoryAction => ({
        type: DocEvent.history,
        payload: { history }
    })
};

export const docReducer = handleActions(
    {
        [DocEvent.size]: (state: unknown, action: SizeAction) => ({
            ...(state as DocState),
            event: DocEvent.size,
            size: action.payload.size
        }),
        [DocEvent.history]: (state: unknown, action: HistoryAction) => ({
            ...(state as DocState),
            event: DocEvent.history,
            history: action.payload.history
        })
    },
    defaultDocState
);
