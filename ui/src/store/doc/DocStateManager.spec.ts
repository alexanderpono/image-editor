import { getFromState, getVal, rndAr, rndSize, str, num, bool } from '@src/testFramework';
import { DocStateManager } from './DocStateManager';
import { Point2D } from '@src/types';
import { EditAction, EditEvent, defaultEditAction } from '@src/editAction';
import { doc } from './docReducer';
import * as store from '@src/store';

jest.mock('@src/store');

describe('DocStateManager', () => {
    describe('dispatchers', () => {
        const rndSize: Point2D = { x: num(), y: num() };
        const rndHistory: EditAction[] = [{ ...defaultEditAction, type: str() as EditEvent }];

        test.each`
            method          | param1        | param2  | expected
            ${'docSize'}    | ${rndSize}    | ${null} | ${doc.size(rndSize)}
            ${'docHistory'} | ${rndHistory} | ${null} | ${doc.history(rndHistory)}
        `('$method() calls store.dispatch', ({ method, param1, param2, expected }) => {
            const dispatchMock = jest.fn();
            store.getStore['mockReturnValue']({
                dispatch: dispatchMock
            });

            const model = DocStateManager.create();
            if (param1 !== null && param2 !== null) {
                model[method](param1, param2);
            } else if (param1 !== null) {
                model[method](param1);
            } else {
                model[method]();
            }

            expect(dispatchMock).toHaveBeenCalledWith(expected);
        });
    });
});
