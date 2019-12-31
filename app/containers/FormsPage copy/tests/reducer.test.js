
// import { fromJS } from 'immutable';
import formsPageReducer, { initialState } from '../reducer';

describe('formsPageReducer', () => {
    it('returns the initial state', () => {
        expect(formsPageReducer(initialState, {})).toEqual(initialState);
    });
});
