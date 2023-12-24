import { getFromState, getVal, num, rndAr, rndSize, str } from '@src/testFramework';
import { DocEvent, DocState, defaultDocState, doc, docReducer } from './docReducer';
import { Point2D, defaultPoint2D } from '@src/types';
import { EditAction, EditEvent, defaultEditAction } from '@src/editAction';

describe('docReducer', () => {
    const rndSize: Point2D = { x: num(), y: num() };
    const rndHistory: EditAction[] = [{ ...defaultEditAction, type: str() as EditEvent }];

    test.each`
        actions                      | testName                                       | event               | stateSelector | value
        ${[doc.size(rndSize)]}       | ${'sets .size for DocEvent.size action'}       | ${DocEvent.size}    | ${'size'}     | ${rndSize}
        ${[doc.history(rndHistory)]} | ${'sets .history for DocEvent.history action'} | ${DocEvent.history} | ${'history'}  | ${rndHistory}
    `('$testName', async ({ actions, event, stateSelector, value }) => {
        let state: DocState = { ...defaultDocState };
        actions.forEach((action) => {
            state = docReducer(state, action) as DocState;
        });
        expect(state.event).toEqual(event);
        if (stateSelector !== null) {
            expect(getFromState(state, stateSelector)).toEqual(getVal(actions, value));
        }
    });
});
