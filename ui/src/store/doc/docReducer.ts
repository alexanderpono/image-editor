import { Point2D, defaultPoint2D } from '@src/types';
import { handleActions } from 'redux-actions';

export enum DocEvent {
    DEFAULT = '',
    size = 'DOC/size'
}

export interface DocState {
    event: DocEvent;
    size: Point2D;
}

export const defaultDocState: DocState = {
    event: DocEvent.DEFAULT,
    size: defaultPoint2D
};

export interface SizeAction {
    type: DocEvent.size;
    payload: {
        size: Point2D;
    };
}

export const doc = {
    size: (size: Point2D): SizeAction => ({
        type: DocEvent.size,
        payload: { size }
    })
};

export const docReducer = handleActions(
    {
        [DocEvent.size]: (state: DocState, action: SizeAction): DocState => ({
            ...state,
            event: DocEvent.size,
            size: action.payload.size
        })
    },
    defaultDocState
);
